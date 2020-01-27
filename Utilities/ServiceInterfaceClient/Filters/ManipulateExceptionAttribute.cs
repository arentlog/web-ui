using System.Web.Http.Filters;
using Logging.Logging;

namespace ServiceInterfaceClient.Filters
{
   public class ManipulateExceptionAttribute : ExceptionFilterAttribute
   {
      private const string ManipulateExceptionText = "ManipulateException";
      public override void OnException(HttpActionExecutedContext actionExecutedContext)
      {
         // PMC 02/09/2018 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
         var nLogLogger = new NLogLogger(ManipulateExceptionText);
         nLogLogger.ErrorException(actionExecutedContext.Exception.Message, actionExecutedContext.Exception);
      }
   }
}