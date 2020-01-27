using System;
using System.Collections.Generic;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpss;

namespace General.Business.Interfaces.KP
{
   public interface IKpssService : IDisposable
   {
      IEnumerable<Kpss> GetKpssList(GetKpssListRequestApi getGetKpssListRequestApi);
   }
}