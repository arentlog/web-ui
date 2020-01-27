using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.OE;
using General.Business.Models.OE;
using Infor.Sxe.OE.Data.Models.Pdsoeds;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.OE
{
   [RoutePrefix("api/oe/oeds")]
   public class OedsController : ApiControllerBase
   {
      private readonly IOedsService oedsService;

      public OedsController(IOedsService oedsService)
      {
         this.oedsService = oedsService;
      }

      [HttpPost]
      [Route("getoedslistallbyconoandwhse")]
      public IEnumerable<Oeds> GetOedsListAllByConoAndWhse(GetOedsListAllByConoAndWhseRequestApi getOedsListAllByConoAndWhseRequestApi)
      {
            return this.oedsService.GetOedsListAllByConoAndWhse(getOedsListAllByConoAndWhseRequestApi);
        }

        protected override void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }
           this.oedsService?.Dispose();
           base.Dispose(true);
        }
    }
}