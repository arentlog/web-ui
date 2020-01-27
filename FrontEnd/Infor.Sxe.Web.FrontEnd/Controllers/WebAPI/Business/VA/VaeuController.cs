using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.VA;
using General.Business.Models.VA;
using Infor.Sxe.VA.Data.Models.Pdsmessaging;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.VA
{
   [RoutePrefix("api/va/vaeu")]
   public class VaeuController : ApiControllerBase
   {
      private readonly IVaeuService vaeuService;

      public VaeuController(IVaeuService vaeuService)
      {
         this.vaeuService = vaeuService;
      }

      [HttpPost]
      [Route("upgradeversionsbylist")]
      public IEnumerable<Messaging> UpgradeVersionsByList(ValueAddUpgradeVersionByListRequestApi vaeuUpgradeVersionsRequest)
      {
         //TODO: SI - Improve this by creating a new backend call based on 'VAEUUpgrade' that takes in a List.  SXWEB-12368.  Once that is completed, this custom can be removed.  This is used in the 'VAEU' function.
         return this.vaeuService.UpgradeVersionsByList(vaeuUpgradeVersionsRequest);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.vaeuService?.Dispose();
         base.Dispose(true);
      }
   }
}