using System;
using System.Collections.Generic;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdsc;

namespace General.Business.Interfaces.PD
{
   public interface IPdscService : IDisposable
   {
      IEnumerable<Pdsc> GetPdscListByWhse(GetPdscListByWhseRequestApi getPdscListByWhseRequestApi);
   }
}