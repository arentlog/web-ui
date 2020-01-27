using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscmpmst;

namespace General.Business.Interfaces.TWL
{
   public interface ICmpmstService : IDisposable
   {
      IEnumerable<Cmpmst> GetTWLCompanies(GetTWLCompaniesApi getTWLCompaniesApi);
   }
}