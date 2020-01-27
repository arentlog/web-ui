using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsinvAdj;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class InvAdjService : ServiceBase, IInvAdjService
   {
      private readonly InvAdjRepository invAdjRepository;

      public InvAdjService(InvAdjRepository invAdjRepository)
      {
         this.invAdjRepository = invAdjRepository;
      }

      public IEnumerable<InvAdj> GetTWLInvAdjustments(GetTWLInvAdjustmentsApi getTWLInvAdjustmentsApi)
      {
         var sb = new StringBuilder();

         if (!string.IsNullOrWhiteSpace(getTWLInvAdjustmentsApi.coNum))
         {
            sb.AppendFormatWithEscape("inv_adj.co_num = '{0}'", getTWLInvAdjustmentsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLInvAdjustmentsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND inv_adj.wh_num = '{0}'", getTWLInvAdjustmentsApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLInvAdjustmentsApi.adjCode))
            {
               sb.AppendFormatWithEscape(" AND inv_adj.adj_code = '{0}'", getTWLInvAdjustmentsApi.adjCode);
            }
            if (!string.IsNullOrWhiteSpace(getTWLInvAdjustmentsApi.tranTypes))
            {
               sb.AppendFormatWithEscape(" AND inv_adj.tran_types = '{0}'", getTWLInvAdjustmentsApi.tranTypes);
            }
         }
         var where = sb.ToString();
         return this.invAdjRepository.GetList(where, getTWLInvAdjustmentsApi.batchsize, getTWLInvAdjustmentsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.invAdjRepository?.Dispose();
         base.Dispose(true);
      }
   }
}