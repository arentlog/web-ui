using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastp;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sastp")]
   public class SastpController : ApiControllerBase
   {
      private readonly ISastpService sastpService;

      public SastpController(ISastpService sastpService)
      {
         this.sastpService = sastpService;
      }

      [HttpPost]
      [Route("getsastplist")]

      public IEnumerable<Sastp> GetSastpList(GetSastpListRequestApi GetSastpListRequestApi)
      {
         return this.sastpService.GetSastpList(GetSastpListRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastpService?.Dispose();
         base.Dispose(true);
      }
   }
}