using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslst;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SL
{
   [RoutePrefix("api/sl/slst")]
   public class SlstController : ApiControllerBase
   {
      private readonly ISlstService slstService;

      public SlstController(ISlstService slstService)
      {
         this.slstService = slstService;
      }

      [HttpPost]
      [Route("getsupplierlinksetupforlookup")]
      public IEnumerable<Slst> GetSupplierLinkSetupForLookup(GetSupplierLinkSetupForLookupRequestApi getSupplierLinkSetupForLookupRequestApi)
      {
         return this.slstService.GetSupplierLinkSetupForLookup(getSupplierLinkSetupForLookupRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slstService?.Dispose();
         base.Dispose(true);
      }
   }
}