using System.Web.Http.Filters;

namespace Infor.Sxe.Web.HealthCheck.Infrastructure.Filters
{
   public class ManipulateExceptionAttribute : ExceptionFilterAttribute
   {
      private const string ManipulateExceptionText = "ManipulateException";
      public override void OnException(HttpActionExecutedContext actionExecutedContext)
      {
      }
   }
}