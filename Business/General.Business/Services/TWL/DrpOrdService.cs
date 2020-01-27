using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpOrd;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class DrpOrdService : ServiceBase, IDrpOrdService
   {
      private readonly DrpOrdRepository drpordRepository;

      public DrpOrdService(DrpOrdRepository drpordRepository)
      {
         this.drpordRepository = drpordRepository;
      }

      public IEnumerable<DrpOrd> GetTWLAutoDropOrders(GetTWLAutoDropOrdersApi getTWLAutoDropOrdersApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLAutoDropOrdersApi.coNum))
         {
            sb.AppendFormatWithEscape("drp_ord.co_num = '{0}'", getTWLAutoDropOrdersApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropOrdersApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND drp_ord.wh_num = '{0}'", getTWLAutoDropOrdersApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropOrdersApi.ruleCode))
            {
               sb.AppendFormatWithEscape(" AND drp_ord.rule_code = '{0}'", getTWLAutoDropOrdersApi.ruleCode);
            }
         }
         var where = sb.ToString();
         return this.drpordRepository.GetList(where, getTWLAutoDropOrdersApi.batchsize, getTWLAutoDropOrdersApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.drpordRepository?.Dispose();
         base.Dispose(true);
      }
   }
}