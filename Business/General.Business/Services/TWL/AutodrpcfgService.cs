using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsautodrpcfg;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class AutodrpcfgService : ServiceBase, IAutodrpcfgService
   {
      private readonly AutodrpcfgRepository autodrpcfgRepository;

      public AutodrpcfgService(AutodrpcfgRepository autodrpcfgRepository)
      {
         this.autodrpcfgRepository = autodrpcfgRepository;
      }

      public IEnumerable<Autodrpcfg> GetTWLAutoDropConfigs(GetTWLAutoDropConfigsApi getTWLAutoDropConfigsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLAutoDropConfigsApi.coNum))
         {
            sb.AppendFormatWithEscape("autodrpcfg.co_num = '{0}'", getTWLAutoDropConfigsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLAutoDropConfigsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND autodrpcfg.wh_num = '{0}'", getTWLAutoDropConfigsApi.whNum);
            }
         }
         var where = sb.ToString();
         return this.autodrpcfgRepository.GetList(where, getTWLAutoDropConfigsApi.batchsize, getTWLAutoDropConfigsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.autodrpcfgRepository?.Dispose();
         base.Dispose(true);
      }
   }
}