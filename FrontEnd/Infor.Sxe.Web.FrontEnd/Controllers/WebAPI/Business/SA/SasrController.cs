using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasr;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sasr")]
   public class SasrController : ApiControllerBase
   {
      private readonly ISasrService sasrService;

      public SasrController(ISasrService sasrService)
      {
         this.sasrService = sasrService;
      }

      [HttpPost]
      [Route("getsasrdetails")]

      public IEnumerable<Sasr> GetSasrDetails(GetSasrDetailsRequestApi GetSasrDetailsRequestApi)
      {
         return this.sasrService.GetSasrDetails(GetSasrDetailsRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasrService?.Dispose();
         base.Dispose(true);
      }
   }
}