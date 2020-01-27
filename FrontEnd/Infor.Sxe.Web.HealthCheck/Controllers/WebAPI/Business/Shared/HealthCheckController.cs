using System.Web.Http;
using Infor.Sxe.Web.HealthCheck.Models;

namespace Infor.Sxe.Web.HealthCheck.Controllers.WebAPI.Business.Shared
{
   /// <summary>
   /// Functions for logging in, out, clearing operator etc.
   /// </summary>
   [RoutePrefix("web")]
   public class HealthCheckController : ApiController
   {
      /// <summary>
      /// Clear operator, alternatively login after clearing
      /// </summary>
      [HttpGet]
      [Route("healthcheck")]
      public HealthCheckModel ClearOperator(string tenant = "")
      {
         return new HealthCheckModel
         {
            web = "true",
            messagingservice = "true",
            ejb = "true",
            success = "true",
            failuremessage = string.Empty
         };
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         base.Dispose(true);
      }
   }
}