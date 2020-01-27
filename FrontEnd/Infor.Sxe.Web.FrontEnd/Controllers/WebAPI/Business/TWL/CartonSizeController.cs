using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdscartonSize;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/cartonsize")]
   public class CartonSizeController : ApiControllerBase
   {
      private readonly ICartonSizeService cartonSizeService;

      public CartonSizeController(ICartonSizeService cartonSizeService)
      {
         this.cartonSizeService = cartonSizeService;
      }

      [HttpPost]
      [Route("gettwlcartonsizes")]
      public IEnumerable<CartonSize> GetTWLCartonSizes(GetTWLCartonSizesApi getTWLCartonSizesApi)
      {
         return this.cartonSizeService.GetTWLCartonSizes(getTWLCartonSizesApi);
      }

      [HttpGet]
      [Route("gettwlcartonsizes/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{boxId:maxLength(18)}")]
      public IEnumerable<CartonSize> GetTWLCartonSizes(string coNum, string whNum, string boxId, int batchsize = 0, string fldlist = "")
      {
         var getTWLCartonSizesApi = new GetTWLCartonSizesApi()
         {
            coNum = coNum,
            whNum = whNum,
            boxId = boxId,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.cartonSizeService.GetTWLCartonSizes(getTWLCartonSizesApi);
      }

      [HttpGet]
      [Route("gettwlcartonsizes/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<CartonSize> GetTWLCartonSizes(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLCartonSizesApi = new GetTWLCartonSizesApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.cartonSizeService.GetTWLCartonSizes(getTWLCartonSizesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cartonSizeService?.Dispose();
         base.Dispose(true);
      }
   }
}