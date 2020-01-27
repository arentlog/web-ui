using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsshfmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/shfmst")]
   public class ShfmstController : ApiControllerBase
   {
      private readonly IShfmstService shfmstService;

      public ShfmstController(IShfmstService shfmstService)
      {
         this.shfmstService = shfmstService;
      }

      [HttpPost]
      [Route("gettwlshifts")]
      public IEnumerable<Shfmst> GetTWLShifts(GetTWLShiftsApi getTWLShiftsApi)
      {
         return this.shfmstService.GetTWLShifts(getTWLShiftsApi);
      }

      [HttpGet]
      [Route("gettwlshifts/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{shfNum:int}")]
      public IEnumerable<Shfmst> GetTWLShifts(string coNum, string whNum, int shfNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLShiftsApi = new GetTWLShiftsApi()
         {
            coNum = coNum,
            whNum = whNum,
            shfNum = shfNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.shfmstService.GetTWLShifts(getTWLShiftsApi);
      }

      [HttpGet]
      [Route("gettwlshifts/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Shfmst> GetTWLShifts(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLShiftsApi = new GetTWLShiftsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.shfmstService.GetTWLShifts(getTWLShiftsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.shfmstService?.Dispose();
         base.Dispose(true);
      }
   }
}