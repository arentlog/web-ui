using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswave;

namespace General.Business.Interfaces.TWL
{
   public interface IWaveService : IDisposable
   {
      IEnumerable<Wave> GetTWLWaves(GetTWLWavesApi getTWLWavesApi);
   }
}