using System;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Security.Security;
using ServiceInterfaceClient.Progress;

namespace Infor.Sxe.Web.FrontEnd
{
   public class MvcApplication : HttpApplication
   {
      protected void Application_Start()
      {
         AreaRegistration.RegisterAllAreas();
         GlobalConfiguration.Configure(WebApiConfig.Register);
         FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
         RouteConfig.RegisterRoutes(RouteTable.Routes);
      }

      protected void Application_AuthenticateRequest(Object sender, EventArgs e)
      {
         // PMC 07/16/2016 - IBM AppScan - This has been manually reviewed and passed as being safe
         // Encrypted Token is validated. Any issues will cause the request to be returned as 401 Unauthorized
         var tokenObject = new TokenObject();
         var token = this.Context.Request.Headers[ApplicationCookieUtilities.TokenName];
         if (!string.IsNullOrEmpty(token))
         {
            var progressSettings = DependencyResolver.Current.GetService<IProgressConfiguration>();
            ApplicationCookieUtilities.TokenToObject(token, progressSettings.ApplicationEncryptKey, progressSettings.ApplicationEncryptIv, out tokenObject);
         }
         var callGuid = this.Context.Request.Headers[ApplicationCookieUtilities.CallGuidName];
         var bearerToken = this.Context.Request.Headers[ApplicationCookieUtilities.BearerToken];
         var serviceInterfacePrincipal = new ServiceInterfacePrincipal(tokenObject, this.Context.Request.Url.Host, this.Context.Request.UrlReferrer, new ProgressConfiguration().SSoEnabled ? Thread.CurrentPrincipal.Identity : new GenericIdentity(tokenObject.Oper), callGuid, bearerToken);
         this.Context.User = serviceInterfacePrincipal;
      }

      void Application_BeginRequest(object sender, EventArgs e)
      {
         Response.Cache.SetCacheability(HttpCacheability.NoCache);
         Response.Cache.SetExpires(DateTime.Now);
         Response.Cache.SetNoStore();
         Response.Cache.SetMaxAge(new TimeSpan(0, 0, 30));
      }
   }
}