using System.Collections.Generic;
using System.Text;
using Infor.Sxe.SA.Data.Models.Pdssasogh;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.SA.Data.Adapters
{
   public partial class SasoghAdapter
   {
      public IEnumerable<Sasogh> GetSasoghListByName(int cono, string groupName, int batchsize, string fldList)
      {
         cono = cono == 0 ? this.connection.CompanyNumber : cono;  
         var where = new StringBuilder();
         where.AppendFormat("sasogh.cono = {0}", cono);
         if (!string.IsNullOrEmpty(groupName))
         {
            where.AppendFormatWithEscape(" AND sasogh.groupnm = '{0}'", groupName);
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }
   }
}