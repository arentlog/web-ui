using System.Collections.Generic;
using Infor.Sxe.OE.Data.Models.Pdsoeehp;

namespace Infor.Sxe.OE.Data.Repositories
{
   public partial class OeehpRepository
   {
      public IEnumerable<Oeehp> GetOeehpListByOrderTyNoSuf(int cono, string orderTy, int orderNo, int orderSuf, int batchsize, string fldList)
      {
         return this.adapter.GetOeehpListByOrderTyNoSuf(cono, orderTy, orderNo, orderSuf, batchsize, fldList);
      }
   }
}