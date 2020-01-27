using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdscartonSize;

namespace General.Business.Interfaces.TWL
{
   public interface ICartonSizeService : IDisposable
   {
      IEnumerable<CartonSize> GetTWLCartonSizes(GetTWLCartonSizesApi getTWLCartonSizesApi);
   }
}