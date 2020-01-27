using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Web;
using General.Business.Enums.Shared;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models;
using Infor.Sxe.Shared.Data.Models.Pdcrtsasoofromifs;
using Infor.Sxe.Shared.Data.Models.Pdschangepassword;
using Infor.Sxe.Shared.Data.Models.PdsUserLogin;
using Infor.Sxe.Shared.Data.Repositories;
using Logging.Logging;
using Security.Enums;
using Security.Security;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Progress;
using ServiceInterfaceClient.Utilities;

namespace General.Business.Services.Shared
{
   public class LoginService : ServiceBase, ILoginService
   {
      private readonly LoginRepository _loginRepository;

      private readonly string _ssoFirst = "InforSxe";

      private readonly string _ssoSecond = "InforSSO-SX";

      public LoginService(LoginRepository loginRepository)
      {
         // PMC 02/09/2018 - IBM AppScan - Reviewed, this code is coded as it should be.  The date time manipulation is to design
         this._ssoFirst += DateTime.Now.ToString("yyyy");
         this._ssoSecond += DateTime.Now.ToString("yyyy");
         this._loginRepository = loginRepository;
      }

      private static void ReportErrors(ILogger nLogger, Dictionary<string, LoginErrorEnums> loggingEMessages, List<string> loggingIMessages, List<string> loggingWMessages)
      {
         foreach (var message in loggingIMessages)
         {
            nLogger.Info(message);
         }
         foreach (var message in loggingWMessages)
         {
            nLogger.Warn(message);
         }
         foreach (var message in loggingEMessages)
         {
            nLogger.Error(message.Key);
         }
      }

      public string ClearOperator(LoginRequestModel loginRequest, string host)
      {
         var claimsAndLoginObject = new ClaimsAndLoginObject(new ProgressConfiguration());
         var nLogger = this.ReturnTenantAndUser(claimsAndLoginObject, loginRequest, out _, out var logUser, "ClearOperator", host);
         ReportErrors(nLogger, claimsAndLoginObject.LoggingEMessages, claimsAndLoginObject.LoggingIMessages, claimsAndLoginObject.LoggingWMessages);
         var error = this._loginRepository.ClearOperator(loginRequest.Cono, logUser);
         if (string.IsNullOrEmpty(error))
         {
            nLogger.Error(error);
         }
         return error;
      }

      private static void RejectLogin(ILogger nLogger, string errorMessage, LoginErrorEnums errorCode)
      {
         nLogger.Error(errorMessage);
         ErrorReportingHelper.ReportErrors($"Unauthorized - Error Code {errorCode}", 401);
      }

      private ILogger ReturnTenantAndUser(ClaimsAndLoginObject claimsAndLoginObject, LoginRequestModel loginRequest, out string logTenant, out string logUser, string logType, string host)
      {
         logTenant = string.Empty;
         if (claimsAndLoginObject.MultiTenant)
         {
            if (!string.IsNullOrEmpty(claimsAndLoginObject.DeveloperLogin))
            {
               logTenant = claimsAndLoginObject.DeveloperTenant;
            }
            else
            {
               if (claimsAndLoginObject.SsoEnabled)
               {
                  logTenant = claimsAndLoginObject.Tenant;
               }
               else
               {
                  logTenant = loginRequest.Tenant;
                  if (string.IsNullOrEmpty(logTenant))
                  {
                     claimsAndLoginObject.LoggingEMessages.Add("No tenant passed into login, is required", LoginErrorEnums.TenantNotPassedInRequired);
                  }
               }
            }
         }
         logUser = loginRequest.Oper + (claimsAndLoginObject.MultiTenant ? "/" : string.Empty) + logTenant;

         return new NLogLogger(
            logTenant,
            logUser,
            0,
            new Guid(),
            logType,
            host);
      }

      public LoginResponseModel Login(LoginRequestModel loginRequest, string host)
      {
         var loginResponseModel = new LoginResponseModel();
         var claimsAndLoginObject = new ClaimsAndLoginObject(new ProgressConfiguration());
         var nLogger = this.ReturnTenantAndUser(claimsAndLoginObject, loginRequest, out var logTenant, out var logUser, "Login", host);
         ReportErrors(nLogger, claimsAndLoginObject.LoggingEMessages, claimsAndLoginObject.LoggingIMessages, claimsAndLoginObject.LoggingWMessages);
         nLogger.Trace("Start", "Login Service");
         if (claimsAndLoginObject.InvalidLogin)
         {
            var errorCode = LoginErrorEnums.Unknown;
            if (claimsAndLoginObject.LoggingEMessages.Any())
            {
               errorCode = claimsAndLoginObject.LoggingEMessages.First().Value;
            }
            RejectLogin(nLogger, "Unauthorized", errorCode);
            return new LoginResponseModel { Success = false };
         }
         var logPassword = claimsAndLoginObject.SsoEnabled || !string.IsNullOrEmpty(claimsAndLoginObject.DeveloperLogin) ? this._ssoSecond : loginRequest.Password;
         nLogger.Trace("Before Login", "Login Service");
         var loginInternalResult = this._loginRepository.Login(logUser, logPassword, loginRequest.Cono, loginRequest.Locale, false, !claimsAndLoginObject.MultiTenant);
         nLogger.Trace("After Login", "Login Service");
         if (loginInternalResult.ErrorMessage == "This Account (Operator) Is Disabled")
         {
            ErrorReportingHelper.ReportErrors("global.account.disabled", 403);
         }

         loginResponseModel.Oper = loginInternalResult.userID;
         loginResponseModel.Cono = loginInternalResult.cono;
         loginResponseModel.Success = loginInternalResult.Success;
         loginResponseModel.ChangePassword = loginInternalResult.ChangePassword;
         loginResponseModel.UserRequiresClearing = loginInternalResult.UserRequiresClearing;
         loginResponseModel.NumberOfMinutesBearer = new ProgressConfiguration().SSoEnabled
             ? new ProgressConfiguration().InforIonBearerTokenLasts
             : 0;
         loginResponseModel.NumberOfMinutes= loginInternalResult.NumberOfMinutes;
         loginResponseModel.SessionID = loginInternalResult.SessionID;
         loginResponseModel.Tenant = logTenant;
         loginResponseModel.Guid = claimsAndLoginObject.Identity;

         if (loginResponseModel.ChangePassword)
         {
            return loginResponseModel;
         }
         if (loginResponseModel.UserRequiresClearing)
         {
            return loginResponseModel;
         }
         if (!loginInternalResult.Success && (claimsAndLoginObject.SsoEnabled || !string.IsNullOrEmpty(claimsAndLoginObject.DeveloperLogin)))
         {
            RejectLogin(nLogger, $"Login Failed {loginInternalResult.ErrorMessage}", LoginErrorEnums.Unknown);
            return new LoginResponseModel { Success = false };
         }
         if (!loginInternalResult.Success)
         {
            return loginResponseModel;
         }
         var tokenObject = new TokenObject
         {
            Cono = loginResponseModel.Cono,
            Sessionid = loginResponseModel.SessionID.ToString("D"),
            Oper = loginResponseModel.Oper,
            Tenant = logTenant,
            CurrentUiCulture = loginRequest.Locale,
            OffsetTime = loginRequest.OffsetTime
         };

         PopulateUserPrincipal(tokenObject);
         nLogger.Trace("End", "Login Service");
         return loginResponseModel;
      }

      private static void PopulateUserPrincipal(TokenObject tokenObject)
      {
         var serviceInterfacePrincipal = new ServiceInterfacePrincipal(tokenObject, null, null, new ProgressConfiguration().SSoEnabled ? Thread.CurrentPrincipal.Identity : new GenericIdentity(tokenObject.Oper), string.Empty, null);
         HttpContext.Current.User = serviceInterfacePrincipal;
      }


      public PreLoginResults PreLogin(string host)
      {
         var preLoginResults = new PreLoginResults();
         var claimsAndLoginObject = new ClaimsAndLoginObject(new ProgressConfiguration());

         var logTenant = !string.IsNullOrEmpty(claimsAndLoginObject.DeveloperLogin) ? claimsAndLoginObject.DeveloperTenant : claimsAndLoginObject.Tenant;
         var logUser = !string.IsNullOrEmpty(claimsAndLoginObject.DeveloperLogin) ? claimsAndLoginObject.DeveloperLogin : claimsAndLoginObject.Identity;

         var nLogger = new NLogLogger(
               logTenant,
               logUser,
               0,
               new Guid(),
               "PreLogin",
               host);

         nLogger.Info("Start", "PreLogin");

         ReportErrors(nLogger, claimsAndLoginObject.LoggingEMessages, claimsAndLoginObject.LoggingIMessages, claimsAndLoginObject.LoggingWMessages);

         if (claimsAndLoginObject.InvalidLogin)
         {
            var errorCode = LoginErrorEnums.Unknown;
            if (claimsAndLoginObject.LoggingEMessages.Any())
            {
               errorCode = claimsAndLoginObject.LoggingEMessages.First().Value;
            }
            RejectLogin(nLogger, "Unauthorized", errorCode);
            return new PreLoginResults { LoginMode = PreLoginModes.Unauthorized };
         }

         if (claimsAndLoginObject.SsoEnabled || !string.IsNullOrEmpty(claimsAndLoginObject.DeveloperLogin))
         {
            var loginUser = logUser + (claimsAndLoginObject.MultiTenant ? "/" : string.Empty) + logTenant;
            nLogger.Info("Before Login", "PreLogin");
            var loginInternalResult = this._loginRepository.Login(loginUser, this._ssoFirst, 0, string.Empty, true, !claimsAndLoginObject.MultiTenant);
            nLogger.Info("After Login", "PreLogin");
            if (!loginInternalResult.availUsers.Any())
            {
               // Login did not return valid users
               if (claimsAndLoginObject.AutoProvisionEnabled)
               {
                  // Try an autoprovision
                  nLogger.Debug(
                     $"Auto Provision Called ifsuser-{claimsAndLoginObject.Identity} tenantid-{claimsAndLoginObject.Tenant} emailaddr-{claimsAndLoginObject.IfsEmail} firstname-{claimsAndLoginObject.IfsGivenName} lastname-{claimsAndLoginObject.IfsLastName} aecompanies-{claimsAndLoginObject.IfsAccountingEntities} securityroles-{claimsAndLoginObject.IfsSecurity}");

                  var provisionRecord = new Crtsasoofromifs
                  {
                     ifsuser = loginUser,
                     aecompanies = claimsAndLoginObject.IfsAccountingEntities,
                     firstname = claimsAndLoginObject.IfsGivenName,
                     lastname = claimsAndLoginObject.IfsLastName,
                     emailaddr = claimsAndLoginObject.IfsEmail,
                     securityroles = claimsAndLoginObject.IfsSecurity,
                     tenantid = claimsAndLoginObject.Tenant
                  };

                  var provisionResult = this._loginRepository.CreateSASOOFromIFS(provisionRecord);

                  if (!string.IsNullOrEmpty(provisionResult.cErrorMessage))
                  {
                     RejectLogin(nLogger, $"Auto Provision Failed - {provisionResult.cErrorMessage}", LoginErrorEnums.AutoProvisionFailed);
                     return new PreLoginResults { LoginMode = PreLoginModes.Unauthorized };
                  }

                  // Try a first stage login again
                  loginInternalResult = this._loginRepository.Login(loginUser, this._ssoFirst, 0, string.Empty, true, !claimsAndLoginObject.MultiTenant);
                  if (!loginInternalResult.availUsers.Any())
                  {
                     // Reject login as no users found.
                     RejectLogin(nLogger, string.Format(
                        $"Login did not return any valid user company combinations - {loginInternalResult.ErrorMessage} - Auto Provison was run"), LoginErrorEnums.NoUsersReturnedAfterAutoProvision);
                     return new PreLoginResults { LoginMode = PreLoginModes.Unauthorized };
                  }
               }
               else
               {
                  // Reject login as no users found.
                  RejectLogin(nLogger, string.Format(
                     $"Login did not return any valid user company combinations - {loginInternalResult.ErrorMessage}"), LoginErrorEnums.NoCombinationOfUsersPassedBack);
                  return new PreLoginResults { LoginMode = PreLoginModes.Unauthorized };
               }
            }

            // If we have reached this stage - we have at least one login unless we have LASTCONO record only.
            var lastCono = 0;
            preLoginResults.AvailableLogin = new List<AvailUsers>();
            foreach (var availUser in loginInternalResult.availUsers)
            {
               nLogger.Debug("Populate Each User", "PreLogin");
               if (availUser.availuser == "LASTCONO")
               {
                  nLogger.Debug("Populate Each User - Last Cono", "PreLogin");
                  lastCono = availUser.availcono;
               }
               else
               {
                  nLogger.Debug("Populate Each User - Add", "PreLogin");
                  preLoginResults.AvailableLogin.Add(availUser);
               }
            }
            if (!preLoginResults.AvailableLogin.Any())
            {
               // Reject login as no users found.
               RejectLogin(nLogger, string.Format(
                  $"Login did not return any valid user company combinations - {loginInternalResult.ErrorMessage}"), LoginErrorEnums.NoCombinationOfUsersPassedBack);
               return new PreLoginResults { LoginMode = PreLoginModes.Unauthorized };
            }
            nLogger.Debug("Before Set Default", "PreLogin");
            foreach (var user in preLoginResults.AvailableLogin)
            {
               if (user.availcono == lastCono)
               {
                  nLogger.Debug("Last Cono Set", "PreLogin");
                  preLoginResults.DefaultLogin = user.DisplayValue;
                  break;
               }
            }
            preLoginResults.LoginMode = PreLoginModes.SSOLoginSelectFromList;
         }
         else
         {
            preLoginResults.LoginMode = claimsAndLoginObject.MultiTenant ? PreLoginModes.StandardLoginWithTenant : PreLoginModes.StandardLogin;
            preLoginResults.AvailableTenants = claimsAndLoginObject.ListOfTenants;
         }
         nLogger.Debug("End", "PreLogin");
         return preLoginResults;
      }

      public LogoutResults Logout(LoginRequestModel loginRequest, string host, Guid sessionId)
      {
         var claimsAndLoginObject = new ClaimsAndLoginObject(new ProgressConfiguration());
         var nLogger = this.ReturnTenantAndUser(claimsAndLoginObject, loginRequest, out _, out var logUser, "Logout", host);
         ReportErrors(nLogger, claimsAndLoginObject.LoggingEMessages, claimsAndLoginObject.LoggingIMessages, claimsAndLoginObject.LoggingWMessages);
         return this._loginRepository.Logout(sessionId, logUser, loginRequest.Cono);
      }

      public long Renew(LoginRequestModel loginRequest, string host, Guid sessionId)
      {
         var claimsAndLoginObject = new ClaimsAndLoginObject(new ProgressConfiguration());
         var nLogger = this.ReturnTenantAndUser(claimsAndLoginObject, loginRequest, out _, out var logUser, "Renew", host);
         ReportErrors(nLogger, claimsAndLoginObject.LoggingEMessages, claimsAndLoginObject.LoggingIMessages, claimsAndLoginObject.LoggingWMessages);
         return this._loginRepository.Renew(sessionId, logUser, loginRequest.Cono);
      }

      public string ChangePassword(ChangePasswordRequestModel changePasswordRequestModel, string host)
      {
         var claimsAndLoginObject = new ClaimsAndLoginObject(new ProgressConfiguration());
         var nLogger = this.ReturnTenantAndUser(claimsAndLoginObject, changePasswordRequestModel, out _, out _, "ChangePassword", host);
         ReportErrors(nLogger, claimsAndLoginObject.LoggingEMessages, claimsAndLoginObject.LoggingIMessages, claimsAndLoginObject.LoggingWMessages);
         var changePassword = new Changepassword
         {
            oldpassword = changePasswordRequestModel.OldPassword,
            newpassword = changePasswordRequestModel.NewPassword,
            confirmpassword = changePasswordRequestModel.ConfirmPassword,
            usercompany = changePasswordRequestModel.Cono,
            username = changePasswordRequestModel.Oper
         };
         var returnValue = this._loginRepository.ChangePassword(changePassword, changePasswordRequestModel.Cono);
         if (!string.IsNullOrEmpty(returnValue))
         {
            nLogger.Warn(returnValue);
         }
         return returnValue;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this._loginRepository?.Dispose();
         base.Dispose(true);
      }
   }
}