using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sasst")]
   public class SasstController : ApiControllerBase
   {
      private readonly ISasstService sasstService;

      public SasstController(ISasstService sasstService)
      {
         this.sasstService = sasstService;
      }

      [HttpPost]
      [Route("getsasstlistbyzipcodequery")]
      public IEnumerable<Sasst> GetSasstListByZipCodeQuery(GetSasstListByZipCodeQueryRequestApi getSasstListByZipCodeQueryRequestApi)
      {
         return this.sasstService.GetSasstListByZipCodeQuery(getSasstListByZipCodeQueryRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasstService?.Dispose();
         base.Dispose(true);
      }
   }
}