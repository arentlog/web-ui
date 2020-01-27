using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssassr;

namespace General.Business.Interfaces.SA
{
   public interface ISassrService : IDisposable
   {
      IEnumerable<Sassr> GetSassrByKeys(GetSassrByKeysRequestApi getSassrByKeysRequestApi);

      IEnumerable<Sassr> ListSassrsByKeys(ListSassrsByKeysRequestApi criteria);
   }
}