using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpLog;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/drplog")]
   public class DrpLogController : ApiControllerBase
   {
      private readonly IDrpLogService drpLogService;

      public DrpLogController(IDrpLogService drpLogService)
      {
         this.drpLogService = drpLogService;
      }

      [HttpPost]
      [Route("gettwlautodroplogs")]
      public IEnumerable<DrpLog> GetTWLAutoDropLogs(GetTWLAutoDropLogsApi getTWLAutoDropLogsApi)
      {
         return this.drpLogService.GetTWLAutoDropLogs(getTWLAutoDropLogsApi);
      }

      [HttpGet]
      [Route("gettwlautodroplogs/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{ruleCode:maxLength(18)}")]
      public IEnumerable<DrpLog> GetTWLDrpLogInterfaces(string coNum, string whNum, string ruleCode, int batchsize = 0, string fldlist = "")
      {
         var getTWLAutoDropLogsApi = new GetTWLAutoDropLogsApi()
         {
            coNum = coNum,
            whNum = whNum,
            ruleCode = ruleCode,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.drpLogService.GetTWLAutoDropLogs(getTWLAutoDropLogsApi);
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