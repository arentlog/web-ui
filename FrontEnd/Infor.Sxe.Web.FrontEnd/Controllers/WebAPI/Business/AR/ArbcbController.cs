using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.AR;
using General.Business.Models.AR;
using Infor.Sxe.AR.Data.Models.Pdsarbcb;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.AR
{
   [RoutePrefix("api/ar/arbcb")]
   public class ArbcbController : ApiControllerBase
   {
      private readonly IArbcbService arbcbService;

      public ArbcbController(IArbcbService arbcbService)
      {
         this.arbcbService = arbcbService;
      }

      [HttpPost]
      [Route("getarbcblist")]
      public IEnumerable<Arbcb> GetArbcbList(GetArbcbListRequestApi getArbcbListRequestApi)
      {
         return this.arbcbService.GetArbcbList(getArbcbListRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.arbcbService?.Dispose();
         base.Dispose(true);
      }
   }
}
