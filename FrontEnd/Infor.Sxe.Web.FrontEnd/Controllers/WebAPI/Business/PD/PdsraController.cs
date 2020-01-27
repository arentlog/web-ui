using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdsra;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PD
{
   [RoutePrefix("api/pd/pdsra")]
   public class PdsraController : ApiControllerBase
   {
      private readonly IPdsraService pdsraService;

      public PdsraController(IPdsraService apsfService)
      {
         this.pdsraService = apsfService;
      }

      [HttpPost]
      [Route("getpdsralistbyrebatedetails")]
      public IEnumerable<Pdsra> GetPdsraListByRebateDetails(GetPdsraListByRebateRequestApi getPdsraListByRebateRequestApi)
      {
         return this.pdsraService.GetPdsraListByRebateDetails(getPdsraListByRebateRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pdsraService?.Dispose();
         base.Dispose(true);
      }
   }
}