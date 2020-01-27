using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasc;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SascService : ServiceBase, ISascService
   {
      private readonly SascRepository sascRepository;

      public SascService(SascRepository sascRepository)
      {
         this.sascRepository = sascRepository;
      }

      public IEnumerable<Sasc> GetCompanyLookup(GetCompanyLookupRequestApi getGetCompanyLookupRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"sasc.cono >= {getGetCompanyLookupRequestApi.cono}");

         if (!string.IsNullOrEmpty(getGetCompanyLookupRequestApi.conm))
         {
            where.AppendFormatWithEscape(" AND sasc.conm BEGINS '{0}'", getGetCompanyLookupRequestApi.conm);
         }

         return this.sascRepository.GetList(
            where.ToString(),
            getGetCompanyLookupRequestApi.batchsize,
            getGetCompanyLookupRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sascRepository?.Dispose();
         base.Dispose(true);
      }
   }
}