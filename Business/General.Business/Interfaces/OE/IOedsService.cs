using System;
using System.Collections.Generic;
using General.Business.Models.OE;
using Infor.Sxe.OE.Data.Models.Pdsoeds;

namespace General.Business.Interfaces.OE
{
   public interface IOedsService : IDisposable
   {
      IEnumerable<Oeds> GetOedsListAllByConoAndWhse(GetOedsListAllByConoAndWhseRequestApi getGetOedsListAllByConoAndWhseRequestApi);
   }
}