using System;
using System.Collections.Generic;
using General.Business.Models.CM;
using Infor.Sxe.CM.Data.Models.Pdscmst;

namespace General.Business.Interfaces.CM
{
   public interface ICmstService : IDisposable
   {
      IEnumerable<Cmst> GetCmstListByIDCodeValDesc(GetCmstListByIDCodeValDescRequestApi getGetCmstListByIDCodeValDescRequestApi);
   }
}