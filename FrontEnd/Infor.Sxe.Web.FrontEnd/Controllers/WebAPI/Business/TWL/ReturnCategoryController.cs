using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsreturnCategory;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/returncategory")]
   public class ReturnCategoryController : ApiControllerBase
   {
      private readonly IReturnCategoryService returnCategoryService;

      public ReturnCategoryController(IReturnCategoryService returnCategoryService)
      {
         this.returnCategoryService = returnCategoryService;
      }

      [HttpPost]
      [Route("gettwlreturncategories")]
      public IEnumerable<ReturnCategory> GetTWLReturnCategories(GetTWLReturnCategoriesApi getTWLReturnCategoriesApi)
      {
         return this.returnCategoryService.GetTWLReturnCategories(getTWLReturnCategoriesApi);
      }

      [HttpGet]
      [Route("gettwlreturncategories/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{rtnCategory:maxLength(14)}")]
      public IEnumerable<ReturnCategory> GetTWLReturnCategories(string coNum, string whNum, string rtnCategory, int batchsize = 0, string fldlist = "")
      {
         var getTWLReturnCategoriesApi = new GetTWLReturnCategoriesApi()
         {
            coNum = coNum,
            whNum = whNum,
            rtnCategory = rtnCategory,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.returnCategoryService.GetTWLReturnCategories(getTWLReturnCategoriesApi);
      }

      [HttpGet]
      [Route("gettwlreturncategories/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<ReturnCategory> GetTWLReturnCategories(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLReturnCategoriesApi = new GetTWLReturnCategoriesApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.returnCategoryService.GetTWLReturnCategories(getTWLReturnCategoriesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.returnCategoryService?.Dispose();
         base.Dispose(true);
      }
   }
}