using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdswhZone;

namespace General.Business.Interfaces.TWL
{
   public interface IWhZoneService : IDisposable
   {
      IEnumerable<WhZone> GetTWLZones(GetTWLWarehouseZonesApi getTWLWarehouseZonesApi);
   }
}