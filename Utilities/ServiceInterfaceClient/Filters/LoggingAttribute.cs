using System.Web.Http.Filters;
using Logging.Logging;
using NLog;
using ActionFilterAttribute = System.Web.Http.Filters.ActionFilterAttribute;

namespace ServiceInterfaceClient.Filters
{
   public class LoggingAttribute : ActionFilterAttribute
   {
      public override void OnActionExecuted(HttpActionExecutedContext actionContext)
      {
         var nLogLogger = new NLogLogger("ApiLog", "Harvest");
         if (nLogLogger.Logger.IsInfoEnabled)
         {
            MappedDiagnosticsContext.Set("method", actionContext.Request.Method.Method);
            MappedDiagnosticsContext.Set("url", actionContext.Request.RequestUri.LocalPath);
            MappedDiagnosticsContext.Set("query", actionContext.Request.RequestUri.Query);
            if (nLogLogger.Logger.IsTraceEnabled)
            {
               string data;
               using (var stream = actionContext.Request.Content.ReadAsStreamAsync().Result)
               {
                  if (stream.CanSeek)
                  {
                     stream.Position = 0;
                  }
                  data = actionContext.Request.Content.ReadAsStringAsync().Result;
               }
               MappedDiagnosticsContext.Set("request", data);
            }
            nLogLogger.Info(string.Empty);
         }
         base.OnActionExecuted(actionContext);
      }
   }
}