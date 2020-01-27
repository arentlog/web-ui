using System.Web.Http;

namespace Infor.Sxe.Web.HealthCheck
{
   public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
#if !DEBUG
         config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Never;
         config.Routes.IgnoreRoute("help", "help");
#endif
         config.MapHttpAttributeRoutes();
      }
    }
}