using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsshfmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ShfmstService : ServiceBase, IShfmstService
   {
      private readonly ShfmstRepository shfmstRepository;

      public ShfmstService(ShfmstRepository shfmstRepository)
      {
         this.shfmstRepository = shfmstRepository;
      }

      public IEnumerable<Shfmst> GetTWLShifts(GetTWLShiftsApi getTWLShiftsApi)
        {
            var sb = new StringBuilder();
            if (!string.IsNullOrWhiteSpace(getTWLShiftsApi.coNum))
            {
                sb.AppendFormatWithEscape("shfmst.co_num = '{0}'", getTWLShiftsApi.coNum);
                if (!string.IsNullOrWhiteSpace(getTWLShiftsApi.whNum))
                {
                    sb.AppendFormatWithEscape(" AND shfmst.wh_num = '{0}'", getTWLShiftsApi.whNum);
                }
                if (getTWLShiftsApi.shfNum > 0)
                {
                    sb.AppendFormatWithEscape(" AND shfmst.shf_num = '{0}'", getTWLShiftsApi.shfNum);
                }
            }
            var where = sb.ToString();
            return this.shfmstRepository.GetList(where, getTWLShiftsApi.batchsize, getTWLShiftsApi.fldlist);
        }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.shfmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}