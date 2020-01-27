using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsprodcat;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using System.Collections.Generic;
using System.Text;

namespace General.Business.Services.TWL
{
   public class ProdcatService : ServiceBase, IProdcatService
   {
      private readonly ProdcatRepository prodcatRepository;

      public ProdcatService(ProdcatRepository prodcatRepository)
      {
         this.prodcatRepository = prodcatRepository;
      }

      public IEnumerable<Prodcat> GetTWLProdcats(GetTWLProdcatsApi getTWLProdcatsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLProdcatsApi.coNum))
         {
            sb.AppendFormatWithEscape("prodcat.co_num = '{0}'", getTWLProdcatsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLProdcatsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND prodcat.wh_num = '{0}'", getTWLProdcatsApi.whNum);
               if (!string.IsNullOrWhiteSpace(getTWLProdcatsApi.prodcat))
               {
                  sb.AppendFormatWithEscape(" AND prodcat.prodcat = '{0}'", getTWLProdcatsApi.prodcat);
               }
            }
         }
         var where = sb.ToString();
         return this.prodcatRepository.GetList(where, getTWLProdcatsApi.batchsize, getTWLProdcatsApi.fldlist);
      }

      public IEnumerable<Prodcat> GetTWLProdcatList(GetTWLProdcatListApi getTWLProdcatListApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLProdcatListApi.coNum))
         {
            sb.AppendFormatWithEscape("prodcat.co_num = '{0}'", getTWLProdcatListApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLProdcatListApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND prodcat.wh_num = '{0}'", getTWLProdcatListApi.whNum);
               if (!string.IsNullOrWhiteSpace(getTWLProdcatListApi.prodcat))
               {
                  sb.AppendFormatWithEscape(" AND prodcat.prodcat BEGINS '{0}'", getTWLProdcatListApi.prodcat);
               }
            }
         }
         var where = sb.ToString();
         return this.prodcatRepository.GetList(where, getTWLProdcatListApi.batchsize, getTWLProdcatListApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.prodcatRepository?.Dispose();
         base.Dispose(true);
      }
   }
}