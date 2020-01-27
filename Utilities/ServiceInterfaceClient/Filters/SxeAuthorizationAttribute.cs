using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Logging.Logging;

using Newtonsoft.Json;
using ServiceInterfaceClient.Resources;
using ServiceInterfaceClient.Utilities;

namespace ServiceInterfaceClient.Filters
{
   /// <summary>
   /// Authorization Filter for SXE
   /// </summary>
   public class SxeAuthorizationAttribute : AuthorizationFilterAttribute
   {
      private const string SxeAuthorization = "SxeAuthorization";

      public override void OnAuthorization(HttpActionContext actionContext)
      {
         var nLogLogger = new NLogLogger(SxeAuthorization);
         if (Thread.CurrentPrincipal.Identity.IsAuthenticated)
         {
            nLogLogger.Info(CommonStrings.Authorization_Passed);
            return;
         }
         nLogLogger.Warn(CommonStrings.Authorization_Failed);
         actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
         actionContext.Response.Content = new StringContent(JsonConvert.SerializeObject(new ErrorResponseJson { Message = CommonStrings.Token_Invalid }));
         if (actionContext.Response.Content.Headers.Contains("Content-Type"))
         {
            actionContext.Response.Content.Headers.Remove("Content-Type");
         }
         actionContext.Response.Content.Headers.Add("Content-Type", "application/json");
      }
   }
}