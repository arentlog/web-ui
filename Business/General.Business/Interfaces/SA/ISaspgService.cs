using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssaspg;

namespace General.Business.Interfaces.SA
{
   public interface ISaspgService : IDisposable
   {
      IEnumerable<Saspg> GetSaspgPrinterGroup(GetSaspgPrinterGroupRequestApi getSaspgPrinterGroupRequestApi);
   }
}