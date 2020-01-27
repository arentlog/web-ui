using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdseodSetup;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class EodSetupService : ServiceBase, IEodSetupService
   {
      private readonly EodSetupRepository eodSetupRepository;

      public EodSetupService(EodSetupRepository eodSetupRepository)
      {
         this.eodSetupRepository = eodSetupRepository;
      }

      public IEnumerable<EodSetup> GetTWLEodSetups(GetTWLEodSetupsApi getTWLEodSetupsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLEodSetupsApi.coNum))
         {
            sb.AppendFormatWithEscape("eod_setup.co_num = '{0}'", getTWLEodSetupsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLEodSetupsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND eod_setup.wh_num = '{0}'", getTWLEodSetupsApi.whNum);
            }
         }
         var where = sb.ToString();
         return this.eodSetupRepository.GetList(where, getTWLEodSetupsApi.batchsize, getTWLEodSetupsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.eodSetupRepository?.Dispose();
         base.Dispose(true);
      }
   }
}