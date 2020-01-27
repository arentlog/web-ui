using System.Collections.Generic;
using Infor.Sxe.SA.Data.Models.Pdssasogh;

namespace Infor.Sxe.SA.Data.Repositories
{
   public partial class SasoghRepository
   {
      public IEnumerable<Sasogh> GetSasoghListByName(int cono, string groupName, int batchsize, string fldList)
      {
         return this.adapter.GetSasoghListByName(cono, groupName, batchsize, fldList);
      }
   }
}