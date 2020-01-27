using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsuom;

namespace General.Business.Interfaces.TWL
{
   public interface IUomService : IDisposable
   {
      IEnumerable<Uom> GetTWLUnitOfMeasures(GetTWLUnitOfMeasuresApi getTWLUnitOfMeasuresApi);
   }
}