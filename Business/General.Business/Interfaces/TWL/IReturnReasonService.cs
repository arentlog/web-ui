using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsreturnReason;

namespace General.Business.Interfaces.TWL
{
   public interface IReturnReasonService : IDisposable
   {
      IEnumerable<ReturnReason> GetTWLReturnReasons(GetTWLReturnReasonsApi getTWLReturnReasonsApi);
   }
}