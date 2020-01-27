using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SW;
using General.Business.Models.SW;
using Infor.Sxe.SW.Data.Models.Pdsswsj;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SW
{
   [RoutePrefix("api/sw/swsj")]
   public class SwsjController : ApiControllerBase
   {
      private readonly ISwsjService swsjService;

      public SwsjController(ISwsjService swsjService)
      {
         this.swsjService = swsjService;
      }

      [HttpPost]
      [Route("listswsjbytypepcatchargeoetype")]

      public IEnumerable<Swsj> ListSwsjByTypePCatChargeOEType(ListSwsjByTypePCatChargeOETypeRequestApi criteria)
      {
         return this.swsjService.ListSwsjByTypePCatChargeOEType(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.swsjService?.Dispose();
         base.Dispose(true);
      }
   }
}