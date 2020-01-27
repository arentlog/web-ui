using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsprodcat;
using ServiceInterfaceClient.BaseClasses;
using System.Collections.Generic;
using System.Web.Http;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/prodcat")]
   public class ProdcatController : ApiControllerBase
   {
      private readonly IProdcatService prodcatService;

      public ProdcatController(IProdcatService prodcatService)
      {
         this.prodcatService = prodcatService;
      }

      [HttpPost]
      [Route("gettwlprodcats")]
      public IEnumerable<Prodcat> GetTWLProdcats(GetTWLProdcatsApi getTWLProdcatsApi)
      {
         return this.prodcatService.GetTWLProdcats(getTWLProdcatsApi);
      }

      [HttpPost]
      [Route("gettwlprodcatlist")]
      public IEnumerable<Prodcat> GetTWLProdcatList(GetTWLProdcatListApi getTWLProdcatListApi)
      {
         return this.prodcatService.GetTWLProdcatList(getTWLProdcatListApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.prodcatService?.Dispose();
         base.Dispose(true);
      }
   }
}