using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasz;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SaszService : ServiceBase, ISaszService
   {
      private readonly SaszRepository saszRepository;

      public SaszService(SaszRepository saszRepository)
      {
         this.saszRepository = saszRepository;
      }

      public IEnumerable<Sasz> GetSaszListAllByConoWhseShipVia(GetSaszListAllByConoWhseShipViaRequestApi getGetSaszListAllByConoWhseShipViaRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"sasz.cono = {this.saszRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSaszListAllByConoWhseShipViaRequestApi.whse))
         {
            where.AppendFormatWithEscape(" AND sasz.whse = '{0}'", getGetSaszListAllByConoWhseShipViaRequestApi.whse);
         } else
         {
            where.AppendFormat(" AND sasz.whse = ''");
         }

         if (!string.IsNullOrEmpty(getGetSaszListAllByConoWhseShipViaRequestApi.shipVia))
         {
            where.AppendFormatWithEscape(" AND sasz.shipvia = '{0}'", getGetSaszListAllByConoWhseShipViaRequestApi.shipVia);
         }

         return this.saszRepository.GetList(
            where.ToString(),
            getGetSaszListAllByConoWhseShipViaRequestApi.batchsize,
            getGetSaszListAllByConoWhseShipViaRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.saszRepository?.Dispose();
         base.Dispose(true);
      }
   }
}