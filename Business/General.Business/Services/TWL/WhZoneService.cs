using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdswhZone;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class WhZoneService : ServiceBase, IWhZoneService
   {
      private readonly WhZoneRepository whZoneRepository;

      public WhZoneService(WhZoneRepository whZoneRepository)
      {
         this.whZoneRepository = whZoneRepository;
      }

      public IEnumerable<WhZone> GetTWLZones(GetTWLWarehouseZonesApi getTWLWarehouseZonesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLWarehouseZonesApi.coNum))
         {
            sb.AppendFormatWithEscape("wh_zone.co_num = '{0}'", getTWLWarehouseZonesApi.coNum);
            if (getTWLWarehouseZonesApi.whNum != "--all--")
            {
               sb.AppendFormatWithEscape(" AND wh_zone.wh_num = '{0}'", getTWLWarehouseZonesApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLWarehouseZonesApi.whZone))
            {
               sb.AppendFormatWithEscape(" AND wh_zone.wh_zone = '{0}'", getTWLWarehouseZonesApi.whZone);
            }
            switch (getTWLWarehouseZonesApi.searchType)
            {
               case "carouselType":
                  if (!string.IsNullOrWhiteSpace(getTWLWarehouseZonesApi.keyField))
                  {
                     sb.AppendFormatWithEscape(" AND wh_zone.carousel_type = '{0}'", getTWLWarehouseZonesApi.keyField);
                  }
                  break;
               case "zoneType":
                  if (!string.IsNullOrWhiteSpace(getTWLWarehouseZonesApi.keyField))
                  {
                     sb.AppendFormatWithEscape(" AND wh_zone.zone_type = '{0}'", getTWLWarehouseZonesApi.keyField);
                  }
                  break;
            }
         }
         var where = sb.ToString();
         return this.whZoneRepository.GetList(where, getTWLWarehouseZonesApi.batchsize, getTWLWarehouseZonesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.whZoneRepository?.Dispose();
         base.Dispose(true);
      }
   }
}