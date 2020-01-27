using Infor.Sxe.Web.HealthCheck.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Infor.Sxe.Web.HealthCheck.Infrastructure.ErrorHandlers
{
   public class GeneralErrorResult : IHttpActionResult
   {
      public HttpRequestMessage Request { get; set; }
      public HealthCheckModel Content { get; set; }

      public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
      {
         var response = new HttpResponseMessage(HttpStatusCode.OK)
                           {
                              Content =
                                 new StringContent(
                                 JsonConvert.SerializeObject(this.Content)),
                              RequestMessage = this.Request
                           };
         if (response.Content.Headers.Contains("Content-Type"))
         {
            response.Content.Headers.Remove("Content-Type");
         }
         response.Content.Headers.Add("Content-Type", "application/json");
         return Task.FromResult(response);
      }
   }
}