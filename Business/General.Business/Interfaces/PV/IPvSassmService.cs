using System;
using System.Collections.Generic;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSassm;

namespace General.Business.Interfaces.PV
{
   public interface IPvSassmService : IDisposable
   {
      IEnumerable<PvSassm> GetPvSassmForAoSystem(GetPvSassmForAoSystemListRequestApi criteria);
   }
}