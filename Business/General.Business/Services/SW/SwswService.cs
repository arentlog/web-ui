using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SW;
using General.Business.Models.SW;
using Infor.Sxe.SW.Data.Models.Pdsswsw;
using Infor.Sxe.SW.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SW
{
   public class SwswService : ServiceBase, ISwswService
   {
      private readonly SwswRepository swswRepository;

      public SwswService(SwswRepository swswRepository)
      {
         this.swswRepository = swswRepository;
      }

      public IEnumerable<Swsw> ListSwswByClaimType(ListSwswByClaimTypeRequestApi criteria)
      {
         var where = new StringBuilder();
         where.AppendFormatWithEscape("swsw.cono = {0}", this.swswRepository.Cono);
         if (!string.IsNullOrWhiteSpace(criteria.claimtype))
         {
            where.AppendFormatWithEscape(" AND swsw.claimtype begins '{0}'", criteria.claimtype);
         }

         return this.swswRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.swswRepository?.Dispose();
         base.Dispose(true);
      }
   }
}