using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasc;

namespace General.Business.Interfaces.SA
{
   public interface ISascService : IDisposable
   {
      IEnumerable<Sasc> GetCompanyLookup(GetCompanyLookupRequestApi getGetCompanyLookupRequestApi);
   }
}