using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasse;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SasseService : ServiceBase, ISasseService
   {
      private readonly SasseRepository sasseRepository;

      public SasseService(SasseRepository sasseRepository)
      {
         this.sasseRepository = sasseRepository;
      }

      public IEnumerable<Sasse> GetSasseListAllByErrorAndLang(GetSasseListAllByErrorAndLangRequestApi getSasseListAllByErrorAndLangRequestApi)
      {
         var sb = new StringBuilder();
         sb.Append($"sasse.errorno >= {getSasseListAllByErrorAndLangRequestApi.error}");
         if (getSasseListAllByErrorAndLangRequestApi.langcd != null)
         {
            sb.AppendFormatWithEscape(" AND sasse.trmgrlang = '{0}'", getSasseListAllByErrorAndLangRequestApi.langcd);
         }
         var where = sb.ToString();
         return this.sasseRepository.GetList(where, getSasseListAllByErrorAndLangRequestApi.batchsize, getSasseListAllByErrorAndLangRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasseRepository?.Dispose();
         base.Dispose(true);
      }
   }
}