using System.Collections.Generic;

namespace Infor.Sxe.SA.Data.Repositories
{
   using Sxe.SA.Data.Models.Pdssaicdisconnect;
   public partial class AssainquiryRepository
   {
      public void SAICListDisconnect(IEnumerable<Saicdisconnect> saicdisconnectlist)
      {
         this.adapter.SAICListDisconnect(saicdisconnectlist);
      }
   }
}