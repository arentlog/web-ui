using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsempmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class EmpmstService : ServiceBase, IEmpmstService
   {
      private readonly EmpmstRepository empmstRepository;

      public EmpmstService(EmpmstRepository empmstRepository)
      {
         this.empmstRepository = empmstRepository;
      }

      public IEnumerable<Empmst> GetTWLEmployees(GetTWLEmployeesApi getTWLEmployeesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLEmployeesApi.coNum))
         {
            sb.AppendFormatWithEscape("empmst.co_num = '{0}'", getTWLEmployeesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLEmployeesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND empmst.wh_num = '{0}'", getTWLEmployeesApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLEmployeesApi.empNum))
            {
               sb.AppendFormatWithEscape(" AND empmst.emp_num = '{0}'", getTWLEmployeesApi.empNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLEmployeesApi.empName))
            {
               sb.AppendFormatWithEscape(" AND empmst.emp_name BEGINS '{0}'", getTWLEmployeesApi.empName);
            }
         }
         var where = sb.ToString();
         return this.empmstRepository.GetList(where, getTWLEmployeesApi.batchsize, getTWLEmployeesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.empmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}