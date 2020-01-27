using System.Collections.Generic;

using Infor.Sxe.VA.Data.Models.Pdsvaeubuildvalist;

namespace General.Business.Models.VA
{
   public class ValueAddUpgradeVersionByListRequestApi
   {
      public List<Vaeubuildvalistresults> vaeuBuildValistResults { get; set; }

      public int toVersionNumber { get; set; }
   }
}