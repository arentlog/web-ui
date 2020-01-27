using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsp;
using Infor.Sxe.SL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SL
{
   public class SlspService : ServiceBase, ISlspService
   {
      private readonly SlspRepository slspRepository;

      public SlspService(SlspRepository slspRepository)
      {
         this.slspRepository = slspRepository;
      }

      public IEnumerable<Slsp> GetSlspListByKeys(GetSlspListByKeysRequestApi getGetSlspListByKeysRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"slsp.cono = {this.slspRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSlspListByKeysRequestApi.imptype))
         {
            where.AppendFormatWithEscape(" AND slsp.imptype = '{0}'", getGetSlspListByKeysRequestApi.imptype);
         }

         if (!string.IsNullOrEmpty(getGetSlspListByKeysRequestApi.slgroup))
         {
            where.AppendFormatWithEscape(" AND slsp.slgroup = '{0}'", getGetSlspListByKeysRequestApi.slgroup);
         }

         if (!string.IsNullOrEmpty(getGetSlspListByKeysRequestApi.whse))
         {
            where.AppendFormatWithEscape(" AND slsp.whse = '{0}'", getGetSlspListByKeysRequestApi.whse);
         }

         return this.slspRepository.GetList(
            where.ToString(),
            getGetSlspListByKeysRequestApi.batchsize,
            getGetSlspListByKeysRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slspRepository?.Dispose();
         base.Dispose(true);
      }
   }
}