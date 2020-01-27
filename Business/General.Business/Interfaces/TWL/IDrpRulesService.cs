using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpRules;

namespace General.Business.Interfaces.TWL
{
   public interface IDrpRulesService : IDisposable
   {
      IEnumerable<DrpRules> GetTWLAutoDropRules(GetTWLAutoDropRulesApi getTWLAutoDropRulesApi);
   }
}