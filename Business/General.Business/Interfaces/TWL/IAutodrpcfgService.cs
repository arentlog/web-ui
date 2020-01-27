using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsautodrpcfg;

namespace General.Business.Interfaces.TWL
{
   public interface IAutodrpcfgService : IDisposable
   {
      IEnumerable<Autodrpcfg> GetTWLAutoDropConfigs(GetTWLAutoDropConfigsApi getTWLAutoDropConfigsApi);
   }
}