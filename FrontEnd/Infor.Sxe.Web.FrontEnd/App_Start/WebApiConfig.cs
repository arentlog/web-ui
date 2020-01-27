using System.Web.Http;
using Infor.Sxe.Web.FrontEnd.Infrastructure.Binders;

namespace Infor.Sxe.Web.FrontEnd
{
   public static class WebApiConfig
   {
      public static void Register(HttpConfiguration config)
      {
#if !DEBUG
         config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Never;
#endif

         GlobalConfiguration.Configuration.BindParameter(typeof(decimal), new EmptyDecimalModelBinder());
         GlobalConfiguration.Configuration.BindParameter(typeof(string), new EmptyStringModelBinder());
         GlobalConfiguration.Configuration.BindParameter(typeof(int), new EmptyIntModelBinder());
         GlobalConfiguration.Configuration.BindParameter(typeof(bool), new EmptyBoolModelBinder());
         GlobalConfiguration.Configuration.BindParameter(typeof(long), new EmptyLongModelBinder());
         GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
         config.MapHttpAttributeRoutes();
        }
    }
}