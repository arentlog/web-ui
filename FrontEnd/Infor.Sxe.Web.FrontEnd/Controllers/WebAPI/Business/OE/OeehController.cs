using System.Web.Http;
using General.Business.Interfaces.OE;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.OE
{
   [RoutePrefix("api/oe/oeeh")]
   public class OeehController : ApiControllerBase
   {
      private readonly IOeehService oeehService;

      public OeehController(IOeehService oeehService)
      {
         this.oeehService = oeehService;
      }

      [HttpGet]
      [Route("oeehexistsforcustnoordernumberminimumstage/{custno:decimal}/{orderno:int}/{ordersuf:int}/{stagecd:int}")]
      public bool OeehExistsForCustnoOrderNumberMinimumStage(
         decimal custno,
         int orderno,
         int ordersuf,
         int stagecd)
      {
         return this.oeehService.OeehExistsForCustnoOrderNumberMinimumStage(custno, orderno, ordersuf, stagecd);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.oeehService?.Dispose();
         base.Dispose(true);
      }
   }
}