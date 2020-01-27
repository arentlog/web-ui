using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSassm;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvSassmService : ServiceBase, IPvSassmService
   {
      private readonly PvSassmRepository pvSassmRepository;

      public PvSassmService(PvSassmRepository pvSassmRepository)
      {
         this.pvSassmRepository = pvSassmRepository;
      }

      public IEnumerable<PvSassm> GetPvSassmForAoSystem(GetPvSassmForAoSystemListRequestApi criteria)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrWhiteSpace(criteria.menuSet))
         {
            where.AppendFormatWithEscape("pv_sassm.menuSet = '{0}'", criteria.menuSet);
         }

         if (!string.IsNullOrWhiteSpace(criteria.functionName))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("pv_sassm.functionName begins '{0}'", criteria.functionName);
         }

         if (!string.IsNullOrWhiteSpace(criteria.trmgrlang))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("pv_sassm.trmgrlang = '{0}'", criteria.trmgrlang);
         }

         if (!string.IsNullOrWhiteSpace(criteria.recordtype))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("pv_sassm.recordtype = '{0}'", criteria.recordtype);
         }

         if (!string.IsNullOrWhiteSpace(criteria.windowTitle))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("pv_sassm.windowTitle begins '{0}'", criteria.windowTitle);
         }

         return this.pvSassmRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvSassmRepository?.Dispose();
         base.Dispose(true);
      }
   }
}