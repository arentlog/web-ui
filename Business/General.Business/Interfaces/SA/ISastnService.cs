using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastn;

namespace General.Business.Interfaces.SA
{
   public interface ISastnService : IDisposable
   {
      IEnumerable<Sastn> GetSastnList(GetSastnListRequestApi getGetSastnListRequestApi);

      IEnumerable<SastnLookupResponse> Lookup(SastnLookupRequest sastnLookupRequest);
   }
}