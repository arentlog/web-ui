using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsn;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SL
{
   [RoutePrefix("api/sl/slsn")]
   public class SlsnController : ApiControllerBase
   {
      private readonly ISlsnService slsnService;

      public SlsnController(ISlsnService slsnService)
      {
         this.slsnService = slsnService;
      }

      [HttpPost]
      [Route("getslsnlistbykeys")]

      public IEnumerable<Slsn> GetSlsnListByKeys(GetSlsnListByKeysRequestApi GetSlsnListByKeysRequestApi)
      {
         return this.slsnService.GetSlsnListByKeys(GetSlsnListByKeysRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slsnService?.Dispose();
         base.Dispose(true);
      }
   }
}