using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SW;
using General.Business.Models.SW;
using Infor.Sxe.SW.Data.Models.Pdsswsw;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SW
{
   [RoutePrefix("api/sw/swsw")]
   public class SwswController : ApiControllerBase
   {
      private readonly ISwswService swswService;

      public SwswController(ISwswService swswService)
      {
         this.swswService = swswService;
      }

      [HttpPost]
      [Route("listswswbyclaimtype")]

      public IEnumerable<Swsw> ListSwswByClaimType(ListSwswByClaimTypeRequestApi criteria)
      {
         return this.swswService.ListSwswByClaimType(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.swswService?.Dispose();
         base.Dispose(true);
      }
   }
}