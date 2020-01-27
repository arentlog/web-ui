using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsdepmst;

namespace General.Business.Interfaces.TWL
{
   public interface IDepmstService : IDisposable
   {
      IEnumerable<Depmst> GetTWLDepartments(GetTWLDepartmentsApi getTWLDepartmentsApi);
   }
}