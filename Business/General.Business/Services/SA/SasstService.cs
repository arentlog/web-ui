using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasst;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SasstService : ServiceBase, ISasstService
   {
      private readonly SasstRepository sasstRepository;

      public SasstService(SasstRepository sasstRepository)
      {
         this.sasstRepository = sasstRepository;
      }

      public IEnumerable<Sasst> GetSasstListByZipCodeQuery(GetSasstListByZipCodeQueryRequestApi getSasstListByZipCodeQueryRequestApi)
      {
         var sb = new StringBuilder();
         if (getSasstListByZipCodeQueryRequestApi.zipcd != null)
         {
            sb.AppendFormatWithEscape("sasst.zipcd begins '{0}'", getSasstListByZipCodeQueryRequestApi.zipcd);
         }
         var where = sb.ToString();
         return this.sasstRepository.GetList(where, getSasstListByZipCodeQueryRequestApi.batchsize, getSasstListByZipCodeQueryRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}
