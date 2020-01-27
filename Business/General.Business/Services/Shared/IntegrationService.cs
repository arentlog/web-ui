using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Runtime.Caching;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.AR.Data.Repositories;
using MoreLinq;
using Newtonsoft.Json;
using Security.Security;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Cache;
using ServiceInterfaceClient.Progress;
using ServiceInterfaceClient.Utilities;

namespace General.Business.Services.Shared
{
   public class IntegrationService : ServiceBase, IIntegrationService
   {
      private readonly ICacheWrapper _appCache;

      private readonly TokenObject _tokenObject;

      private readonly IProgressConnection _connection;

      private readonly IProgressConfiguration _progressConfiguration;

      private readonly Dictionary<string, SupportedRespository> _supportedRepositories;

      private SupportedRespository _supportedRespository;

      private const string Majorbucket = "I";

      private readonly string _bearerToken;

      public IntegrationService(ICacheWrapper appCache, CoudSuiteWebClient webClient, IProgressConnection connection, IProgressConfiguration progressConfiguration)
      {
         this._appCache = appCache;
         this._connection = connection;
         this._progressConfiguration = progressConfiguration;
         this._tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out _);
         this._appCache.TokenObject = this._tokenObject;

         _supportedRepositories = new Dictionary<string, SupportedRespository>
         {
            {
               "icsw", new SupportedRespository { IdmEntityType = "Item_Images" ,IdmRepository = "icsw", Formatter = "@Product_Number = \"{0}\""}
            }
         };

         this._bearerToken = StringProtector.Unprotect(ApplicationCookieUtilities.BearerTokenValue(HttpContext.Current.User), new ProgressConfiguration().ApplicationEncryptKey,
            new ProgressConfiguration().ApplicationEncryptIv);
      }

      public GetImageUrlResponseWrapper GetImageUrl(GetImageUrlRequestWrapper getImageUrlRequestWrapper)
      {
         var returnResponse = new GetImageUrlResponseWrapper
         {
            GetImageUrlResponse = new List<GetImageUrlResponse>(),
            RepositoryFound = false
         };
         this._supportedRespository = ReturnSupportedRespository(getImageUrlRequestWrapper.Repository);
         if (getImageUrlRequestWrapper?.GetImageUrlRequest == null || this._supportedRespository == null || !getImageUrlRequestWrapper.GetImageUrlRequest.Any())
         {
            return returnResponse;
         }
         returnResponse.RepositoryFound = true;

         var amendedRequest = new List<GetImageUrlRequest>();

         getImageUrlRequestWrapper.GetImageUrlRequest = getImageUrlRequestWrapper.GetImageUrlRequest.DistinctBy(x => x.CombinedKey).ToList();
         if (this._progressConfiguration.InforIdmUseCache && !getImageUrlRequestWrapper.IgnoreCache)
         {
            foreach (var request in getImageUrlRequestWrapper.GetImageUrlRequest)
            {
               var key = $"{this._supportedRespository.IdmRepository}|{request.CombinedKey}";
               var appHit = this._appCache.Get<string>(Majorbucket, key);
               if (appHit != null)
               {
                  returnResponse.GetImageUrlResponse.Add(new GetImageUrlResponse { Key = request.Key, ImageType = request.ImageType, Url = appHit, ValidMinutes = this._tokenObject.InforIdmCacheExpirationAbsolute / 2 });
               }
               else
               {
                  amendedRequest.Add(request);
               }
            }
         }
         else
         {
            amendedRequest = getImageUrlRequestWrapper.GetImageUrlRequest;
         }

         if (!amendedRequest.Any())
         {
            return returnResponse;
         }

         var responseFromCall = this.ReturnUrlFromCall(amendedRequest, out var inError);
         if (inError)
         {
            returnResponse.InError = true;
            return returnResponse;
         }

         foreach (var response in responseFromCall)
         {
            returnResponse.GetImageUrlResponse.Add(response);
            if (!this._progressConfiguration.InforIdmUseCache || getImageUrlRequestWrapper.IgnoreCache)
            {
               continue;
            }

            var key = $"{this._supportedRespository.IdmRepository}|{response.CombinedKey}";
            var appHit = this._appCache.Get<string>(Majorbucket, key);
            if (appHit != null)
            {
               continue;
            }
            if (this._tokenObject.InforIdmCacheExpirationAbsolute == 0)
            {
               this._tokenObject.InforIdmCacheExpirationAbsolute = 60;
            }
            this._appCache.Add(Majorbucket, key, response.Url, new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(this._tokenObject.InforIdmCacheExpirationAbsolute)});
         }
         return returnResponse;
      }

      public void ClearRepository(string repositoryName)
      {
         if (string.IsNullOrEmpty(repositoryName))
         {
            return;
         }
         this._appCache.ClearCache(Majorbucket, repositoryName);
      }

      private SupportedRespository ReturnSupportedRespository(string repositoryName)
      {
         if (string.IsNullOrEmpty(repositoryName))
         {
            return null;
         }
         var passedInRepository = repositoryName.ToLower(CultureInfo.InvariantCulture);
         return string.IsNullOrEmpty(passedInRepository) ? null : _supportedRepositories.ContainsKey(passedInRepository) ? _supportedRepositories[passedInRepository] : null;
      }

      private static bool ValidateRemoteCertificate(object sender, X509Certificate cert, X509Chain chain, SslPolicyErrors policyErrors)
      {
         return true;
      }

      private IEnumerable<GetImageUrlResponse> ReturnUrlFromCall(List<GetImageUrlRequest> getImageUrlRequest, out bool inError)
      {

         var queryToGet = getImageUrlRequest.Aggregate($"/{this._supportedRespository.IdmEntityType}[(", (current, request) => current + (current.Length > 14 ? " OR " : string.Empty) +  string.Format(this._supportedRespository.Formatter, request.Key.Replace('"', ' ')));
         queryToGet += $") AND @Company_Number={this._tokenObject.Cono}]";

         NLogLogger.Trace($"queryToGet - {queryToGet}");

         var oAuthBase = new OAuthBase();


         var query = oAuthBase.CreateQueryParam("$offset", "0");
         query = query + "&" + oAuthBase.CreateQueryParam("$limit", getImageUrlRequest.Count.ToString());
         query = query + "&" + oAuthBase.CreateQueryParam("$includeCount", "false");
         query = query + "&" + oAuthBase.CreateQueryParam("$language", "en");

         NLogLogger.Trace($"url - {query}");


         UriBuilder uriBuilder;

         string signature;
         if (!new ProgressConfiguration().SSoEnabled)
         {
            // Use OAuth 1.0
            if (string.IsNullOrEmpty(this._tokenObject.IdmUrl))
            {
               inError = true;
               NLogLogger.Error("The IDM URL was empty - Unable to retrieve images");
               return new List<GetImageUrlResponse>();
            }
            // PMC 02/09/2018 - IBM AppScan - This has been manually reviewed and passed as being safe
            uriBuilder = new UriBuilder(this._tokenObject.IdmUrl) {Query = query};
            signature = oAuthBase.GenerateSignature(uriBuilder.Uri, this._tokenObject.IdmConsumerKey, this._tokenObject.IdmSharedSecret, string.Empty, string.Empty, "POST", oAuthBase.GenerateTimeStamp(), oAuthBase.GenerateNonce(6));
            NLogLogger.Trace($"OAuth 1.0 - signature - {signature}");
         }
         else
         {
            // Use OAuth 2.0
            if (string.IsNullOrEmpty(this._tokenObject.IonApiUrl))
            {
               inError = true;
               NLogLogger.Error("The ION API URL was empty - Unable to retrieve images");
               return new List<GetImageUrlResponse>();
            }
            if (this._bearerToken == null)
            {
               NLogLogger.Error("bearertoken not harvested from request header", "ReturnUrlFromCall");
               inError = true;
               return new List<GetImageUrlResponse>();
            }

            // PMC 02/09/2018 - IBM AppScan - This has been manually reviewed and passed as being safe
            uriBuilder = new UriBuilder(this._tokenObject.IonApiUrl + "/IDM/api/items/search") {Query = query};
            var bearerTokenObject = JsonConvert.DeserializeObject<BearerTokenObject>(this._bearerToken);

            signature = $"Bearer {bearerTokenObject.access_token}";
            NLogLogger.Trace($"OAuth 2.0 - signature - {signature}");
         }
         NLogLogger.Trace($"Calling URI - {uriBuilder.Uri}");

         var webHeaderCollection = new WebHeaderCollection
         {
            { "Authorization", signature },
            { "x-ionapi-docrequest", "DistributionSxe" },
            { "Accept-Encoding", "gzip, deflate" },
            { "Accept", "application/json" },
            { "Content-Type", "text/plain" }
         };
         var idmResponseObject = MakeWebCall.DoWebCallString<IdmResponse>(uriBuilder.Uri, true,
            queryToGet, webHeaderCollection, out inError, NLogLogger);
         List<GetImageUrlResponse> returnValue;
         if (!inError)
         {
            NLogLogger.Trace($"idmResponseString - {JsonConvert.SerializeObject(idmResponseObject)}");
            returnValue = idmResponseObject.ReturnImageUrl(getImageUrlRequest, this._tokenObject.InforIdmCacheExpirationAbsolute / 2);
         }
         else
         {
            returnValue = new List<GetImageUrlResponse>();
            NLogLogger.Error("Image Retrieval failed");
         }
         return returnValue;
      }

      public MingleWorkflowResponse StartMingleWorkflow(MingleWorkflowRequest req)
      {
         var uriBuilder = new UriBuilder(this._tokenObject.IonApiUrl + "/Mingle/SocialService.Svc/User/Detail");

         NLogLogger.Trace(uriBuilder.Uri.ToString(), "StartMingleWorkflow ionApiUrl");
         NLogLogger.Trace(this._bearerToken, "StartMingleWorkflow bearerToken");

         if (this._bearerToken == null)
         {
            var error = new Errorlist() { Severity = 1, Code = 400 };
            var errorResponse = new MingleWorkflowResponse() { ErrorList = new[] { error }, Status = 0 };
            NLogLogger.Error("bearertoken not harvested from request header", "StartMingleWorkflow");
            return errorResponse;
         }

         var bearerTokenObject = JsonConvert.DeserializeObject<BearerTokenObject>(this._bearerToken);

         if (this._progressConfiguration.InforOverrideHttps)
         {
            ServicePointManager.ServerCertificateValidationCallback += ValidateRemoteCertificate;
         }
         ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;


         //get ming.le user guid
         string userGuid = null;

         var webHeaderCollection = new WebHeaderCollection
         {
            { "Authorization", $"Bearer {bearerTokenObject.access_token}" },
            { "Accept", "application/json" },
            { "Content-Type", "application/json" }
         };

         
         var responseObject =
            MakeWebCall.DoWebCallString<MingleUserDetailResponse>(uriBuilder.Uri, false, string.Empty, webHeaderCollection, out var inError,
               NLogLogger);
         if (!inError)
         {
            if (responseObject.UserDetailList.Length == 1)
            {
               userGuid = responseObject.UserDetailList[0].UserGUID;

               var emailParam = new Startparameter { Name = "EmailAddr", SerializedValue = responseObject.UserDetailList[0].Email };
               req.StartParameters = (req.StartParameters ?? Enumerable.Empty<Startparameter>()).Concat(Enumerable.Repeat(emailParam, 1)).ToArray();
            }
         }
         else
         {
            var error = new Errorlist() { Severity = 1, Code = 500, Message = "User Details Error" };
            var errorResponse = new MingleWorkflowResponse() { ErrorList = new[] { error }, Status = 0 };
            NLogLogger.Error($"Error retrieving UserGUID");
            return errorResponse;
         }

         //get customer details, add to payload
         var customerNumber = req.StartParameters.SingleOrDefault(item => item.Name == "CustomerNumber");

         if (customerNumber != null)
         {
            var arscRepository = new ArscRepository(this._connection);
            var arsc = arscRepository.Get(0, int.Parse(customerNumber.SerializedValue), false, 1, "");
            var custNameParam = new Startparameter { Name = "CustomerName", SerializedValue = arsc.name };
            req.StartParameters = (req.StartParameters ?? Enumerable.Empty<Startparameter>()).Concat(Enumerable.Repeat(custNameParam, 1)).ToArray();
         }

         webHeaderCollection = new WebHeaderCollection
         {
            { "Accept", "application/json" },
            { "Content-Type", "application/json" }
         };
         uriBuilder = new UriBuilder(uriBuilder.Uri + $"/Mingle/IONDataService.Svc/User/{userGuid}/Workflow/Start");
         var returnObject = MakeWebCall.DoWebCallString<MingleWorkflowResponse>(uriBuilder.Uri, true,
            JsonConvert.SerializeObject(req), webHeaderCollection, out inError, NLogLogger);
         if (inError)
         {
            var error = new Errorlist() { Severity = 1, Code = 500, Message = "User Details Error" };
            var errorResponse = new MingleWorkflowResponse() { ErrorList = new[] { error }, Status = 0 };
            NLogLogger.Error($"Error starting workflow");
            return errorResponse;
         }
         return returnObject;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         base.Dispose(true);
      }
   }
}