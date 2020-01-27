using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icsr")]
   public class IcsrController : ApiControllerBase
   {
      private readonly IIcsrService service;

      public IcsrController(IIcsrService service)
      {
         this.service = service;
      }

      [HttpGet]
      [Route("geticsrzerovendorblankwhseline")]
      public GetIcsrZeroVendorBlankWhseLineResponseModel GetIcsrZeroVendorBlankWhseLine()
      {
         return this.service.GetIcsrZeroVendorBlankWhseLine();
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