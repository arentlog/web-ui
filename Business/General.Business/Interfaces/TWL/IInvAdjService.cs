using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsinvAdj;

namespace General.Business.Interfaces.TWL
{
   public interface IInvAdjService : IDisposable
   {
      IEnumerable<InvAdj> GetTWLInvAdjustments(GetTWLInvAdjustmentsApi getTWLInvAdjustmentsApi);
   }
}