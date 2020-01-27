using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdseodSetup;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/eodsetup")]
   public class EodSetupController : ApiControllerBase
   {
      private readonly IEodSetupService eodSetupService;

      public EodSetupController(IEodSetupService eodSetupService)
      {
         this.eodSetupService = eodSetupService;
      }

      [HttpPost]
      [Route("gettwleodsetups")]
      public IEnumerable<EodSetup> GetTWLEodSetups(GetTWLEodSetupsApi getTWLEodSetupsApi)
      {
         return this.eodSetupService.GetTWLEodSetups(getTWLEodSetupsApi);
      }

      [HttpGet]
      [Route("gettwleodsetups/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<EodSetup> GetTWLEodSetups(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLEodSetupsApi = new GetTWLEodSetupsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.eodSetupService.GetTWLEodSetups(getTWLEodSetupsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.eodSetupService?.Dispose();
         base.Dispose(true);
      }
   }
}