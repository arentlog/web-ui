using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.KP;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpso;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.KP
{
   [RoutePrefix("api/kp/kpso")]
   public class KpsoController : ApiControllerBase
   {
      private readonly IKpsoService kpsoService;

      public KpsoController(IKpsoService kpsoService)
      {
         this.kpsoService = kpsoService;
      }

      [HttpPost]
      [Route("getoptionsbyoptionname")]

      public IEnumerable<Kpso> GetOptionsByOptionName(GetOptionsByOptionNameRequestApi getOptionsByOptionNameRequestApi)
      {
         return this.kpsoService.GetOptionsByOptionName(getOptionsByOptionNameRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.kpsoService?.Dispose();
         base.Dispose(true);
      }
   }
}