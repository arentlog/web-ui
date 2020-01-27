using System;
using System.Collections.Generic;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdsra;

namespace General.Business.Interfaces.PD
{
   public interface IPdsraService : IDisposable
   {
      IEnumerable<Pdsra> GetPdsraListByRebateDetails(GetPdsraListByRebateRequestApi getPdsraListByRebateRequestApi);
   }
}