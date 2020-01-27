using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssapb;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SapbService : ServiceBase, ISapbService
   {
      private readonly SapbRepository sapbRepository;

      public SapbService(SapbRepository sapbRepository)
      {
         this.sapbRepository = sapbRepository;
      }

      public IEnumerable<Sapb> GetSapbByConoReportFunctionAltReport(GetSapbByConoReportFunctionAltReportRequestApi getSapbByConoReportFunctionAltReportRequestApi)
      {
         var where = new StringBuilder();

         if (getSapbByConoReportFunctionAltReportRequestApi.cono > 0)
         {
            where.Append($"sapb.cono = {getSapbByConoReportFunctionAltReportRequestApi.cono}");
         }

         if (!string.IsNullOrWhiteSpace(getSapbByConoReportFunctionAltReportRequestApi.currproc))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("(sapb.currproc = '{0}'", getSapbByConoReportFunctionAltReportRequestApi.currproc);
            if (!string.IsNullOrWhiteSpace(getSapbByConoReportFunctionAltReportRequestApi.altproc))
            {
               where.AppendFormatWithEscape(" OR sapb.currproc = '{0}'", getSapbByConoReportFunctionAltReportRequestApi.altproc);
            }
            where.Append(")");
         }
         return this.sapbRepository.GetList(where.ToString(), getSapbByConoReportFunctionAltReportRequestApi.batchsize, getSapbByConoReportFunctionAltReportRequestApi.fldlist);
      }

      public IEnumerable<Sapb> GetSapbByReportFunction(GetSapbByReportFunctionRequestApi getSapbByReportFunctionRequestApi)
      {
         var where = new StringBuilder();

         // Need to allow company 0 so don't default in current company
         if (getSapbByReportFunctionRequestApi.cono > 0)
         {
            where.Append($"sapb.cono = {getSapbByReportFunctionRequestApi.cono}");
         }

         if (!string.IsNullOrWhiteSpace(getSapbByReportFunctionRequestApi.currproc))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("sapb.currproc = '{0}'", getSapbByReportFunctionRequestApi.currproc);
         }
         if (!string.IsNullOrWhiteSpace(getSapbByReportFunctionRequestApi.reportnm))
         {
            if (where.ToString().Length > 0)
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("sapb.reportnm BEGINS '{0}'", getSapbByReportFunctionRequestApi.reportnm);
         }
         return this.sapbRepository.GetList(where.ToString(), getSapbByReportFunctionRequestApi.batchsize, getSapbByReportFunctionRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sapbRepository?.Dispose();
         base.Dispose(true);
      }
   }
}