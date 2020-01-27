using System;
using System.Collections.Generic;
using General.Business.Models.SW;
using Infor.Sxe.SW.Data.Models.Pdsswsj;

namespace General.Business.Interfaces.SW
{
   public interface ISwsjService : IDisposable
   {
      IEnumerable<Swsj> ListSwsjByTypePCatChargeOEType(ListSwsjByTypePCatChargeOETypeRequestApi criteria);
   }
}