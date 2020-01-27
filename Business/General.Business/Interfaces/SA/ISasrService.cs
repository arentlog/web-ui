using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasr;

namespace General.Business.Interfaces.SA
{
   public interface ISasrService : IDisposable
   {
      IEnumerable<Sasr> GetSasrDetails(GetSasrDetailsRequestApi getGetSasrDetailsRequestApi);
   }
}