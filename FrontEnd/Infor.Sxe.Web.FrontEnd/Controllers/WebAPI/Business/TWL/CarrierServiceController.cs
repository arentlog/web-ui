using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdscarrierService;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/carrierservice")]
   public class CarrierServiceController : ApiControllerBase
   {
      private readonly ICarrierServiceService carrierServiceService;

      public CarrierServiceController(ICarrierServiceService carrierServiceService)
      {
         this.carrierServiceService = carrierServiceService;
      }

      [HttpPost]
      [Route("gettwlcarrierservices")]
      public IEnumerable<CarrierService> GetTWLCarrierServices(GetTWLCarrierServicesApi getTWLCarrierServicesApi)
      {
         return this.carrierServiceService.GetTWLCarrierServices(getTWLCarrierServicesApi);
      }

      [HttpGet]
      [Route("gettwlcarrierservices/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{carrierId:maxLength(16)}/{service:maxLength(10)}")]
      public IEnumerable<CarrierService> GetTWLCarrierServices(string coNum, string whNum, string carrierId, string service, int batchsize = 0, string fldlist = "")
      {
         var getTWLCarrierServicesApi = new GetTWLCarrierServicesApi()
         {
            coNum = coNum,
            whNum = whNum,
            carrierId = carrierId,
            service = service,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.carrierServiceService.GetTWLCarrierServices(getTWLCarrierServicesApi);
      }

      [HttpGet]
      [Route("gettwlcarrierservices/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<CarrierService> GetTWLCarrierServices(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLCarrierServicesApi = new GetTWLCarrierServicesApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.carrierServiceService.GetTWLCarrierServices(getTWLCarrierServicesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.carrierServiceService?.Dispose();
         base.Dispose(true);
      }
   }
}