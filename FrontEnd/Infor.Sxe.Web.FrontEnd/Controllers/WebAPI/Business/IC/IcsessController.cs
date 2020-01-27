using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsess;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icsess")]
   public class IcsessController : ApiControllerBase
   {
      private readonly IIcsessService icsessService;

      public IcsessController(IIcsessService icsessService)
      {
         this.icsessService = icsessService;
      }

      [HttpPost]
      [Route("geticsesslist")]
      public IEnumerable<Icsess> GetIcsessList(GetIcsessListRequestApi getIcsessListRequestApi)
      {
         return this.icsessService.GetIcsessList(getIcsessListRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icsessService?.Dispose();
         base.Dispose(true);
      }
   }
}