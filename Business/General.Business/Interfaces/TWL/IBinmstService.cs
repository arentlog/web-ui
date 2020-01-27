using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsbinmst;

namespace General.Business.Interfaces.TWL
{
   public interface IBinmstService : IDisposable
   {
      IEnumerable<Binmst> GetTWLBinLocations(GetTWLBinLocationsApi getTWLBinLocationsApi);

      IEnumerable<Binmst> GetTWLBinsNotActive(GetTWLBinsNotActiveApi getTWLBinsNotActiveApi);
   }
}