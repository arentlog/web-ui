using System;
using System.Collections.Generic;
using General.Business.Models.OE;
using Infor.Sxe.OE.Data.Models.Pdsoedc;

namespace General.Business.Interfaces.OE
{
   public interface IOedcService : IDisposable
   {
      IEnumerable<Oedc> GetOedcListAllByConoAndKey(GetOedcListAllByConoAndKeyRequestApi getGetOedcListAllByConoAndKeyRequestApi);
   }
}