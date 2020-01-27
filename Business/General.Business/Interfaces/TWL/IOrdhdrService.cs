using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsordhdr;

namespace General.Business.Interfaces.TWL
{
   public interface IOrdhdrService : IDisposable
   {
      IEnumerable<Ordhdr> GetTWLOrders(GetTWLOrdersApi getTWLOrdersApi);
   }
}