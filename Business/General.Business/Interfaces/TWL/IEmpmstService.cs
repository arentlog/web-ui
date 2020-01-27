using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsempmst;

namespace General.Business.Interfaces.TWL
{
   public interface IEmpmstService : IDisposable
   {
      IEnumerable<Empmst> GetTWLEmployees(GetTWLEmployeesApi getTWLEmployeesApi);
   }
}