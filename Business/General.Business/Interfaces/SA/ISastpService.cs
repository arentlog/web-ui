using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastp;

namespace General.Business.Interfaces.SA
{
   public interface ISastpService : IDisposable
   {
      IEnumerable<Sastp> GetSastpList(GetSastpListRequestApi getGetSastpListRequestApi);
   }
}