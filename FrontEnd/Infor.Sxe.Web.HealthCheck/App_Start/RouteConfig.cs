using System.Web.Mvc;
using System.Web.Routing;

namespace Infor.Sxe.Web.HealthCheck
{
   public static class RouteConfig
   {
      public static void RegisterRoutes(RouteCollection routes)
      {
         routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

         // Ignore the default (blank) route so that the index.html file can be served up
         routes.IgnoreRoute("");

         routes.MapRoute(
             name: "Default",
             url: "{controller}/{action}/{id}",
             defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
         );
      }
   }
} 
