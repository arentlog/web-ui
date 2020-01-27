using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.KP;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpsg;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.KP
{
   [RoutePrefix("api/kp/kpsg")]
   public class KpsgController : ApiControllerBase
   {
      private readonly IKpsgService kpsgService;

      public KpsgController(IKpsgService kpsgService)
      {
         this.kpsgService = kpsgService;
      }

      [HttpPost]
      [Route("getgroupsbygroupnameandsequencenumber")]

      public IEnumerable<Kpsg> GetGroupsByGroupNameAndSequenceNumber(GetGroupsByGroupNameAndSequenceNumberRequestApi getGroupsByGroupNameAndSequenceNumberRequestApi)
      {
         return this.kpsgService.GetGroupsByGroupNameAndSequenceNumber(getGroupsByGroupNameAndSequenceNumberRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.kpsgService?.Dispose();
         base.Dispose(true);
      }
   }
}