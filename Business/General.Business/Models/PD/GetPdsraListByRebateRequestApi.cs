using ServiceInterfaceClient.BaseClasses;
using System;

namespace General.Business.Models.PD
{
   public class GetPdsraListByRebateRequestApi : FetchWhereRequestBase
   {
      public int methodno { get; set; }

      public int vendno { get; set; }

      public DateTime? startdt { get; set; }
   }
}
