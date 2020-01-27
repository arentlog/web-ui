using System;
using System.Collections.Generic;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsp;

namespace General.Business.Interfaces.SL
{
   public interface ISlspService : IDisposable
   {
      IEnumerable<Slsp> GetSlspListByKeys(GetSlspListByKeysRequestApi getGetSlspListByKeysRequestApi);
   }
}
