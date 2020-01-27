using System;
using System.Collections.Generic;
using General.Business.Models.SW;
using Infor.Sxe.SW.Data.Models.Pdsswsw;

namespace General.Business.Interfaces.SW
{
   public interface ISwswService : IDisposable
   {
      IEnumerable<Swsw> ListSwswByClaimType(ListSwswByClaimTypeRequestApi criteria);
   }
}