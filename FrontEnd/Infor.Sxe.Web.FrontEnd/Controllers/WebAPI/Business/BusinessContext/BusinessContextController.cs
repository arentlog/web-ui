using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Runtime.Caching;
using System.Web;
using System.Web.Http;
using Infor.Sxe.Common.Data.Helpers;
using Infor.Sxe.Common.Data.Struct;
using Newtonsoft.Json.Linq;
using Security.Security;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Cache;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.BusinessContext
{
   [RoutePrefix("api/businesscontext")]
   public class BusinessContextController : ApiControllerBase
   {
      private readonly ICacheWrapper _appCache;

      private readonly IProgressConnection connection;

      private object[] repositories;

      private readonly TokenObject _tokenObject;

      private const string MajorbucketA = "A";

      private const string MajorbucketB = "B";

      public BusinessContextController(IProgressConnection connection, ICacheWrapper appCache)
      {
         this.connection = connection;
         this._appCache = appCache;
         this._tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out var _);
         this._appCache.TokenObject = this._tokenObject;
      }

      [HttpGet]
      [Route("clearcontextcache")]
      public void ClearRepository()
      {
         this._appCache.ClearCache(MajorbucketA, string.Empty);
         this._appCache.ClearCache(MajorbucketB, string.Empty);
      }

      [HttpPost]
      [Route("getcontext")]
      public JObject GetContext(string logicalId, JArray objectRequests)
      {
         try
         {
            if (string.IsNullOrEmpty(logicalId))
            {
               logicalId = "infor.sxe.no.lid.set";
            }

            this.repositories = new object[objectRequests.Count];
            var repoCount = 0;

            var returnBusMessage = new JObject();
            var returnArray = new JArray();
            var returnAddress = new JObject();
            var bAddressSet = false;

            foreach (var objectRequest in objectRequests)
            {
               var objectType = objectRequest.Value<string>("entityName");

               var messageKey = $"{objectRequest}{logicalId}";
               var message = this._appCache.Get<JObject>(MajorbucketB, messageKey);

               if (message == null)
               {
                  var keysList = new List<object>();
                  var objectKey = objectRequest.Value<object>("key1");
                  if (string.IsNullOrEmpty(objectType) || objectKey == null)
                  {
                     continue;
                  }
                  keysList.Add(objectKey);

                  var viewId = objectRequest.Value<string>(Fields.ViewId);

                  var classType = ClassHelper.ReturnClassType(objectType.FirstLetterToUpper() + "Base");
                  var module = classType?.FullName.StripAfterLastOccuranceTemp(".").StripBeforeLastOccurance(".");
                  if (string.IsNullOrEmpty(module))
                  {
                     continue;
                  }
                  var repoType =
                     Type.GetType(
                        $"General.Business.Services.{module}.{objectType.FirstLetterToUpper()}BusinessContextService, General.Business")
                     ?? Type.GetType(
                        $"Infor.Sxe.{module}.Data.Repositories.{objectType.FirstLetterToUpper()}Repository, Infor.Sxe.{module}.Data");
                  var methodInfo = repoType?.GetMethod("GetBusinessContext") ?? repoType?.GetMethod("Get");

                  if (methodInfo != null)
                  {

                     var paramsFromMethodInfo = methodInfo.GetParameters();
                     var i = 1;
                     do
                     {
                        i++;
                        objectKey = objectRequest.Value<object>($"key{i}");
                        if (objectKey != null)
                        {
                           keysList.Add(objectKey);
                        }
                     }
                     while (objectKey != null);

                     var parametersArray = new object[paramsFromMethodInfo.Length];
                     var paramCount = 0;
                     var keyCount = 0;

                     foreach (var singleParam in paramsFromMethodInfo)
                     {
                        switch (singleParam.Name)
                        {
                           case "cono":
                              parametersArray[paramCount] = 0;
                              break;
                           case "fillMode":
                              parametersArray[paramCount] = false;
                              break;
                           case "batchsize":
                              parametersArray[paramCount] = 1;
                              break;
                           case "fldList":
                              parametersArray[paramCount] = string.Empty;
                              break;
                           default:
                              if (keyCount < keysList.Count)
                              {
                                 var paramType = singleParam.ParameterType;
                                 if (paramType == typeof(DateTime?))
                                 {
                                    paramType = typeof(DateTime);
                                 }
                                 var convertParam =
                                    this.GetType()
                                       .GetMethod("ConvertValue", BindingFlags.NonPublic | BindingFlags.Static)?
                                       .MakeGenericMethod(paramType);
                                 parametersArray[paramCount] = convertParam?.Invoke(
                                    this,
                                    new object[] { keysList[keyCount].ToString() });
                                 keyCount++;
                              }
                              break;
                        }
                        paramCount++;
                     }
                     this.repositories[repoCount] = Activator.CreateInstance(repoType, this.connection);
                     var useKeys = true;
                     if (this.repositories[repoCount] is IUseKeys checkUseKeys)
                     {
                        useKeys = checkUseKeys.UseKeys;
                     }
                     var result = methodInfo.Invoke(this.repositories[repoCount], parametersArray);
                     if (result != null)
                     {
                        message = ClassHelper.ReturnMessage(result, this.connection.CompanyNumber, !useKeys, viewId, logicalId);
                        returnArray.Add(JToken.FromObject(message));
                        this._appCache.Add(MajorbucketB, messageKey, message, new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(this._tokenObject.InforIdmCacheExpirationAbsolute) });
                        if (!bAddressSet)
                        {
                           returnAddress = ClassHelper.ReturnAddress(result);
                           bAddressSet = returnAddress != null;
                           if (bAddressSet)
                           {
                              this._appCache.Add(MajorbucketA, messageKey, returnAddress, new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(this._tokenObject.InforIdmCacheExpirationAbsolute) });
                           }
                        }
                     }
                  }
               }
               else
               {
                  returnArray.Add(JToken.FromObject(message));
                  if (!bAddressSet)
                  {
                     returnAddress = this._appCache.Get<JObject>(MajorbucketA, messageKey);
                     bAddressSet = returnAddress != null;
                  }
               }
               repoCount++;
            }
            returnBusMessage.Add("entities", JToken.FromObject(returnArray));

            var returnMessage = new JObject { { "businesscontextmessage", JToken.FromObject(returnBusMessage) } };
            if (bAddressSet)
            {
               returnMessage.Add("address", JToken.FromObject(returnAddress));
            }
            return returnMessage;
         }
         catch
         {
            return new JObject();
         }
      }

#pragma warning disable S1144 // Unused private types or members should be removed
      private static T ConvertValue<T>(string value)
      {
         if (string.IsNullOrEmpty(value))
         {
            if (typeof(T) == typeof(int))
            {
               value = "0";
            }
            if (typeof(T) == typeof(decimal))
            {
               value = "0";
            }
            if (typeof(T) == typeof(DateTime))
            {
               value = DateTime.MinValue.ToString(CultureInfo.InvariantCulture);
            }
         }
         return (T)Convert.ChangeType(value, typeof(T));
      }
#pragma warning restore S1144 // Unused private types or members should be removed

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (repositories != null)
         {
            foreach (var repo in this.repositories)
            {
               (repo as IDisposable)?.Dispose();
            }
         }
         base.Dispose(true);
      }
   }
}