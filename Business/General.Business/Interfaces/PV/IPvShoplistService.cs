using System;
using System.Collections.Generic;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvShoplist;

namespace General.Business.Interfaces.PV
{
   public interface IPvShoplistService : IDisposable
   {
      IEnumerable<PvShoplist> GetPvShoplistByOper(GetPvShoplistByOperRequestApi criteria);
   }
}