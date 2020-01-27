using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.OE;
using General.Business.Models.OE;
using Infor.Sxe.OE.Data.Models.Pdsoedc;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.OE
{
   [RoutePrefix("api/oe/oedc")]
   public class OedcController : ApiControllerBase
   {
      private readonly IOedcService oedcService;

      public OedcController(IOedcService oedcService)
      {
         this.oedcService = oedcService;
      }

      [HttpPost]
      [Route("getoedclistallbyconoandkey")]
      public IEnumerable<Oedc> GetOedcListAllByConoAndKey(GetOedcListAllByConoAndKeyRequestApi getOedcListAllByConoAndKeyRequestApi)
      {
         return this.oedcService.GetOedcListAllByConoAndKey(getOedcListAllByConoAndKeyRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.oedcService?.Dispose();
         base.Dispose(true);
      }
   }
}