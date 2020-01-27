using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvAdminlog;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvAdminLogService : ServiceBase, IPvAdminLogService
   {
      private readonly PvAdminlogRepository pvAdminlogRepository;

      public PvAdminLogService(PvAdminlogRepository pvAdminlogRepository)
      {
         this.pvAdminlogRepository = pvAdminlogRepository;
      }

      public IEnumerable<PvAdminlog> ListBySubject(ListBySubjectRequestApi criteria)
      {
         var sb = new StringBuilder();
         sb.Append($"pv_adminlog.cono = {this.pvAdminlogRepository.Cono}");
         if (criteria.subject != null)
         {
            sb.AppendFormatWithEscape(" AND pv_adminlog.subject = '{0}'", criteria.subject);
         }

         var where = sb.ToString();
         return this.pvAdminlogRepository.GetList(where, criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvAdminlogRepository?.Dispose();
         base.Dispose(true);
      }
   }
}