using System.Collections.Generic;
using System.Text;
using Infor.Sxe.OE.Data.Models.Pdsoeehp;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.OE.Data.Adapters
{
   public partial class OeehpAdapter
   {
      public IEnumerable<Oeehp> GetOeehpListByOrderTyNoSuf(int cono, string orderTy, int orderNo, int orderSuf, int batchsize, string fldList)
      {
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var where = new StringBuilder();
         where.AppendFormat("oeehp.cono = {0}", cono);
         where.AppendFormatWithEscape(" AND oeehp.orderty = '{0}'", orderTy);
         where.AppendFormat(" AND oeehp.orderno = {0}", orderNo);
         where.AppendFormat(" AND oeehp.ordersuf = {0}", orderSuf);
         return this.GetList(where.ToString(), batchsize, fldList);
      }
   }
}