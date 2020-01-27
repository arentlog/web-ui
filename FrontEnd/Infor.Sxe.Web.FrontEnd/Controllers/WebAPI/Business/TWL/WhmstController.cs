using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswhmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/whmst")]
   public class WhmstController : ApiControllerBase
   {
      private readonly IWhmstService whmstService;

      public WhmstController(IWhmstService whmstService)
      {
         this.whmstService = whmstService;
      }

      [HttpPost]
      [Route("gettwlwarehouses")]
      public IEnumerable<Whmst> GetTWLWarehouses(GetTWLWarehousesApi getTWLWarehousesApi)
      {
         return this.whmstService.GetTWLWarehouses(getTWLWarehousesApi);
      }

      [HttpGet]
      [Route("gettwlwarehouses/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Whmst> GetTWLWarehouses(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLWarehousesApi = new GetTWLWarehousesApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.whmstService.GetTWLWarehouses(getTWLWarehousesApi);
      }

      [HttpGet]
      [Route("gettwlwarehouses/{coNum:maxLength(4)}")]
      public IEnumerable<Whmst> GetTWLWarehouses(string coNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLWarehousesApi = new GetTWLWarehousesApi()
         {
            coNum = coNum,
            whNum = "",
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.whmstService.GetTWLWarehouses(getTWLWarehousesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.whmstService?.Dispose();
         base.Dispose(true);
      }
   }
}