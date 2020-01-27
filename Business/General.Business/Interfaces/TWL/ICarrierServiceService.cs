using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdscarrierService;

namespace General.Business.Interfaces.TWL
{
   public interface ICarrierServiceService : IDisposable
   {
      IEnumerable<CarrierService> GetTWLCarrierServices(GetTWLCarrierServicesApi getTWLCarrierServicesApi);
   }
}