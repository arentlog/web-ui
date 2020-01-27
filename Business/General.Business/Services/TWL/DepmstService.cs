using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsdepmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class DepmstService : ServiceBase, IDepmstService
   {
      private readonly DepmstRepository depmstRepository;

      public DepmstService(DepmstRepository depmstRepository)
      {
         this.depmstRepository = depmstRepository;
      }

      public IEnumerable<Depmst> GetTWLDepartments(GetTWLDepartmentsApi getTWLDepartmentsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLDepartmentsApi.coNum))
         {
            sb.AppendFormatWithEscape("depmst.co_num = '{0}'", getTWLDepartmentsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLDepartmentsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND depmst.wh_num = '{0}'", getTWLDepartmentsApi.whNum);
            }
            if (getTWLDepartmentsApi.deptNum > 0)
            {
               sb.AppendFormatWithEscape(" AND depmst.dept_num = '{0}'", getTWLDepartmentsApi.deptNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLDepartmentsApi.deptType))
            {
               sb.AppendFormatWithEscape(" AND depmst.dept_type = '{0}'", getTWLDepartmentsApi.deptType);
            }
         }
         var where = sb.ToString();
         return this.depmstRepository.GetList(where, getTWLDepartmentsApi.batchsize, getTWLDepartmentsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.depmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}