using System.Web.Mvc;
using System.Web.Routing;

namespace Infor.Sxe.Web.FrontEnd
{
   public static class RouteConfig
   {
      public static void RegisterRoutes(RouteCollection routes)
      {
         routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

         // Ignore the default (blank) route so that the index.html file can be served up
         routes.IgnoreRoute("");
      }
   }
}