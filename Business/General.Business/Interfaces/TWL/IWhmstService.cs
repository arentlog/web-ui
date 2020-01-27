using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdswhmst;

namespace General.Business.Interfaces.TWL
{
   public interface IWhmstService : IDisposable
   {
      IEnumerable<Whmst> GetTWLWarehouses(GetTWLWarehousesApi getTWLWarehousesApi);
   }
}