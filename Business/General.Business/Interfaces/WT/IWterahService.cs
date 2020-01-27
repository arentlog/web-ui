using System;
using System.Collections.Generic;
using General.Business.Models.WT;
using Infor.Sxe.WT.Data.Models.Pdswterah;

namespace General.Business.Interfaces.WT
{
   public interface IWterahService : IDisposable
   {
      IEnumerable<Wterah> GetWterahListByShipFmWhseShipToWhse(GetWterahListByShipFmWhseShipToWhseRequestApi getWterahListByShipFmWhseShipToWhseRequestApi);
   }
}