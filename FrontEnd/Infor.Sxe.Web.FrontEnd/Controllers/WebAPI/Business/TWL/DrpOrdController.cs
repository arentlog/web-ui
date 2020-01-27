using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpOrd;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/drpord")]
   public class DrpOrdController : ApiControllerBase
   {
      private readonly IDrpOrdService drpLogService;

      public DrpOrdController(IDrpOrdService drpLogService)
      {
         this.drpLogService = drpLogService;
      }

      [HttpPost]
      [Route("gettwlautodroporders")]
      public IEnumerable<DrpOrd> GetTWLAutoDropOrders(GetTWLAutoDropOrdersApi getTWLAutoDropOrdersApi)
      {
         return this.drpLogService.GetTWLAutoDropOrders(getTWLAutoDropOrdersApi);
      }

      [HttpGet]
      [Route("gettwlautodroporders/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{ruleCode:maxLength(18)}")]
      public IEnumerable<DrpOrd> GetTWLDrpOrdInterfaces(string coNum, string whNum, string ruleCode, int batchsize = 0, string fldlist = "")
      {
         var getTWLAutoDropOrdersApi = new GetTWLAutoDropOrdersApi()
         {
            coNum = coNum,
            whNum = whNum,
            ruleCode = ruleCode,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.drpLogService.GetTWLAutoDropOrders(getTWLAutoDropOrdersApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.drpLogService?.Dispose();
         base.Dispose(true);
      }
   }
}