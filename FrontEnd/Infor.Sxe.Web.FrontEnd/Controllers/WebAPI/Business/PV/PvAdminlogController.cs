using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvAdminlog;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvadminlog")]
   public class PvAdminlogController : ApiControllerBase
   {
      private readonly IPvAdminLogService pvAdminLogServiceService;

      public PvAdminlogController(IPvAdminLogService pvAdminLogServiceService)
      {
         this.pvAdminLogServiceService = pvAdminLogServiceService;
      }

      [HttpPost]
      [Route("listbysubject")]
      public IEnumerable<PvAdminlog> ListBySubject(ListBySubjectRequestApi criteria)
      {
         return this.pvAdminLogServiceService.ListBySubject(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvAdminLogServiceService?.Dispose();
         base.Dispose(true);
      }
   }
}