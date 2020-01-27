using System;
using System.Collections.Generic;
using General.Business.Models.AR;
using Infor.Sxe.AR.Data.Models.Pdsarbcb;

namespace General.Business.Interfaces.AR
{
   public interface IArbcbService : IDisposable
   {
      IEnumerable<Arbcb> GetArbcbList(GetArbcbListRequestApi getArbcbListRequestApi);
   }
}
