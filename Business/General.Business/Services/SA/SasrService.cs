using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasr;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SasrService : ServiceBase, ISasrService
   {
      private readonly SasrRepository sasrRepository;

      public SasrService(SasrRepository sasrRepository)
      {
         this.sasrRepository = sasrRepository;
      }

      public IEnumerable<Sasr> GetSasrDetails(GetSasrDetailsRequestApi getGetSasrDetailsRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"sasr.cono = {this.sasrRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSasrDetailsRequestApi.whse))
         {
            where.AppendFormatWithEscape(" AND sasr.whse = '{0}'", getGetSasrDetailsRequestApi.whse);
         } else
         {
            where.AppendFormat(" AND sasr.whse = ''");
         }

         if (!string.IsNullOrEmpty(getGetSasrDetailsRequestApi.shipvia))
         {
            where.AppendFormatWithEscape(" AND sasr.shipvia = '{0}'", getGetSasrDetailsRequestApi.shipvia);
         }

         if (!string.IsNullOrEmpty(getGetSasrDetailsRequestApi.zone))
         {
            where.AppendFormatWithEscape(" AND sasr.zone = '{0}'", getGetSasrDetailsRequestApi.zone);
         }

         return this.sasrRepository.GetList(
            where.ToString(),
            getGetSasrDetailsRequestApi.batchsize,
            getGetSasrDetailsRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasrRepository?.Dispose();
         base.Dispose(true);
      }
   }
}