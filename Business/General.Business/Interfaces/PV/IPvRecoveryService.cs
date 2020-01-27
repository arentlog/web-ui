using System;
using System.Collections.Generic;
using Infor.Sxe.PV.Data.Models.PdspvRecovery;

namespace General.Business.Interfaces.PV
{
   public interface IPvRecoveryService : IDisposable
   {
      IEnumerable<PvRecovery> GetPvRecoveryListByOperator(string oper2, int batchsize, string fldlist);
   }
}