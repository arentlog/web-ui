using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsinvAdj;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/invadj")]
   public class InvAdjController : ApiControllerBase
   {
      private readonly IInvAdjService invAdjService;

      public InvAdjController(IInvAdjService invAdjService)
      {
         this.invAdjService = invAdjService;
      }

      [HttpPost]
      [Route("gettwlinvadjustments")]
      public IEnumerable<InvAdj> GetTWLInvAdjustments(GetTWLInvAdjustmentsApi getTWLInvAdjustementsApi)
      {
         return this.invAdjService.GetTWLInvAdjustments(getTWLInvAdjustementsApi);
      }

      [HttpGet]
      [Route("gettwlinvadjustments/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{adjCode:maxLength(14)}/{tranTypes:maxLength(60)}")]
      public IEnumerable<InvAdj> GetTWLInvAdjustments(string coNum, string whNum, string adjCode, string tranTypes, int batchsize = 0, string fldlist = "")
      {
         var getTWLInvAdjustmentsApi = new GetTWLInvAdjustmentsApi()
         {
            coNum = coNum,
            whNum = whNum,
            adjCode = adjCode,
            tranTypes = tranTypes,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.invAdjService.GetTWLInvAdjustments(getTWLInvAdjustmentsApi);
      }

      [HttpGet]
      [Route("gettwlinvadjustments/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{adjCode:maxLength(14)}")]
      public IEnumerable<InvAdj> GetTWLInvAdjustments(string coNum, string whNum, string adjCode, int batchsize = 0, string fldlist = "")
      {
         var getTWLInvAdjustmentsApi = new GetTWLInvAdjustmentsApi()
         {
            coNum = coNum,
            whNum = whNum,
            adjCode = adjCode,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.invAdjService.GetTWLInvAdjustments(getTWLInvAdjustmentsApi);
      }

      [HttpGet]
      [Route("gettwlinvadjustments/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<InvAdj> GetTWLInvAdjustments(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLInvAdjustmentsApi = new GetTWLInvAdjustmentsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.invAdjService.GetTWLInvAdjustments(getTWLInvAdjustmentsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.invAdjService?.Dispose();
         base.Dispose(true);
      }
   }
}