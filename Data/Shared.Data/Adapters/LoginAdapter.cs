using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using com.infor.sxproxy.sharedproxy;
using com.infor.sxproxy.sharedproxy.StrongTypesNS;
using Infor.Sxe.Shared.Data.Models;
using Infor.Sxe.Shared.Data.Models.Pdcrtsasoofromifs;
using Infor.Sxe.Shared.Data.Models.Pdschangepassword;
using Infor.Sxe.Shared.Data.Models.PdsUserLogin;
using Logging.Logging;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Progress;

namespace Infor.Sxe.Shared.Data.Adapters
{
   public class LoginAdapter : IDisposable
   {
      private const string OperInUse = "operator in use.";

      private bool _disposed;

      private const double TimeRemainingMultiplier = 0.95;

      private SharedProxyAppObject _asProxyAppObject;

      private pdsContextDataSet _pdsContext;

      private loginproxy _poLoginproxy;

      private static NLogLogger _nLogLogger;

      private static NLogLogger _nLogLoggerP;

      public LoginAdapter(IProgressConnection connection)
      {
         _nLogLogger = new NLogLogger("LoginAdapter");
         _nLogLoggerP = new NLogLogger("Performance", "LoginAdapter");
         try
         {
            this._asProxyAppObject = new SharedProxyAppObject(connection.Connection);
            this._pdsContext = new pdsContextDataSet();
            this._poLoginproxy = this._asProxyAppObject.CreatePO_loginproxy();
         }
         catch (Exception ex)
         {
            _nLogLogger.ErrorException("Failed in login adapter ", ex);
            // PMC 02/09/2018 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
            ErrorReportingHelper.ReportProgramErrors($"Error in login constructor - {ex.Message}");
         }
      }

      public LoginInternalResult Login(string username, string password, int companyNumber, string languageID, bool firstLogin, bool singleTenant)
      {
         _nLogLogger.Debug($"username {username}", "Login");
         _nLogLogger.Debug($"password {password}", "Login");
         _nLogLogger.Debug($"companyNumber {companyNumber}", "Login");
         _nLogLogger.Debug($"languageID {languageID}", "Login");
         _nLogLogger.Debug($"firstLogin {firstLogin}", "Login");
         _nLogLogger.Debug($"singleTenant {singleTenant}", "Login");
         var pdsUserLoginDataSet = new pdsUserLoginDataSet();
         pdsUserLoginDataSet.ttblUserLogin.AddttblUserLoginRow(username, password, companyNumber, languageID, firstLogin, singleTenant);
         var cErrorMessage = string.Empty;
         StopwatchUtil.Time(
            () =>
            {
               this._poLoginproxy.Login(ref this._pdsContext, ref pdsUserLoginDataSet, out cErrorMessage);
            });
         _nLogLoggerP.Trace("Login");
         if (!string.IsNullOrEmpty(cErrorMessage))
         {
            if (cErrorMessage.Contains(OperInUse))
            {
               _nLogLogger.Warn($"Error returned - {cErrorMessage}", "PopulateLoginModel");
            }
            else
            {
               _nLogLogger.Error($"Error returned - {cErrorMessage}", "PopulateLoginModel");
            }
         }
         if (pdsUserLoginDataSet.HasErrors)
         {
            _nLogLogger.Error("pdsUserContext is showing errors", "Login");
         }
         var result = new UserLogin();
         if (pdsUserLoginDataSet.ttblUserLogin.Count > 0)
         {
            result = UserLogin.BuildUserLoginFromRow(pdsUserLoginDataSet.ttblUserLogin[0]);
         }
         var loginInternalResult = this.PopulateLoginModel(pdsUserLoginDataSet.HasErrors, cErrorMessage, result, firstLogin);
         loginInternalResult.availUsers = new List<AvailUsers>();
         foreach (DataRow row in pdsUserLoginDataSet.ttblAvailUsers)
         {
            _nLogLogger.Debug($"Building Avail Users", "Login");
            loginInternalResult.availUsers.Add(AvailUsers.BuildAvailUsersFromRow(row));
         }
         _nLogLogger.Debug($"Finished Login", "Login");
         return loginInternalResult;
      }

      public long Renew(Guid sessionId, string username, int companyNumber)
      {
         this.AddContextValue("client", "sessionID", sessionId.ToString("D"));
         this.AddContextValue("client", "cono", companyNumber.ToString("D"));
         this.AddContextValue("client", "operinit", username);
         this._poLoginproxy.RenewSession(ref this._pdsContext, out var cErrorMessage);
         var result = new UserLogin { userLoginCono = companyNumber, userLoginName = username };
         return this.PopulateLoginModel(this._pdsContext.HasErrors, cErrorMessage, result, false, sessionId).NumberOfMinutes;
      }

      public LogoutResults Logout(Guid sessionId, string username, int companyNumber)
      {
         this.AddContextValue("client", "sessionID", sessionId.ToString("D"));
         this.AddContextValue("client", "cono", companyNumber.ToString("D"));
         this.AddContextValue("client", "operinit", username);
         var cErrorMessage = string.Empty;
         StopwatchUtil.Time(
            () =>
            {
               this._poLoginproxy.Logout(ref this._pdsContext, out cErrorMessage);
            });
         _nLogLoggerP.Trace("Logout");
         var toReturn = new LogoutResults
                           {
                              Success =
                                 !this._pdsContext.HasErrors && String.IsNullOrWhiteSpace(cErrorMessage),
                              ErrorMessage = cErrorMessage
                           };
         return toReturn;
      }

      public string ChangePassword(Changepassword changepassword, int iCompanyNumber)
      {
         var pdschangepassword = new pdschangepasswordDataSet();
         DataRow ttblchangepasswordCriteria = pdschangepassword.ttblchangepassword.NewttblchangepasswordRow();
         Changepassword.UpdateRowFromChangepassword(ref ttblchangepasswordCriteria, changepassword);
         pdschangepassword.ttblchangepassword.AddttblchangepasswordRow((pdschangepasswordDataSet.ttblchangepasswordRow)ttblchangepasswordCriteria);
         var cErrorMessage = string.Empty;
         StopwatchUtil.Time(
            () =>
            {
               this._poLoginproxy.ChangePassword(ref this._pdsContext, iCompanyNumber, pdschangepassword, out cErrorMessage);
            });
         _nLogLoggerP.Trace("ChangePassword");
         return cErrorMessage;
      }

      public string GetContextParameter(string contextTaskId, string contextName)
      {
         var contextRow = this._pdsContext.ttblContext.FindByContextTaskIdContextName(contextTaskId, contextName);
         return contextRow != null ? contextRow.ContextValue : "";
      }

      public void AddContextValue(string contextTaskId, string contextName, object contextValue)
      {
         this._pdsContext.ttblContext.AddttblContextRow(contextTaskId, contextName, contextValue.ToString());
      }

      private LoginInternalResult PopulateLoginModel(
         bool userLoginErrors,
         string errorMessage,
         UserLogin userLogin,
         bool firstLogin,
         Guid? useThisSessionId = null)
      {
         var loginModel = new LoginInternalResult
         {
            Success = (!userLoginErrors && !this._pdsContext.HasErrors),
            ErrorMessage = errorMessage,
            NumberOfMinutes = 0
         };

         if (errorMessage.Equals(OperInUse, StringComparison.InvariantCultureIgnoreCase))
         {
            loginModel.Success = false;
            loginModel.UserRequiresClearing = true;
            return loginModel;
         }

         if (!string.IsNullOrEmpty(this.GetContextParameter("client", "ResetPassword")))
         {
            loginModel.ChangePassword = (this.GetContextParameter("client", "ResetPassword").Equals("true", StringComparison.InvariantCultureIgnoreCase));
            if (loginModel.ChangePassword)
            {
               loginModel.Success = false;
               return loginModel;
            }
         }

         if (userLogin != null)
         {
            loginModel.userID = userLogin.userLoginName;
            loginModel.cono = userLogin.userLoginCono;
         }

         if (loginModel.Success)
         {
            var sessionId = useThisSessionId ?? new Guid();
            var successParseSessionId = true;
            if (useThisSessionId == null)
            {
               if (!string.IsNullOrEmpty(this.GetContextParameter("client", "sessionID")))
               {
                  successParseSessionId = Guid.TryParse(this.GetContextParameter("client", "sessionID"), out sessionId);
               }
               else
               {
                  if (!firstLogin)
                  {
                     _nLogLogger.Error("Unable to find a sessionID in the pdsContext", "PopulateLoginModel");
                  }
               }
            }

            if (successParseSessionId)
            {
               if (!string.IsNullOrEmpty(this.GetContextParameter("client", "expiration")))
               {
                  // PMC 02/09/2018 - IBM AppScan - Reviewed, this code is coded as it should be.  The date time manipulation is to design
                  var expirationValue = this.GetContextParameter("client", "expiration");
                  DateTime checkDate;
                  DateTime.TryParse(expirationValue, out checkDate);
                  var newDto = DateTimeOffset.Parse(expirationValue, null, DateTimeStyles.RoundtripKind);
                  var timeRemaining = newDto - DateTime.Now;
                  timeRemaining = TimeSpan.FromTicks((long)(timeRemaining.Ticks * TimeRemainingMultiplier));
                  loginModel.NumberOfMinutes = Convert.ToInt64(timeRemaining.TotalMinutes);
                  loginModel.SessionID = sessionId;
               }
               else
               {
                  loginModel.Success = false;
               }
            }
            else
            {
               loginModel.Success = false;
            }
         }
         else
         {
            if (!string.IsNullOrEmpty(this.GetContextParameter("client", "ResetPassword")))
            {
               loginModel.ChangePassword = (this.GetContextParameter("client", "ResetPassword").ToUpper(CultureInfo.InvariantCulture) == "TRUE");
            }
         }

         return loginModel;
      }

      public Crtsasoofromifs CreateSasooFromIfs(Crtsasoofromifs crtsasoofromifs)
      {
         var result = new Crtsasoofromifs();
         var pdcrtsasoofromifs = new pdcrtsasoofromifsDataSet();

         DataRow ttblcrtsasoofromifsCriteria = pdcrtsasoofromifs.ttblcrtsasoofromifs.NewttblcrtsasoofromifsRow();
         Crtsasoofromifs.UpdateRowFromCrtsasoofromifs(ref ttblcrtsasoofromifsCriteria, crtsasoofromifs);
         pdcrtsasoofromifs.ttblcrtsasoofromifs.AddttblcrtsasoofromifsRow((pdcrtsasoofromifsDataSet.ttblcrtsasoofromifsRow)ttblcrtsasoofromifsCriteria);
         StopwatchUtil.Time(
            () =>
            {
               _poLoginproxy.CreateSASOOFromIFS(ref this._pdsContext, ref pdcrtsasoofromifs, out var cErrorMessage);
               if (pdcrtsasoofromifs.ttblcrtsasoofromifs.Count > 0)
               {
                  result = Crtsasoofromifs.BuildCrtsasoofromifsFromRow(pdcrtsasoofromifs.ttblcrtsasoofromifs[0]);
               }
               result.cErrorMessage = cErrorMessage;
            });
         _nLogLoggerP.Trace("CreateSASOOFromIFS");
         return result;
      }

      public string ClearOperator(int cono, string oper)
      {
         var cErrorMessage = string.Empty;
         this.AddContextValue("client", "cono", cono.ToString("D"));
         this.AddContextValue("client", "operinit", oper);
         StopwatchUtil.Time(
            () =>
            {
               this._poLoginproxy.ClearCoreSession(ref this._pdsContext, cono, oper, out cErrorMessage);

            });
         _nLogLoggerP.Trace("ClearCoreSession");
         return cErrorMessage;
      }

      public void Dispose()
      {
         this.Dispose(true);
         GC.SuppressFinalize(this);
      }

      ~LoginAdapter()
      {
         this.Dispose(false);
      }

      protected virtual void Dispose(bool disposing)
      {
         if (this._disposed)
         {
            return;
         }
         if (!disposing)
         {
            return;
         }
         this._poLoginproxy?.Dispose();
         this._poLoginproxy = null;
         this._asProxyAppObject?.Dispose();
         this._asProxyAppObject = null;

         this._pdsContext?.Dispose();
         this._pdsContext = null;
         this._disposed = true;
      }
   }
}