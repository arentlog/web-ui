using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsshpmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ShpmstService : ServiceBase, IShpmstService
   {
      private readonly ShpmstRepository shpmstRepository;

      public ShpmstService(ShpmstRepository shpmstRepository)
      {
         this.shpmstRepository = shpmstRepository;
      }

      public IEnumerable<Shpmst> GetTWLShpmst(GetTWLShpmstApi getTWLShpmstApi)
        {
            var sb = new StringBuilder();
            if (!string.IsNullOrWhiteSpace(getTWLShpmstApi.coNum))
            {
                sb.AppendFormatWithEscape("shpmst.co_num = '{0}'", getTWLShpmstApi.coNum);
                if (!string.IsNullOrWhiteSpace(getTWLShpmstApi.whNum))
                {
                    sb.AppendFormatWithEscape(" AND shpmst.wh_num = '{0}'", getTWLShpmstApi.whNum);
                }
                if (!string.IsNullOrWhiteSpace(getTWLShpmstApi.carrierId))
                {
                    sb.AppendFormatWithEscape(" AND shpmst.carrier_id = '{0}'", getTWLShpmstApi.carrierId);
                }
                if (getTWLShpmstApi.manifestId > 0)
                {
                    sb.AppendFormatWithEscape(" AND shpmst.manifest_id = '{0}'", getTWLShpmstApi.manifestId);
                }
            }
            var where = sb.ToString();
            return this.shpmstRepository.GetList(where, getTWLShpmstApi.batchsize, getTWLShpmstApi.fldlist);
        }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.shpmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}