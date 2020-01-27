using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsshfmst;

namespace General.Business.Interfaces.TWL
{
   public interface IShfmstService : IDisposable
   {
      IEnumerable<Shfmst> GetTWLShifts(GetTWLShiftsApi getTWLShiftsApi);
   }
}