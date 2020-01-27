using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.CM;
using General.Business.Models.CM;
using Infor.Sxe.CM.Data.Models.Pdscmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.CM
{
   [RoutePrefix("api/cm/cmst")]
   public class CmstController : ApiControllerBase
   {
      private readonly ICmstService cmstService;

      public CmstController(ICmstService cmstService)
      {
         this.cmstService = cmstService;
      }

      [HttpPost]
      [Route("getcmstlistbyidcodevaldesc")]

      public IEnumerable<Cmst> GetCmstListByIDCodeValDesc(GetCmstListByIDCodeValDescRequestApi GetCmstListByIDCodeValDescRequestApi)
      {
         return this.cmstService.GetCmstListByIDCodeValDesc(GetCmstListByIDCodeValDescRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cmstService?.Dispose();
         base.Dispose(true);
      }
   }
}