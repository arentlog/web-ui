using System;
using System.Web.Http.Filters;
using System.Web.Mvc;

using Logging.Logging;

using Security.Security;
using ServiceInterfaceClient.Utilities;

using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;

namespace ServiceInterfaceClient.Filters
{
   public class TokenHeaderAddAttribute : ActionFilterAttribute
   {
      private const string TokenHeaderAddExceptionText = "TokenHeaderAddException";

      public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
      {
         // PMC 07/14/2016 - IBM AppScan - This has been manually reviewed and passed as being safe Manipulating the response that we are composing
         if (actionExecutedContext.Response != null)
         {
            actionExecutedContext.Response.Content.Headers.Remove(ApplicationCookieUtilities.TokenName);
            if (!System.Web.HttpContext.Current.User.Identity.IsAuthenticated) return;
            var myprincipal = System.Web.HttpContext.Current.User as ServiceInterfacePrincipal;
            if (myprincipal?.TokenObject == null || myprincipal?.TokenObject.SessionidGuid == Guid.Empty) return;
            var progressSettings = DependencyResolver.Current.GetService<IProgressConfiguration>();
            if (string.IsNullOrEmpty(progressSettings.ApplicationEncryptKey)
                || string.IsNullOrEmpty(progressSettings.ApplicationEncryptIv))
            {
               var nLogLogger = new NLogLogger(TokenHeaderAddExceptionText);
               nLogLogger.Error("Encrypt Key and/or Encrypt IV are empty, the application will not operate.  Ensure they are set in the web.config");
               return;
            }
            var token = ApplicationCookieUtilities.ObjectToToken(myprincipal.TokenObject, progressSettings.ApplicationEncryptKey, progressSettings.ApplicationEncryptIv);
            actionExecutedContext.Response.Content.Headers.Add(ApplicationCookieUtilities.TokenName, token);
         }
      }
   }
}