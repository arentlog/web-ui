using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsreturnCategory;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ReturnCategoryService : ServiceBase, IReturnCategoryService
   {
      private readonly ReturnCategoryRepository returnCategoryRepository;

      public ReturnCategoryService(ReturnCategoryRepository returnCategoryRepository)
      {
         this.returnCategoryRepository = returnCategoryRepository;
      }

      public IEnumerable<ReturnCategory> GetTWLReturnCategories(GetTWLReturnCategoriesApi getTWLReturnCategoriesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLReturnCategoriesApi.coNum))
         {
            sb.AppendFormatWithEscape("return_category.co_num = '{0}'", getTWLReturnCategoriesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLReturnCategoriesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND return_category.wh_num = '{0}'", getTWLReturnCategoriesApi.whNum);
            }

            if (!string.IsNullOrWhiteSpace(getTWLReturnCategoriesApi.rtnCategory))
            {
               sb.AppendFormatWithEscape(" AND return_category.rtn_category = '{0}'", getTWLReturnCategoriesApi.rtnCategory);
            }
         }
         var where = sb.ToString();
         return this.returnCategoryRepository.GetList(where, getTWLReturnCategoriesApi.batchsize, getTWLReturnCategoriesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.returnCategoryRepository?.Dispose();
         base.Dispose(true);
      }
   }
}