using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSapbq;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvsapbq")]
   public class PvSapbqRestApiController : ApiControllerBase
   {
      private readonly IPvSapbqService pvSapbqService;

      public PvSapbqRestApiController(IPvSapbqService pvSapbqService)
      {
         this.pvSapbqService = pvSapbqService;
      }

      [HttpPost]
      [Route("listbyqueuename")]
      public IEnumerable<PvSapbq> ListByQueueName(GetPvSapbqListByQueueRequestApi criteria)
      {
         return this.pvSapbqService.GetPvSapbqListByQueueName(criteria);
      }

      [HttpPost]
      [Route("listbyqueuenameanddemand")]
      public IEnumerable<PvSapbq> ListByQueueNameAndDemand(GetPvSapbqListByQueueAndDemandRequestApi criteria)
      {
         return this.pvSapbqService.GetPvSapbqListByQueueNameAndDemand(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvSapbqService?.Dispose();
         base.Dispose(true);
      }
   }
}