using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PO;
using General.Business.Models.PO;
using Infor.Sxe.PO.Data.Models.Pdspoerah;
using Infor.Sxe.PO.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PO
{
   public class PoerahService : ServiceBase, IPoerahService
   {
      private readonly PoerahRepository poerahRepository;

      public PoerahService(PoerahRepository poerahRepository)
      {
         this.poerahRepository = poerahRepository;
      }

      public IEnumerable<Poerah> GetPoerahListByVendWhseProdLine(
         GetPoerahListByVendWhseProdLineRequestApi getPoerahListByVendWhseProdLineRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("poerah.cono = {0}", this.poerahRepository.Cono);
         where.AppendFormat(" and poerah.vendno = {0}", getPoerahListByVendWhseProdLineRequestApi.vendno);

         if (!string.IsNullOrEmpty(getPoerahListByVendWhseProdLineRequestApi.whse))
         {
            where.AppendFormatWithEscape(" AND poerah.whse = '{0}'", getPoerahListByVendWhseProdLineRequestApi.whse);
         }
         if (!string.IsNullOrEmpty(getPoerahListByVendWhseProdLineRequestApi.prodline))
         {
            where.AppendFormatWithEscape(" AND poerah.prodline = '{0}'", getPoerahListByVendWhseProdLineRequestApi.prodline);
         }

         return this.poerahRepository.GetList(
            where.ToString(),
            getPoerahListByVendWhseProdLineRequestApi.batchsize,
            getPoerahListByVendWhseProdLineRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (this.poerahRepository != null)
         {
            this.poerahRepository.Dispose();
         }
         base.Dispose(true);
      }
   }
}