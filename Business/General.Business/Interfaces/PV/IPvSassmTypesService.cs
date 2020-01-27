using System;
using System.Collections.Generic;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSassmTypes;

namespace General.Business.Interfaces.PV
{
   public interface IPvSassmTypesService : IDisposable
   {
      IEnumerable<PvSassmTypes> GetAllPvSassmTypesList(GetAllPvSassmTypesListRequestApi criteria);
   }
}