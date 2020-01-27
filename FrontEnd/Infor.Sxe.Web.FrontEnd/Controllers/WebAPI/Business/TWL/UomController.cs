using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsuom;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/uom")]
   public class UomController : ApiControllerBase
   {
      private readonly IUomService uomService;

      public UomController(IUomService uomService)
      {
         this.uomService = uomService;
      }

      [HttpPost]
      [Route("gettwlunitofmeasures")]
      public IEnumerable<Uom> GetTWLUnitOfMeasures(GetTWLUnitOfMeasuresApi getTWLUnitOfMeasuresApi)
      {
         return this.uomService.GetTWLUnitOfMeasures(getTWLUnitOfMeasuresApi);
      }

      [HttpGet]
      [Route("gettwlunitofmeasures/{uom:maxLength(14)}")]
      public IEnumerable<Uom> GetTWLUnitOfMeasures(string uom, int batchsize = 0, string fldlist = "")
      {
         var getTWLUnitOfMeasuresApi = new GetTWLUnitOfMeasuresApi()
         {
            uom = uom,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.uomService.GetTWLUnitOfMeasures(getTWLUnitOfMeasuresApi);
      }

      [HttpGet]
      [Route("gettwlunitofmeasures")]
      public IEnumerable<Uom> GetTWLUnitOfMeasures(int batchsize = 0, string fldlist = "")
      {
         var getTWLUnitOfMeasuresApi = new GetTWLUnitOfMeasuresApi()
         {
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.uomService.GetTWLUnitOfMeasures(getTWLUnitOfMeasuresApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.uomService?.Dispose();
         base.Dispose(true);
      }
   }
}