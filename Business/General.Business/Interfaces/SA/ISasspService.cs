using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssassp;

namespace General.Business.Interfaces.SA
{
   public interface ISasspService : IDisposable
   {
      IEnumerable<Sassp> GetSasspListByAreaCode(GetSasspListByAreaCodeRequestApi getSasspListByAreaCodeRequestApi);
   }
}