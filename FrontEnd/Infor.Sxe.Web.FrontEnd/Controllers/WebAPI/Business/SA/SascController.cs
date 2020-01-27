using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasc;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sasc")]
   public class SascController : ApiControllerBase
   {
      private readonly ISascService sascService;

      public SascController(ISascService sascService)
      {
         this.sascService = sascService;
      }

      [HttpPost]
      [Route("getcompanylookup")]

      public IEnumerable<Sasc> GetCompanyLookup(GetCompanyLookupRequestApi GetCompanyLookupRequestApi)
      {
         return this.sascService.GetCompanyLookup(GetCompanyLookupRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sascService?.Dispose();
         base.Dispose(true);
      }
   }
}