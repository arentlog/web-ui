using System.Text;
using Infor.Sxe.SW.Data.Models.Pdsswicsp;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.SW.Data.Adapters
{
   public partial class SwicspAdapter
   {
      public Swicsp GetByProdWithStatusFl(int cono, string prod, string setupfl, int batchsize, string fldList)
      {
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.Append($"swicsp.cono = {cono}");
         if (prod != null)
         {
            sb.AppendFormatWithEscape(" AND swicsp.prod = '{0}'", prod);
         }
         if (setupfl != null)
         {
            sb.AppendFormatWithEscape(" AND swicsp.setupfl = '{0}'", setupfl);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
   }
}