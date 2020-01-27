using System.Text;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.Shared.Data.Adapters
{
   using Models.Pdscret;
   public partial class CretAdapter
   {
      public Cret Get(int cono, int bankno, decimal checkno, int ckrectype, decimal vendno, int batchsize, string fldList)
      {
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("cret.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (bankno != int.MinValue)
         {
            sb.AppendFormatWithEscape(" AND cret.bankno = {0}", bankno);
         }
         if (checkno != decimal.MinValue)
         {
            sb.AppendFormatWithEscape(" AND cret.checkno = {0}", checkno);
         }
         if (ckrectype != int.MinValue)
         {
            sb.AppendFormatWithEscape(" AND cret.ckrectype = {0}", ckrectype);
         }
         if(vendno != decimal.MinValue)
         {
            sb.AppendFormatWithEscape(" AND cret.vendno = {0}", vendno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
   }
}