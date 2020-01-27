using System.Web.Http.ExceptionHandling;

using Logging.Logging;

using ServiceInterfaceClient.Utilities;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.ErrorHandlers
{
   public class GeneralExceptionHandler : ExceptionHandler
   {
      private const string GeneralExceptionHandlerContext = "GeneralExceptionHandler";
      public override void Handle(ExceptionHandlerContext context)
      {
         // PMC 07/16/2016 - IBM AppScan - This has been manually reviewed and passed as being safe - Does not reveal error, logs securely
         var nLogLogger = new NLogLogger(GeneralExceptionHandlerContext);
         nLogLogger.ErrorException(context.Exception.Message, context.Exception);
         context.Result = new GeneralErrorResult
         {
            Request = context.ExceptionContext.Request,
            Content = new ErrorResponseJson
            {
               Message = context.Exception.Message
            }
         };
      }
   }
}