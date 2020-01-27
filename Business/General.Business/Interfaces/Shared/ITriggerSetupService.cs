using System;
using System.Collections.Generic;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.PdstriggerSetup;

namespace General.Business.Interfaces.Shared
{
   public interface ITriggerSetupService : IDisposable
   {
      IEnumerable<TriggerSetup> GetTriggerSetupListByName(GetTriggerSetupListByNameApi criteria);
   }
}