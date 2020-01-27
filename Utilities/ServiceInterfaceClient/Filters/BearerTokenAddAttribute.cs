using System;
using System.Web.Http.Filters;

using Logging.Logging;

using Security.Security;
using ServiceInterfaceClient.Progress;
using ServiceInterfaceClient.Utilities;

using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;

namespace ServiceInterfaceClient.Filters
{
   public class BearerTokenAddAttribute : ActionFilterAttribute
   {
      private const string BearerTokenAddExceptionText = " BearerTokenAddExceptionException";

      public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
      {
         var nLogLogger = new NLogLogger(BearerTokenAddExceptionText);
         try
         {
            if (new ProgressConfiguration().SSoEnabled && actionExecutedContext.Response != null)
            {
               actionExecutedContext.Response.Content.Headers.Remove(ApplicationCookieUtilities.BearerToken);
               var bearerToken = BearerToken.GetBearerToken(nLogLogger);
               if (bearerToken != null)
               {
                  bearerToken = StringProtector.Protect(bearerToken, new ProgressConfiguration().ApplicationEncryptKey,
                     new ProgressConfiguration().ApplicationEncryptIv);
                  actionExecutedContext.Response.Content.Headers.Add(ApplicationCookieUtilities.BearerToken,
                     bearerToken);
               }
            }
         }
         catch (Exception ex)
         {
            nLogLogger.ErrorException(ex.Message, ex);
         }
      }
   }
}