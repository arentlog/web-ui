using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.GL;
using General.Business.Models.GL;
using Infor.Sxe.GL.Data.Models.Pdsglsf;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.GL
{
   [RoutePrefix("api/gl/glsf")]
   public class GlsfController : ApiControllerBase
   {
      private readonly IGlsfService glsfService;

      public GlsfController(IGlsfService glsfService)
      {
         this.glsfService = glsfService;
      }

      [HttpPost]
      [Route("getgliflistbygroupnamedesc")]
      public IEnumerable<Glsf> GetGlifListByGroupNameDesc(GetGlifListByGroupNameDescRequestApi getGlifListByGroupNameDescRequestApi)
      {
         return this.glsfService.GetGlifListByGroupNameDesc(getGlifListByGroupNameDescRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.glsfService?.Dispose();
         base.Dispose(true);
      }
   }
}