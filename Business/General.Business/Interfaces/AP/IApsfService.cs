using System;
using System.Collections.Generic;
using General.Business.Models.AP;
using Infor.Sxe.AP.Data.Models.Pdsapsf;

namespace General.Business.Interfaces.AP
{
   public interface IApsfService : IDisposable
   {
      IEnumerable<Apsf> GetApsfListByTaxDetails(GetApsfListByTaxDetailsRequestApi getApsfListByTaxDetailsRequestApi);
   }
}