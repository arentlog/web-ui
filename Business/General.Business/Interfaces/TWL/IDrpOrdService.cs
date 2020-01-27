using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpOrd;

namespace General.Business.Interfaces.TWL
{
   public interface IDrpOrdService : IDisposable
   {
      IEnumerable<DrpOrd> GetTWLAutoDropOrders(GetTWLAutoDropOrdersApi getTWLAutoDropOrdersApi);
   }
}