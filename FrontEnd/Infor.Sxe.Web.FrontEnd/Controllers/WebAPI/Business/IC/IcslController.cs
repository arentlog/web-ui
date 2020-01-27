using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsl;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icsl")]
   public class IcslController : ApiControllerBase
   {
      private readonly IIcslService icslService;

      public IcslController(IIcslService icslService)
      {
         this.icslService = icslService;
      }

      [HttpPost]
      [Route("geticsllistbywhsevendnoprodline")]
      public IEnumerable<Icsl> GetIcslListByWhseVendNoProdLine(GetIcslListByWhseVendNoProdLineRequestApi getIcslListByWhseVendNoProdLineRequestApi)
      {
         return this.icslService.GetIcslListByWhseVendNoProdLine(getIcslListByWhseVendNoProdLineRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icslService?.Dispose();
         base.Dispose(true);
      }
   }
}