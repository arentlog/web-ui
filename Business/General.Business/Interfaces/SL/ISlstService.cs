using System;
using System.Collections.Generic;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslst;

namespace General.Business.Interfaces.SL
{
   public interface ISlstService : IDisposable
   {
      IEnumerable<Slst> GetSupplierLinkSetupForLookup(GetSupplierLinkSetupForLookupRequestApi getSupplierLinkSetupForLookupRequestApi);
   }
}