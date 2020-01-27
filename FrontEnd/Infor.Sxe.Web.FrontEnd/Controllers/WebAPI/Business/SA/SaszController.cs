using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasz;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sasz")]
   public class SaszController : ApiControllerBase
   {
      private readonly ISaszService saszService;

      public SaszController(ISaszService saszService)
      {
         this.saszService = saszService;
      }

      [HttpPost]
      [Route("getsaszlistallbyconowhseshipvia")]

      public IEnumerable<Sasz> GetSaszListAllByConoWhseShipVia(GetSaszListAllByConoWhseShipViaRequestApi GetSaszListAllByConoWhseShipViaRequestApi)
      {
         return this.saszService.GetSaszListAllByConoWhseShipVia(GetSaszListAllByConoWhseShipViaRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.saszService?.Dispose();
         base.Dispose(true);
      }
   }
}