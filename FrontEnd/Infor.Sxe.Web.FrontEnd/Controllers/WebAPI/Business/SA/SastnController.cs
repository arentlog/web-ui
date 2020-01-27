using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastn;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sastn")]
   public class SastnController : ApiControllerBase
   {
      private readonly ISastnService sastnService;

      public SastnController(ISastnService sastnService)
      {
         this.sastnService = sastnService;
      }

      [HttpPost]
      [Route("getsastnlist")]
      public IEnumerable<Sastn> GetSastnList(GetSastnListRequestApi GetSastnListRequestApi)
      {
         return this.sastnService.GetSastnList(GetSastnListRequestApi);
      }

      [HttpPost]
      [Route("lookup")]
      public IEnumerable<SastnLookupResponse> Lookup(SastnLookupRequest sastnLookupRequest)
      {
         return this.sastnService.Lookup(sastnLookupRequest);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastnService?.Dispose();
         base.Dispose(true);
      }
   }
}