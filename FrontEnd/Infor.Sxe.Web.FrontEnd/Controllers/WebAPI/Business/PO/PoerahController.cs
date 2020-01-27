using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PO;
using General.Business.Models.PO;
using Infor.Sxe.PO.Data.Models.Pdspoerah;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PO
{
   [RoutePrefix("api/po/poerah")]
   public class PoerahController : ApiControllerBase
   {
      private readonly IPoerahService poerahService;

      public PoerahController(IPoerahService poerahService)
      {
         this.poerahService = poerahService;
      }

      [HttpPost]
      [Route("getpoerahlistbyvendwhseprodline")]
      public IEnumerable<Poerah> GetPoerahListByVendWhseProdLine(GetPoerahListByVendWhseProdLineRequestApi getPoerahListByVendWhseProdLineRequestApi)
      {
         return this.poerahService.GetPoerahListByVendWhseProdLine(getPoerahListByVendWhseProdLineRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.poerahService?.Dispose();
         base.Dispose(true);
      }
   }
}