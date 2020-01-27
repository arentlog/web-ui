﻿using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using ServiceInterfaceClient.Utilities;

namespace Infor.Sxe.Web.FrontEnd.Infrastructure.ErrorHandlers
{
   public class GeneralErrorResult : IHttpActionResult
   {
      public HttpRequestMessage Request { get; set; }
      public ErrorResponseJson Content { get; set; }

      public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
      {
         // PMC 07/16/2016 - IBM AppScan - This has been manually reviewed and passed as being safe
         var response = new HttpResponseMessage(HttpStatusCode.OK)
         {
            Content = new StringContent(JsonConvert.SerializeObject(this.Content)),
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