using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswhmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class WhmstService : ServiceBase, IWhmstService
   {
      private readonly WhmstRepository whmstRepository;

      public WhmstService(WhmstRepository whmstRepository)
      {
         this.whmstRepository = whmstRepository;
      }

      public IEnumerable<Whmst> GetTWLWarehouses(GetTWLWarehousesApi getTWLWarehousesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLWarehousesApi.coNum))
         {
            sb.AppendFormatWithEscape("whmst.co_num = '{0}'", getTWLWarehousesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLWarehousesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND whmst.wh_num = '{0}'", getTWLWarehousesApi.whNum);
            }
         }
         var where = sb.ToString();
         return this.whmstRepository.GetList(where, getTWLWarehousesApi.batchsize, getTWLWarehousesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.whmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}