using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicamue;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icamue")]
   public class IcamueController : ApiControllerBase
   {
      private readonly IIcamueService icamueService;

      public IcamueController(IIcamueService icamueService)
      {
         this.icamueService = icamueService;
      }

      [HttpPost]
      [Route("geticamuelist")]

      public IEnumerable<Icamue> GetIcamueList(GetIcamueListRequestApi GetIcamueListRequestApi)
      {
         return this.icamueService.GetIcamueList(GetIcamueListRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icamueService?.Dispose();
         base.Dispose(true);
      }
   }
}