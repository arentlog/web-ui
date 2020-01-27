using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssassp;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SasspService : ServiceBase, ISasspService
   {
      private readonly SasspRepository sasspRepository;

      public SasspService(SasspRepository sasspRepository)
      {
         this.sasspRepository = sasspRepository;
      }

      public IEnumerable<Sassp> GetSasspListByAreaCode(
         GetSasspListByAreaCodeRequestApi getSasspListByAreaCodeRequestApi)
      {
         var sb = new StringBuilder();
         if (getSasspListByAreaCodeRequestApi.areacd != null)
         {
            sb.AppendFormatWithEscape("sassp.areacd = '{0}'", getSasspListByAreaCodeRequestApi.areacd);
         }
         var where = sb.ToString();
         return this.sasspRepository.GetList(where, getSasspListByAreaCodeRequestApi.batchsize, getSasspListByAreaCodeRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasspRepository?.Dispose();
         base.Dispose(true);
      }
   }
}