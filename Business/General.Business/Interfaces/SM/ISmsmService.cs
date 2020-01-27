using System;
using System.Collections.Generic;
using General.Business.Models.SM;
using Infor.Sxe.SM.Data.Models.Pdssmsm;

namespace General.Business.Interfaces.SM
{
   public interface ISmsmService : IDisposable
   {
      IEnumerable<Smsm> GetSmsmes(GetSmsmesRequestApi getGetSmsmesRequestApi);
   }
}