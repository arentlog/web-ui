using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscarrier;

namespace General.Business.Interfaces.TWL
{
   public interface ICarrierService : IDisposable
   {
      IEnumerable<Carrier> GetTWLCarriers(GetTWLCarriersApi getTWLCarriersApi);
   }
}