using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssassr;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SassrService : ServiceBase, ISassrService
   {
      private readonly SassrRepository sassrRepository;

      public SassrService(SassrRepository sassrRepository)
      {
         this.sassrRepository = sassrRepository;
      }

      public IEnumerable<Sassr> GetSassrByKeys(GetSassrByKeysRequestApi getGetSassrDetailsRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormatWithEscape("sassr.currproc = '{0}'", getGetSassrDetailsRequestApi.currproc);

         if (!string.IsNullOrEmpty(getGetSassrDetailsRequestApi.trmgrlang))
         {
            where.AppendFormatWithEscape(" AND sarsr.trmgrlang = '{0}'", getGetSassrDetailsRequestApi.trmgrlang);
         }

         return this.sassrRepository.GetList(
            where.ToString(),
            getGetSassrDetailsRequestApi.batchsize,
            getGetSassrDetailsRequestApi.fldlist);
      }

      public IEnumerable<Sassr> ListSassrsByKeys(ListSassrsByKeysRequestApi criteria)
      {
         var where = new StringBuilder();
         if (string.IsNullOrWhiteSpace(criteria.currproc))
         {
            criteria.currproc = "";
         }
         where.AppendFormatWithEscape("sassr.currproc begins '{0}'", criteria.currproc);

         if (!string.IsNullOrEmpty(criteria.trmgrlang))
         {
            where.AppendFormatWithEscape(" AND sarsr.trmgrlang = '{0}'", criteria.trmgrlang);
         }

         return this.sassrRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sassrRepository?.Dispose();
         base.Dispose(true);
      }
   }
}