using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdswhZone;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/whzone")]
   public class WhZoneController : ApiControllerBase
   {
      private readonly IWhZoneService whZoneService;

      public WhZoneController(IWhZoneService whZoneService)
      {
         this.whZoneService = whZoneService;
      }

      [HttpPost]
      [Route("gettwlzones")]
      public IEnumerable<WhZone> GetTWLZones(GetTWLWarehouseZonesApi getTWLWarehouseZonesApi)
      {
         return this.whZoneService.GetTWLZones(getTWLWarehouseZonesApi);
      }

      [HttpGet]
      [Route("gettwlzones/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{searchType:maxLength(50)}/{keyField:maxLength(50)}")]
      public IEnumerable<WhZone> GetTWLZones(string coNum, string whNum, string searchType, string keyField, int batchsize = 0, string fldlist = "")
      {
         var getTWLWarehouseZonesApi = new GetTWLWarehouseZonesApi()
         {
            coNum = coNum,
            whNum = whNum,
            searchType = searchType,
            keyField = keyField,
            whZone = "",
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.whZoneService.GetTWLZones(getTWLWarehouseZonesApi);
      }

      [HttpGet]
      [Route("gettwlzones/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{searchType:maxLength(50)}/{keyField:maxLength(50)}/{whZone:maxLength(12)}")]
      public IEnumerable<WhZone> GetTWLZones(string coNum, string whNum, string searchType, string keyField, string whZone, int batchsize = 0, string fldlist = "")
      {
         var getTWLWarehouseZonesApi = new GetTWLWarehouseZonesApi()
         {
            coNum = coNum,
            whNum = whNum,
            searchType = searchType,
            keyField = keyField,
            whZone = whZone,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.whZoneService.GetTWLZones(getTWLWarehouseZonesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.whZoneService?.Dispose();
         base.Dispose(true);
      }
   }
}