using System;
using Logging.Logging;
using Security.Security;
using ServiceInterfaceClient.Progress;

namespace ServiceInterfaceClient.Utilities
{
   public static class GenerateToken
   {
      public static string Generate(NLogLogger myLogger)
      {
         if (!System.Web.HttpContext.Current.User.Identity.IsAuthenticated) return "";
         var myprincipal = System.Web.HttpContext.Current.User as ServiceInterfacePrincipal;
         if (myprincipal?.TokenObject == null || myprincipal?.TokenObject.SessionidGuid == Guid.Empty) return "";
         var progressSettings = new ProgressConfiguration();
         if (string.IsNullOrEmpty(progressSettings.ApplicationEncryptKey)
             || string.IsNullOrEmpty(progressSettings.ApplicationEncryptIv))
         {
            myLogger.Error("Encrypt Key and/or Encrypt IV are empty, the application will not operate.  Ensure they are set in the web.config");
            return "";
         }
         return ApplicationCookieUtilities.ObjectToToken(myprincipal.TokenObject, progressSettings.ApplicationEncryptKey, progressSettings.ApplicationEncryptIv);
      }

      public static TokenObject ReturnToken()
      {
          if (!System.Web.HttpContext.Current.User.Identity.IsAuthenticated) return null;
          var myprincipal = System.Web.HttpContext.Current.User as ServiceInterfacePrincipal;
          if (myprincipal?.TokenObject == null || myprincipal?.TokenObject.SessionidGuid == Guid.Empty) return null;
          return myprincipal?.TokenObject;
      }
   }
}