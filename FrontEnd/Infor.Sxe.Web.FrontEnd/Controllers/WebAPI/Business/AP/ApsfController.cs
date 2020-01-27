using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.AP;
using General.Business.Models.AP;
using Infor.Sxe.AP.Data.Models.Pdsapsf;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.AP
{
   [RoutePrefix("api/ap/apsf")]
   public class ApsfController : ApiControllerBase
   {
      private readonly IApsfService apsfService;

      public ApsfController(IApsfService apsfService)
      {
         this.apsfService = apsfService;
      }

      [HttpPost]
      [Route("getapsflistbytaxdetails")]
      public IEnumerable<Apsf> GetApsfListByTaxDetails(GetApsfListByTaxDetailsRequestApi getApsfListByTaxDetailsRequestApi)
      {
         return this.apsfService.GetApsfListByTaxDetails(getApsfListByTaxDetailsRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.apsfService?.Dispose();
         base.Dispose(true);
      }
   }
}