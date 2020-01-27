using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsbinmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/binmst")]
   public class BinmstController : ApiControllerBase
   {
      private readonly IBinmstService binmstService;

      public BinmstController(IBinmstService binmstService)
      {
         this.binmstService = binmstService;
      }

      [HttpPost]
      [Route("gettwlbinsnotactive")]
      public IEnumerable<Binmst> GetTWLBinsNotActive(GetTWLBinsNotActiveApi getTWLBinsNotActiveApi)
      {
         return this.binmstService.GetTWLBinsNotActive(getTWLBinsNotActiveApi);
      }

      [HttpPost]
      [Route("gettwlbinlocations")]
      public IEnumerable<Binmst> GetTWLBinLocations(GetTWLBinLocationsApi getTWLBinLocationsApi)
      {
         return this.binmstService.GetTWLBinLocations(getTWLBinLocationsApi);
      }

      [HttpGet]
      [Route("gettwlbinlocations/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{binNum:maxLength(20)}")]
      public IEnumerable<Binmst> GetTWLBinLocations(string coNum, string whNum, string binNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLBinLocationsApi = new GetTWLBinLocationsApi()
         {
            coNum = coNum,
            whNum = whNum,
            binNum = binNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.binmstService.GetTWLBinLocations(getTWLBinLocationsApi);
      }

      [HttpGet]
      [Route("gettwlbinlocations/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Binmst> GetTWLBinLocations(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLBinLocationsApi = new GetTWLBinLocationsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.binmstService.GetTWLBinLocations(getTWLBinLocationsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.binmstService?.Dispose();
         base.Dispose(true);
      }
   }
}