using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdspick;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/pick")]
   public class PickController : ApiControllerBase
   {
      private readonly IPickService pickService;

      public PickController(IPickService pickService)
      {
         this.pickService = pickService;
      }

      [HttpPost]
      [Route("gettwlzones")]
      public IEnumerable<Pick> GetTWLZones(GetTWLPicksApi getTWLPicksApi)
      {
         return this.pickService.GetPicksByZone(getTWLPicksApi);
      }
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pickService?.Dispose();
         base.Dispose(true);
      }
   }
}