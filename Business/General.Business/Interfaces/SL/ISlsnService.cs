using System;
using System.Collections.Generic;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsn;

namespace General.Business.Interfaces.SL
{
   public interface ISlsnService : IDisposable
   {
      IEnumerable<Slsn> GetSlsnListByKeys(GetSlsnListByKeysRequestApi getGetSlsnListByKeysRequestApi);
   }
}