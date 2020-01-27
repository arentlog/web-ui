using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvShoplist;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvShoplistService : ServiceBase, IPvShoplistService
   {
      private readonly PvShoplistRepository pvShoplistRepository;

      public PvShoplistService(PvShoplistRepository pvShoplistRepository)
      {
         this.pvShoplistRepository = pvShoplistRepository;
      }

      public IEnumerable<PvShoplist> GetPvShoplistByOper(GetPvShoplistByOperRequestApi criteria)
      {
         var where = new StringBuilder();

         where.Append($"cono = {criteria.cono}");
         if (!string.IsNullOrEmpty(criteria.oper2))
         {
            where.AppendFormatWithEscape(" AND pv_shoplist.oper2 = '{0}'", criteria.oper2);
         }

         return this.pvShoplistRepository.GetList(where.ToString(), true, criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvShoplistRepository?.Dispose();
         base.Dispose(true);
      }
   }
}