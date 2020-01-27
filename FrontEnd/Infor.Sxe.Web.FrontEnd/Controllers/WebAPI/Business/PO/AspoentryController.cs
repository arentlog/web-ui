using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PO;
using Infor.Sxe.PO.Data.Models.Pdspoebtdeletebatch;
using Infor.Sxe.PO.Data.Models.Pdspoebtupdatedata;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PO
{
   [RoutePrefix("api/po/aspoentry")]
   public class AspoentryController : ApiControllerBase
   {
      private readonly IAspoentryService aspoentryService;

      public AspoentryController(IAspoentryService aspoentryService)
      {
         this.aspoentryService = aspoentryService;
      }

      [HttpPost]
      [Route("poebtdeletebatchcollection")]
      public void PoebtDeleteBatchCollection(IEnumerable<Poebtdeletebatch> poebtdeletebatchCollection)
      {
         this.aspoentryService.PoebtDeleteBatchCollection(poebtdeletebatchCollection);
      }

      [HttpPost]
      [Route("poebtupdatecollection")]
      public void PoebtUpdateCollection(IEnumerable<Poebtupdatedata> poebtupdateCollection)
      {
         this.aspoentryService.PoebtUpdateCollection(poebtupdateCollection);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.aspoentryService?.Dispose();
         base.Dispose(true);
      }
   }
}