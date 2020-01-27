using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpRules;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class DrpRulesService : ServiceBase, IDrpRulesService
   {
      private readonly DrpRulesRepository drprulesRepository;

      public DrpRulesService(DrpRulesRepository drprulesRepository)
      {
         this.drprulesRepository = drprulesRepository;
      }

      public IEnumerable<DrpRules> GetTWLAutoDropRules(GetTWLAutoDropRulesApi getTWLAutoDropRulesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLAutoDropRulesApi.coNum))
         {
            sb.AppendFormatWithEscape("drp_rules.co_num = '{0}'", getTWLAutoDropRulesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropRulesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND drp_rules.wh_num = '{0}'", getTWLAutoDropRulesApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropRulesApi.ruleCode))
            {
               sb.AppendFormatWithEscape(" AND drp_rules.rule_code = '{0}'", getTWLAutoDropRulesApi.ruleCode);
            }
         }
         var where = sb.ToString();
         return this.drprulesRepository.GetList(where, getTWLAutoDropRulesApi.batchsize, getTWLAutoDropRulesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.drprulesRepository?.Dispose();
         base.Dispose(true);
      }
   }
}