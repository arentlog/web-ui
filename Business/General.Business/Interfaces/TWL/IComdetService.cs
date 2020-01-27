using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscomdet;

namespace General.Business.Interfaces.TWL
{
   public interface IComdetService : IDisposable
   {
      IEnumerable<Comdet> GetTWLComdetInterfaces(GetTWLComdetInterfacesApi getTWLComdetInterfacesApi);
   }
}