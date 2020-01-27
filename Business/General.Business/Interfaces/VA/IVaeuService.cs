using System;
using System.Collections.Generic;
using General.Business.Models.VA;
using Infor.Sxe.VA.Data.Models.Pdsmessaging;

namespace General.Business.Interfaces.VA
{
   public interface IVaeuService : IDisposable
   {
      IEnumerable<Messaging> UpgradeVersionsByList(ValueAddUpgradeVersionByListRequestApi vaeuUpgradeVersionsRequest);
   }
}