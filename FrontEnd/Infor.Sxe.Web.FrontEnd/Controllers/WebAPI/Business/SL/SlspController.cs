using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsp;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SL
{
   [RoutePrefix("api/sl/slsp")]
   public class SlspController : ApiControllerBase
   {
      private readonly ISlspService slspService;

      public SlspController(ISlspService slspService)
      {
         this.slspService = slspService;
      }

      [HttpPost]
      [Route("getslsplistbykeys")]

      public IEnumerable<Slsp> GetSlspListByKeys(GetSlspListByKeysRequestApi GetSlspListByKeysRequestApi)
      {
         return this.slspService.GetSlspListByKeys(GetSlspListByKeysRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slspService?.Dispose();
         base.Dispose(true);
      }
   }
}