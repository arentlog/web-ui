using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscommst;

namespace General.Business.Interfaces.TWL
{
   public interface ICommstService : IDisposable
   {
      IEnumerable<Commst> GetTWLCommstInterfaces(GetTWLCommstInterfacesApi getTWLCommstInterfacesApi);
   }
}