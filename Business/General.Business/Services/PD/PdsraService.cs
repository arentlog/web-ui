using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdsra;
using Infor.Sxe.PD.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PD
{
   public class PdsraService : ServiceBase, IPdsraService
   {
      private readonly PdsraRepository pdsraRepository;

      public PdsraService(PdsraRepository pdsraRepository)
      {
         this.pdsraRepository = pdsraRepository;
      }

      public IEnumerable<Pdsra> GetPdsraListByRebateDetails(
         GetPdsraListByRebateRequestApi getPdsraListByRebateRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("pdsra.cono = {0}", this.pdsraRepository.Cono);
         if (getPdsraListByRebateRequestApi.methodno != 0)
         {
            where.AppendFormat(" AND pdsra.methodno = {0}", getPdsraListByRebateRequestApi.methodno);
         }
         if (getPdsraListByRebateRequestApi.vendno != 0)
         {
            where.AppendFormatWithEscape(" AND pdsra.vendno = {0}", getPdsraListByRebateRequestApi.vendno);
         }
         if (getPdsraListByRebateRequestApi.startdt != null)
         {
            where.AppendFormatWithEscape(" AND pdsra.startdt = '{0}'", getPdsraListByRebateRequestApi.startdt);
         }
         return this.pdsraRepository.GetList(
            where.ToString(),
            getPdsraListByRebateRequestApi.batchsize,
            getPdsraListByRebateRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (this.pdsraRepository != null)
         {
            this.pdsraRepository.Dispose();
         }
         base.Dispose(true);
      }
   }
}
