using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasgl;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sasgl")]
   public class SasglController : ApiControllerBase
   {
      private readonly ISasglService sasglService;

      public SasglController(ISasglService sasglService)
      {
         this.sasglService = sasglService;
      }

      [HttpPost]
      [Route("getsasgllistallbystate")]

      public IEnumerable<Sasgl> GetSasglListAllByState(GetSasglListAllByStateRequestApi GetSasglListAllByStateRequestApi)
      {
         return this.sasglService.GetSasglListAllByState(GetSasglListAllByStateRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasglService?.Dispose();
         base.Dispose(true);
      }
   }
}