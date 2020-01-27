using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasgl;

namespace General.Business.Interfaces.SA
{
   public interface ISasglService : IDisposable
   {
      IEnumerable<Sasgl> GetSasglListAllByState(GetSasglListAllByStateRequestApi getGetSasglListAllByStateRequestApi);
   }
}