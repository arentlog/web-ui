using System.Collections.Generic;

namespace Infor.Sxe.SA.Data.Adapters
{
   using Sxe.SA.Data.Models.Pdssaicdisconnect;
   public partial class AssainquiryAdapter
   {
      public void SAICListDisconnect(IEnumerable<Saicdisconnect> saicdisconnectlist)
      {
         if (saicdisconnectlist != null)
         {
            foreach (var saicdisconnect in saicdisconnectlist)
            {
               SAICDisconnect(saicdisconnect);
            }
         }
      }
   }
}