using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdss;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PD
{
   [RoutePrefix("api/pd/pdss")]
   public class PdssController : ApiControllerBase
   {
      private readonly IPdssService pdssService;

      public PdssController(IPdssService pdssService)
      {  
         this.pdssService = pdssService;
      }

      [HttpPost]
      [Route("getpdsslistbysearchterms")]
      public IEnumerable<Pdss> GetPdssListBySearchTerms(GetPdssListBySearchTermsRequestApi getPdssListBySearchTermsRequestApi)
      {
         return this.pdssService.GetPdssListBySearchTerms(getPdssListBySearchTermsRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pdssService?.Dispose();
         base.Dispose(true);
      }
   }
}