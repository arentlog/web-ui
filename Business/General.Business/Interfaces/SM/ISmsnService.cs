using System;
using System.Collections.Generic;
using General.Business.Models.SM;
using Infor.Sxe.SM.Data.Models.Pdssmsn;

namespace General.Business.Interfaces.SM
{
   public interface ISmsnService : IDisposable
   {
      IEnumerable<Smsn> GetSmsnListBySalesRepAndName(GetSmsnListBySalesRepAndNameRequestApi getGetSmsnListBySalesRepAndNameRequestApi);
   }
}