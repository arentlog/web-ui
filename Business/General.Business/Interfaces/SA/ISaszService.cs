using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasz;

namespace General.Business.Interfaces.SA
{
   public interface ISaszService : IDisposable
   {
      IEnumerable<Sasz> GetSaszListAllByConoWhseShipVia(GetSaszListAllByConoWhseShipViaRequestApi getGetSaszListAllByConoWhseShipViaRequestApi);
   }
}