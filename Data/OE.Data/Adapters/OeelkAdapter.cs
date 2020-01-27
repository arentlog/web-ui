using System.Collections.Generic;
using Infor.Sxe.OE.Data.Models.Pdsoeelk;
using ServiceInterfaceClient.Extensions;
using System.Text;

namespace Infor.Sxe.OE.Data.Adapters
{
   public partial class OeelkAdapter
   {
      public IEnumerable<Oeelk> GetOeelkNoSeqno(int cono, string ordertype, int orderno, int ordersuf, int lineno, int batchsize, string fldList)
      {
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeelk.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (ordertype != null)
         {
            sb.AppendFormatWithEscape(" AND oeelk.ordertype = '{0}'", ordertype);
         }
         sb.AppendFormatWithEscape(" AND oeelk.orderno = {0}", orderno);
         sb.AppendFormatWithEscape(" AND oeelk.ordersuf = {0}", ordersuf);
         sb.AppendFormatWithEscape(" AND oeelk.lineno = {0}", lineno);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }
   }
}