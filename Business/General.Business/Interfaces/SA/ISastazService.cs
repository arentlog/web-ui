using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastaz;

namespace General.Business.Interfaces.SA
{
   public interface ISastazService : IDisposable
   {
      IEnumerable<Sastaz> GetSastazByWhereClause(string whereClause, int batchsize, string fldlist);
   }
}