using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.PdstriggerSetup;
using Infor.Sxe.Shared.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.Shared
{
   public class TriggerSetupService : ServiceBase, ITriggerSetupService
   {
      private readonly TriggerSetupRepository triggerSetupRepository;

      public TriggerSetupService(TriggerSetupRepository triggerSetupRepository)
      {
         this.triggerSetupRepository = triggerSetupRepository;
      }

      public IEnumerable<TriggerSetup> GetTriggerSetupListByName(GetTriggerSetupListByNameApi criteria)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrWhiteSpace(criteria.triggerName))
         {
            where.AppendFormatWithEscape(" trigger_setup.triggername begins '{0}'", criteria.triggerName);
         }

         return this.triggerSetupRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.triggerSetupRepository?.Dispose();
         base.Dispose(true);
      }
   }
}