using Infor.Sxe.Web.HealthCheck.Models;
using System.Web.Http.ExceptionHandling;

namespace Infor.Sxe.Web.HealthCheck.Infrastructure.ErrorHandlers
{
   public class GeneralExceptionHandler : ExceptionHandler
   {
      public override void Handle(ExceptionHandlerContext context)
      {
         context.Result = new GeneralErrorResult
                             {
                                Request = context.ExceptionContext.Request,
                                Content = new HealthCheckModel
                                             {
                                                web = "true",
                                                messagingservice = "true",
                                                ejb = "failure",
                                                failuremessage = "connection to ejb failed",
                                                success = "false"
                                             }
                             };
      }
   }
}