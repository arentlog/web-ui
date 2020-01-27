using System;
using System.Collections.Generic;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvUser;

namespace General.Business.Interfaces.PV
{
   public interface IPvUserService : IDisposable
   {
      IEnumerable<PvUser> GetPvUserListByKeys(GetPvUserListByKeysRequestApi criteria);
   }
}