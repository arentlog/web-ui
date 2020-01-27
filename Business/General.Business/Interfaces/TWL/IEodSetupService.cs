using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdseodSetup;

namespace General.Business.Interfaces.TWL
{
   public interface IEodSetupService : IDisposable
   {
      IEnumerable<EodSetup> GetTWLEodSetups(GetTWLEodSetupsApi getTWLEodSetupsApi);
   }
}