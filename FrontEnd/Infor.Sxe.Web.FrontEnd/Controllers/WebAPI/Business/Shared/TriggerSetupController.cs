using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.PdstriggerSetup;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   [RoutePrefix("api/shared/triggersetup")]
   public class TriggerSetupController : ApiControllerBase
   {
      private readonly ITriggerSetupService triggerSetupService;

      public TriggerSetupController(ITriggerSetupService triggerSetupService)
      {
         this.triggerSetupService = triggerSetupService;
      }

      [HttpPost]
      [Route("getlistbyname")]
      public IEnumerable<TriggerSetup> GetListByName(GetTriggerSetupListByNameApi criteria)
      {
         return this.triggerSetupService.GetTriggerSetupListByName(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.triggerSetupService?.Dispose();
         base.Dispose(true);
      }
   }
}