using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdsc;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PD
{
   [RoutePrefix("api/pd/pdsc")]
   public class PdscController : ApiControllerBase
   {
      private readonly IPdscService pdscService;

      public PdscController(IPdscService pdscService)
      {
         this.pdscService = pdscService;
      }

      [HttpPost]
      [Route("getpdsclistbywhse")]
      public IEnumerable<Pdsc> GetPdscListByWhse(GetPdscListByWhseRequestApi getPdscListByWhseRequestApi)
      {
         return this.pdscService.GetPdscListByWhse(getPdscListByWhseRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pdscService?.Dispose();
         base.Dispose(true);
      }
   }
}