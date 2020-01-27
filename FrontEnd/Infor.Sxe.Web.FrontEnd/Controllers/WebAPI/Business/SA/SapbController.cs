using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssapb;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sapb")]
   public class SapbController : ApiControllerBase
   {
      private readonly ISapbService sapbService;

      public SapbController(ISapbService sapbService)
      {
         this.sapbService = sapbService;
      }

      [HttpPost]
      [Route("getsapbbyreportfunction")]
      public IEnumerable<Sapb> GetSapbByReportFunction(GetSapbByReportFunctionRequestApi getSapbByReportFunctionRequestApi)
      {
         return this.sapbService.GetSapbByReportFunction(getSapbByReportFunctionRequestApi);
      }

      [HttpPost]
      [Route("getsapbbyconoreportfunctionaltreport")]
      public IEnumerable<Sapb> GetSapbByConoReportFunctionAltReport(GetSapbByConoReportFunctionAltReportRequestApi getSapbByConoReportFunctionAltReportRequestApi)
      {
         return this.sapbService.GetSapbByConoReportFunctionAltReport(getSapbByConoReportFunctionAltReportRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sapbService?.Dispose();
         base.Dispose(true);
      }
   }
}