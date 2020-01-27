using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscmpmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/cmpmst")]
   public class CmpmstController : ApiControllerBase
   {
      private readonly ICmpmstService cmpmstService;

      public CmpmstController(ICmpmstService cmpmstService)
      {
         this.cmpmstService = cmpmstService;
      }

      [HttpPost]
      [Route("gettwlcompanies")]
      public IEnumerable<Cmpmst> GetTWLCompanies(GetTWLCompaniesApi getTWLCompaniesApi)
      {
         return this.cmpmstService.GetTWLCompanies(getTWLCompaniesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cmpmstService?.Dispose();
         base.Dispose(true);
      }
   }
}