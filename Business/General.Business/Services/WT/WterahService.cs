using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.WT;
using General.Business.Models.WT;
using Infor.Sxe.WT.Data.Models.Pdswterah;
using Infor.Sxe.WT.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.WT
{
   public class WterahService : ServiceBase, IWterahService
   {
      private readonly WterahRepository wterahRepository;

      public WterahService(WterahRepository wterahRepository)
      {
         this.wterahRepository = wterahRepository;
      }

      public IEnumerable<Wterah> GetWterahListByShipFmWhseShipToWhse(
         GetWterahListByShipFmWhseShipToWhseRequestApi getWterahListByShipFmWhseShipToWhseRequestApiRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"wterah.cono = {this.wterahRepository.Cono}");

         if (!string.IsNullOrEmpty(getWterahListByShipFmWhseShipToWhseRequestApiRequestApi.shipfmwhse))
         {
            where.AppendFormatWithEscape(" AND wterah.shipfmwhse = '{0}'", getWterahListByShipFmWhseShipToWhseRequestApiRequestApi.shipfmwhse);
         }
         if (!string.IsNullOrEmpty(getWterahListByShipFmWhseShipToWhseRequestApiRequestApi.shiptowhse))
         {
            where.AppendFormatWithEscape(" AND wterah.shiptowhse = '{0}'", getWterahListByShipFmWhseShipToWhseRequestApiRequestApi.shiptowhse);
         }

         return this.wterahRepository.GetList(
            where.ToString(),
            getWterahListByShipFmWhseShipToWhseRequestApiRequestApi.batchsize,
            getWterahListByShipFmWhseShipToWhseRequestApiRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.wterahRepository?.Dispose();
         base.Dispose(true);
      }
   }
}