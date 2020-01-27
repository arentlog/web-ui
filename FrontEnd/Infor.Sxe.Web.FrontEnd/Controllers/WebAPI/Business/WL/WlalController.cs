using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.WL;
using General.Business.Models.WL;
using Infor.Sxe.WL.Data.Models.Pdswlal;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.WL
{
   [RoutePrefix("api/wl/wlal")]
   public class WlalController : ApiControllerBase
   {
      private readonly IWlalService wlalService;

      public WlalController(IWlalService wlalService)
      {
         this.wlalService = wlalService;
      }

      [HttpPost]
      [Route("getwlalbylocationdescription")]
      public IEnumerable<Wlal> GetWlalByLocationDescription(GetWlalByLocationDescriptionApi getWlalByLocationDescriptionApi)
      {
         return this.wlalService.GetWlalByLocationDescription(getWlalByLocationDescriptionApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.wlalService?.Dispose();
         base.Dispose(true);
      }
   }
}