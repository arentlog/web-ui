using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicseh;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.IC
{
   public class IcsehService : ServiceBase, IIcsehService
   {
      private readonly IcsehRepository icsehRepository;

      public IcsehService(IcsehRepository icsehRepository)
      {
         this.icsehRepository = icsehRepository;
      }

      public IEnumerable<Icseh> GetIcsehListAllByMSDSSheetNoAndLangcd(
         GetIcsehListAllByMSDSSheetNoAndLangcdRequestApi getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrEmpty(getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.msdssheetno))
         {
            where.AppendFormatWithEscape("icseh.msdssheetno begins '{0}'", getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.msdssheetno);
         }
         if (!string.IsNullOrEmpty(getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.langcd))
         {
            if (!string.IsNullOrEmpty(getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.msdssheetno))
            {
               where.AppendFormat(" AND ");
            }
            where.AppendFormatWithEscape("icseh.langcd begins '{0}'", getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.langcd);
         }

         return this.icsehRepository.GetList(
            where.ToString(),
            getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.batchsize,
            getGetIcsehListAllByMSDSSheetNoAndLangcdRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icsehRepository?.Dispose();
         base.Dispose(true);
      }
   }
}