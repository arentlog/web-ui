using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpLog;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class DrpLogService : ServiceBase, IDrpLogService
   {
      private readonly DrpLogRepository drplogRepository;

      public DrpLogService(DrpLogRepository drplogRepository)
      {
         this.drplogRepository = drplogRepository;
      }

      public IEnumerable<DrpLog> GetTWLAutoDropLogs(GetTWLAutoDropLogsApi getTWLAutoDropLogsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLAutoDropLogsApi.coNum))
         {
            sb.AppendFormatWithEscape("drp_log.co_num = '{0}'", getTWLAutoDropLogsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropLogsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND drp_log.wh_num = '{0}'", getTWLAutoDropLogsApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropLogsApi.ruleCode))
            {
               sb.AppendFormatWithEscape(" AND drp_log.rule_code = '{0}'", getTWLAutoDropLogsApi.ruleCode);
            }
         }
         var where = sb.ToString();
         return this.drplogRepository.GetList(where, getTWLAutoDropLogsApi.batchsize, getTWLAutoDropLogsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.drplogRepository?.Dispose();
         base.Dispose(true);
      }
   }
}