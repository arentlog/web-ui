using System.Web.Http;
using General.Business.Interfaces.GL;
using Infor.Sxe.GL.Data.Models.Complex;
using Infor.Sxe.GL.Data.Models.Pdsglaccountlookup;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.GL
{
   [RoutePrefix("api/gl/glsa")]
   public class GlsaController : ApiControllerBase
   {
      private readonly IGlsaService service;

      public GlsaController(IGlsaService service)
      {
         this.service = service;
      }

      [Route("advancedlookup")]
      [HttpPost]
      public GlsaLookupResponseAPI AdvancedLookup(Glaccountlookupcriteria glaccountlookupcriteria)
      {
         return this.service.AdvancedLookup(glaccountlookupcriteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.service?.Dispose();
         base.Dispose(true);
      }
   }
}