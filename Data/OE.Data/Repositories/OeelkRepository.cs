using System.Collections.Generic;
using Infor.Sxe.OE.Data.Models.Pdsoeelk;

namespace Infor.Sxe.OE.Data.Repositories
{
   public partial class OeelkRepository
   {
      public IEnumerable<Oeelk> GetOeelkNoSeqno(int cono, string ordertype, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         return this.adapter.GetOeelkNoSeqno(cono, ordertype, orderno, ordersuf, lineno, batchsize, fldList);
      }
   }
}