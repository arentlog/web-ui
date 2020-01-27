using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasst;

namespace General.Business.Interfaces.SA
{
   public interface ISasstService : IDisposable
   {
      IEnumerable<Sasst> GetSasstListByZipCodeQuery(GetSasstListByZipCodeQueryRequestApi getSasstListByZipCodeQueryRequestApi);
   }
}