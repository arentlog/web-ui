using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/saea")]
   public class SaeaController : ApiControllerBase
   {
      private readonly ISaeaService saeaService;

      public SaeaController(ISaeaService saeaService)
      {
         this.saeaService = saeaService;
      }

      [HttpPost]
      [Route("getnamedescbykeys")]
      public string GetNameDescByKeys(SaeaGetListNameDescRequestApi request)
      {
         return this.saeaService.SAEAGetListNameDesc(request);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.saeaService?.Dispose();
         base.Dispose(true);
      }
   }
}