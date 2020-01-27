using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models;
using Logging.Logging;
using Security.Security;
using ServiceInterfaceClient.Filters;
using ServiceInterfaceClient.Resources;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   using System.Net;
   using Newtonsoft.Json;
   using ServiceInterfaceClient.Progress;
   using ServiceInterfaceClient.Utilities;

   /// <summary>
   /// Functions for logging in, out, clearing operator etc.
   /// </summary>
   [ManipulateException]
   [TokenHeaderAdd]
   [RoutePrefix("api/shared/login")]
   public class LoginApiController : ApiController
   {
      private readonly ILoginService loginService;

      private readonly IBusinessRules businessRules;

      private static NLogLogger _nLogLogger;

      private Dictionary<string, string> rules;

      public LoginApiController(ILoginService loginService, IBusinessRules businessRules)
      {
         this.loginService = loginService;
         this.businessRules = businessRules;
         _nLogLogger = new NLogLogger(ApplicationCookieUtilities.ReturnFunctionFromActionContext(this.ActionContext));
      }

      /// <summary>
      /// Login into Infor Distribution SX.e
      /// </summary>
      [HttpPost]
      [Route("prelogin")]
      public PreLoginResults PreLogin()
      {
         return this.loginService.PreLogin(this.ActionContext.Request.Headers.Host);
      }

      /// <summary>
      /// Login into Infor Distribution SX.e
      /// </summary>
      [BearerTokenAdd]
      [HttpPost]
      [Route("login")]
      public LoginResponseModel Login(LoginRequestModel loginRequestModel)
      {
         _nLogLogger.Trace("Start", "Login Controller");
         var loginResults = this.loginService.Login(loginRequestModel, this.ActionContext.Request.Headers.Host);
         _nLogLogger.Trace("After Login Call", "Login Controller");

         if (loginResults.Success)
         {
            _nLogLogger.Trace("Before Business Rules", "Login Controller");
            this.DoBusinessRules(loginResults);
            _nLogLogger.Trace("After Business Rules", "Login Controller");

            var token = GenerateToken.Generate(_nLogLogger);
            if (token != "")
            {
               bool error;
               var uriBuilder = new UriBuilder(loginResults.RestAccessUrl + "/web/api/sa/SaGetEnv");
               var saGetRequest = new SaGetEnvResponse
               {
                  ttblsaenv = new Ttblsaenv
                  {
                     dateformat = ""
                  }
               };
               var webHeaderCollection = new WebHeaderCollection
               {
                  { "Token", token },
                  { "Accept-Encoding", "gzip, deflate" },
                  { "Accept", "application/json" },
                  { "Content-Type", "application/json" }
               };
               var responseObject = MakeWebCall.DoWebCallString<SaGetEnvResponse>(uriBuilder.Uri, true,
                  JsonConvert.SerializeObject(saGetRequest), webHeaderCollection, out error, _nLogLogger);
               if (!error)
               {
                  loginResults.DateFormat = responseObject.ttblsaenv.dateformat;
               }
               else
               {
                  _nLogLogger.Error("Failed to get environment");
               }

               uriBuilder = new UriBuilder(loginResults.RestAccessUrl + "/web/api/shared/logintimezone");
               var tokenObject = GenerateToken.ReturnToken();
               var loginZoneTimeRequest = new LoginZoneTimeRequest
               {
                  ttbllogintimezone = new Ttbllogintimezone
                  {
                     cono = tokenObject.Cono,
                     oper2 = tokenObject.Oper,
                     sessionid = tokenObject.SessionidGuid,
                     logintimezone = loginRequestModel.OffsetTime
                  }
               };

               MakeWebCall.DoWebCallString<string>(uriBuilder.Uri, true, 
                  JsonConvert.SerializeObject(loginZoneTimeRequest), webHeaderCollection, out error, _nLogLogger, true);
               if (error)
               {
                  _nLogLogger.Error("Failed to set timezone");
               }
            }
         }
         return loginResults;
      }

      /// <summary>
      /// Clear operator, alternatively login after clearing
      /// </summary>
      [HttpPost]
      [Route("clearoper")]
      public LoginResponseModel ClearOperator(LoginRequestModel loginRequest, bool runLogin = true)
      {
         var clearOperator = this.loginService.ClearOperator(loginRequest, this.ActionContext.Request.Headers.Host);
         if (!string.IsNullOrEmpty(clearOperator))
         {
            return (new LoginResponseModel { Success = false });
         }
         if (runLogin)
         {
            return this.Login(loginRequest);
         }
         return (new LoginResponseModel { Success = true });
      }

      private void DoBusinessRules(LoginResponseModel loginResponseModel)
      {
         if (loginResponseModel.Success)
         {
            string myhost;
            var progressConfiguration = new ProgressConfiguration();
            var tokenObject = ApplicationCookieUtilities.Principal(HttpContext.Current.User, out myhost);
            this.rules = this.businessRules.GetConfigurationAtLogin(tokenObject.Cono);
            if (this.rules.Any())
            {
               tokenObject.IdmConsumerKey = progressConfiguration.InforIdmConsumerKey;
               tokenObject.IdmSharedSecret = progressConfiguration.InforIdmSharedSecret;
               tokenObject.InforIdmCacheExpirationAbsolute = progressConfiguration.InforIdmCacheExpirationAbsolute;

               tokenObject.IdmUrl = this.ReturnRuleValue<string>("Infor.Webui-IDMUrl");
               tokenObject.IonApiUrl = this.ReturnRuleValue<string>("Infor.Webui-IonApiUrl");
               tokenObject.DefaultRecordLimit = this.ReturnRuleValue<int>("Infor.Webui-UserSettings.DefaultRecordLimit");
               tokenObject.ReportRecordLimit = this.ReturnRuleValue<int>("Infor.Webui-UserSettings.ReportRecordLimit");
               tokenObject.LookupMaxResults = this.ReturnRuleValue<int>("Infor.Webui-UserSettings.LookupMaxResults");
               loginResponseModel.DefaultRecordLimit = this.ReturnRuleValue<int>("Infor.Webui-UserSettings.DefaultRecordLimit");
               loginResponseModel.ReportRecordLimit = this.ReturnRuleValue<int>("Infor.Webui-UserSettings.ReportRecordLimit");
               loginResponseModel.LookupMaxResults = this.ReturnRuleValue<int>("Infor.Webui-UserSettings.LookupMaxResults");
               loginResponseModel.SuppressBusinessContext = this.ReturnRuleValue<bool>("Infor.Webui-Messaging.SuppressinforBusinessContext");
               loginResponseModel.RestAccessUrl = this.ReturnRuleValue<string>("Infor.Webui-RESTAccessURL");
               loginResponseModel.PendoApiKey = this.ReturnRuleValue<string>("Infor.Webui-PendoApiKey");
               loginResponseModel.TryAndBuy = this.ReturnRuleValue<string>("Infor.Webui-TryAndBuy");
               loginResponseModel.ShowImages = this.ReturnRuleValue<bool>("Infor.Webui-IDMShowImages");
               loginResponseModel.CallRetryDelay = this.ReturnRuleValue<int>("Infor.Webui-CallRetryDelay");
               loginResponseModel.CallRetryLimit = this.ReturnRuleValue<int>("Infor.Webui-CallRetryLimit");
               tokenObject.RestAccessUrl = loginResponseModel.RestAccessUrl;
            }
            else
            {
               _nLogLogger.Error("No Business Rules where returned - SASBRLoad - [category = CONFIG, nodenm = Infor.Webui]. The application will not perform correctly");
            }
         }
      }

      private T ReturnRuleValue<T>(string value)
      {
         value = value.ToUpper(CultureInfo.InvariantCulture);
         try
         {
            return ConvertValue<T>(this.rules[value]);
         }
         catch (Exception)
         {
            _nLogLogger.Warn($"Problem converting - {value}");
            return (T)Convert.ChangeType(typeof(T) == typeof(int) ? "0" : typeof(T) == typeof(bool) ? "false" : string.Empty, typeof(T));
         }
      }

      private static T ConvertValue<T>(string value)
      {
         if (string.IsNullOrEmpty(value))
         {
            value = typeof(T) == typeof(int) ? "0" : string.Empty;
         }
         return (T)Convert.ChangeType(value, typeof(T));
      }

      /// <summary>
      /// Clear operator, alternatively login after clearing
      /// </summary>
      [SxeAuthorization]
      [HttpPost]
      [Route("logout")]
      public LogoutResults Logout()
      {
         var loggingParams = ApplicationCookieUtilities.GetLoggingParams(HttpContext.Current.User, CommonStrings.Login_Renew);
         var logoutResult = this.loginService.Logout(new LoginRequestModel { Oper = loggingParams.oper, Tenant = loggingParams.tenant, Cono = loggingParams.cono }, this.ActionContext.Request.Headers.Host, loggingParams.sessionid);
         return logoutResult;
      }

      /// <summary>
      /// Clear operator, alternatively login after clearing
      /// </summary>
      [SxeAuthorization]
      [HttpPost]
      [Route("renew")]
      public long Renew()
      {
         var loggingParams = ApplicationCookieUtilities.GetLoggingParams(HttpContext.Current.User, CommonStrings.Login_Renew);
         var numberOfMinutes = this.loginService.Renew(new LoginRequestModel { Oper = loggingParams.oper, Tenant = loggingParams.tenant, Cono = loggingParams.cono }, this.ActionContext.Request.Headers.Host, loggingParams.sessionid);
         _nLogLogger.Info(CommonStrings.Logging_Success + "Renew");
         return numberOfMinutes;
      }

      /// <summary>
      /// Clear operator, alternatively login after clearing
      /// </summary>
      [BearerTokenAdd]
      [SxeAuthorization]
      [HttpPost]
      [Route("renewbearertoken")]
      public long RenewBearerToken()
      {
         return new ProgressConfiguration().SSoEnabled ? new ProgressConfiguration().InforIonBearerTokenLasts : 0;
      }

      /// <summary>
      /// Change Password
      /// </summary>
      [HttpPost]
      [Route("changepassword")]
      public string ChangePassword(ChangePasswordRequestModel changePasswordRequestModel)
      {
         var changePasswordResult = this.loginService.ChangePassword(changePasswordRequestModel, this.ActionContext.Request.Headers.Host);
         _nLogLogger.Info(changePasswordResult);
         return changePasswordResult;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.businessRules?.Dispose();
         this.loginService?.Dispose();
         base.Dispose(true);
      }
   }
}