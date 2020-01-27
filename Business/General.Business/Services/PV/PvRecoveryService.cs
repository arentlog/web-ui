using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using Infor.Sxe.PV.Data.Models.PdspvRecovery;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvRecoveryService : ServiceBase, IPvRecoveryService
   {
      private readonly PvRecoveryRepository pvRecoveryRepository;

      public PvRecoveryService(PvRecoveryRepository pvRecoveryRepository)
      {
         this.pvRecoveryRepository = pvRecoveryRepository;
      }

      public IEnumerable<PvRecovery> GetPvRecoveryListByOperator(string oper2, int batchsize, string fldList)
      {
         var sb = new StringBuilder();
         sb.Append($"pv_recovery.cono = {this.pvRecoveryRepository.Cono}");
         if (oper2 != null)
         {
            sb.AppendFormatWithEscape(" AND pv_recovery.oper2 = '{0}'", oper2);
         }
         // We are only interested in recovery records created from web functions
         sb.AppendFormat(" AND pv_recovery.functionname matches '*-h5'");

         var where = sb.ToString();
         return this.pvRecoveryRepository.GetList(where, batchsize, fldList);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvRecoveryRepository?.Dispose();
         base.Dispose(true);
      }
   }
}