using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscarrier;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/carrier")]
   public class CarrierController : ApiControllerBase
   {
      private readonly ICarrierService carrierService;

      public CarrierController(ICarrierService carrierService)
      {
         this.carrierService = carrierService;
      }

      [HttpPost]
      [Route("gettwlcarriers")]
      public IEnumerable<Carrier> GetTWLCarriers(GetTWLCarriersApi getTWLCarriersApi)
      {
         return this.carrierService.GetTWLCarriers(getTWLCarriersApi);
      }

      [HttpGet]
      [Route("gettwlcarriers/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{carrierId:maxLength(16)}")]
      public IEnumerable<Carrier> GetTWLCarriers(string coNum, string whNum, string carrierId, int batchsize = 0, string fldlist = "")
      {
         var getTWLCarriersApi = new GetTWLCarriersApi()
         {
            coNum = coNum,
            whNum = whNum,
            carrierId = carrierId,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.carrierService.GetTWLCarriers(getTWLCarriersApi);
      }

      [HttpGet]
      [Route("gettwlcarriers/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Carrier> GetTWLCarriers(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLCarriersApi = new GetTWLCarriersApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.carrierService.GetTWLCarriers(getTWLCarriersApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.carrierService?.Dispose();
         base.Dispose(true);
      }
   }
}