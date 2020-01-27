using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.AR;
using General.Business.Models.AR;
using Infor.Sxe.AR.Data.Models.Pdsarbcb;
using Infor.Sxe.AR.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.AR
{
   public class ArbcbService : ServiceBase, IArbcbService
   {
      private readonly ArbcbRepository arbcbRepository;

      public ArbcbService(ArbcbRepository arbcbRepository)
      {
         this.arbcbRepository = arbcbRepository;
      }

      public IEnumerable<Arbcb> GetArbcbList(GetArbcbListRequestApi getArbcbListRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"arbcb.cono = {this.arbcbRepository.Cono}");

         if (!string.IsNullOrEmpty(getArbcbListRequestApi.batch))
         {
            where.AppendFormatWithEscape(" and arbcb.batch begins '{0}'", getArbcbListRequestApi.batch);
         }
         if (!string.IsNullOrEmpty(getArbcbListRequestApi.operinit))
         {
            where.AppendFormatWithEscape(" AND arbcb.operinit = '{0}'", getArbcbListRequestApi.operinit);
         }
         return this.arbcbRepository.GetList(
            where.ToString(),
            getArbcbListRequestApi.batchsize,
            getArbcbListRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.arbcbRepository?.Dispose();
         base.Dispose(true);
      }
   }
}
