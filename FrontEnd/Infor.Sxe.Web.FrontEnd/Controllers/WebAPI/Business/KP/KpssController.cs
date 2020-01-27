using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.KP;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpss;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.KP
{
   [RoutePrefix("api/kp/kpss")]
   public class KpssController : ApiControllerBase
   {
      private readonly IKpssService kpssService;

      public KpssController(IKpssService kpssService)
      {
         this.kpssService = kpssService;
      }

      [HttpPost]
      [Route("getkpsslist")]

      public IEnumerable<Kpss> GetKpssList(GetKpssListRequestApi getKpssListRequestApi)
      {
         return this.kpssService.GetKpssList(getKpssListRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.kpssService?.Dispose();
         base.Dispose(disposing);
      }
   }
}