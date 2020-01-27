using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsreturnReason;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/returnreason")]
   public class ReturnReasonController : ApiControllerBase
   {
      private readonly IReturnReasonService returnReasonService;

      public ReturnReasonController(IReturnReasonService returnReasonService)
      {
         this.returnReasonService = returnReasonService;
      }

      [HttpPost]
      [Route("gettwlreturnreasons")]
      public IEnumerable<ReturnReason> GetTWLReturnReasons(GetTWLReturnReasonsApi getTWLReturnReasonsApi)
      {
         return this.returnReasonService.GetTWLReturnReasons(getTWLReturnReasonsApi);
      }

      [HttpGet]
      [Route("gettwlreturnreasons/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{code:maxLength(14)}")]
      public IEnumerable<ReturnReason> GetTWLReturnReasons(string coNum, string whNum, string code, int batchsize = 0, string fldlist = "")
      {
         var getTWLReturnReasonsApi = new GetTWLReturnReasonsApi()
         {
            coNum = coNum,
            whNum = whNum,
            code = code,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.returnReasonService.GetTWLReturnReasons(getTWLReturnReasonsApi);
      }

      [HttpGet]
      [Route("gettwlreturnreasons/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<ReturnReason> GetTWLReturnReasons(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLReturnReasonsApi = new GetTWLReturnReasonsApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.returnReasonService.GetTWLReturnReasons(getTWLReturnReasonsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.returnReasonService?.Dispose();
         base.Dispose(true);
      }
   }
}