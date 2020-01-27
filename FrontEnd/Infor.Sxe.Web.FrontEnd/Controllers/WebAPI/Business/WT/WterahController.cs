using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.WT;
using General.Business.Models.WT;
using Infor.Sxe.WT.Data.Models.Pdswterah;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.WT
{
   [RoutePrefix("api/wt/wterah")]
   public class WterahController : ApiControllerBase
   {
      private readonly IWterahService wterahService;

      public WterahController(IWterahService wterahService)
      {
         this.wterahService = wterahService;
      }

      [HttpPost]
      [Route("getwterahlistbyshipfmwhseshiptowhse")]
      public IEnumerable<Wterah> GetWterahListByShipFmWhseShipToWhse(GetWterahListByShipFmWhseShipToWhseRequestApi getWterahListByShipFmWhseShipToWhseRequestApi)
      {
         return this.wterahService.GetWterahListByShipFmWhseShipToWhse(getWterahListByShipFmWhseShipToWhseRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.wterahService?.Dispose();
         base.Dispose(true);
      }
   }
}