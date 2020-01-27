using System;
using System.Collections.Generic;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpso;

namespace General.Business.Interfaces.KP
{
   public interface IKpsoService : IDisposable
   {
      IEnumerable<Kpso> GetOptionsByOptionName(GetOptionsByOptionNameRequestApi getGetOptionsByOptionNameRequestApi);
   }
}