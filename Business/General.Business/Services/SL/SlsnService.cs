using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsn;
using Infor.Sxe.SL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SL
{
   public class SlsnService : ServiceBase, ISlsnService
   {
      private readonly SlsnRepository slsnRepository;

      public SlsnService(SlsnRepository slsnRepository)
      {
         this.slsnRepository = slsnRepository;
      }

      public IEnumerable<Slsn> GetSlsnListByKeys(GetSlsnListByKeysRequestApi getGetSlsnListByKeysRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"slsn.cono = {this.slsnRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSlsnListByKeysRequestApi.imptype))
         {
            where.AppendFormatWithEscape(" AND slsn.imptype = '{0}'", getGetSlsnListByKeysRequestApi.imptype);
         }

         if (!string.IsNullOrEmpty(getGetSlsnListByKeysRequestApi.vendcd))
         {
            where.AppendFormatWithEscape(" AND slsn.vendcd = '{0}'", getGetSlsnListByKeysRequestApi.vendcd);
         }

         if (!string.IsNullOrEmpty(getGetSlsnListByKeysRequestApi.linecd))
         {
            where.AppendFormatWithEscape(" AND slsn.linecd = '{0}'", getGetSlsnListByKeysRequestApi.linecd);
         }

         return this.slsnRepository.GetList(
            where.ToString(),
            getGetSlsnListByKeysRequestApi.batchsize,
            getGetSlsnListByKeysRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slsnRepository?.Dispose();
         base.Dispose(true);
      }
   }
}