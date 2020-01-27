using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsordhdr;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/ordhdr")]
   public class OrdhdrController : ApiControllerBase
   {
      private readonly IOrdhdrService ordhdrService;

      public OrdhdrController(IOrdhdrService ordhdrService)
      {
         this.ordhdrService = ordhdrService;
      }

      [HttpPost]
      [Route("gettwlorders")]
      public IEnumerable<Ordhdr> GetTWLOrders(GetTWLOrdersApi getTWLOrdersApi)
      {
         return this.ordhdrService.GetTWLOrders(getTWLOrdersApi);
      }
      
      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.ordhdrService?.Dispose();
         base.Dispose(true);
      }
   }
}