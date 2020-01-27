using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infor.Sxe.OE.Data.Models.Pdsoedc;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.OE.Data.Adapters
{
    public partial class OedcAdapter
    {
        public Oedc GetByQuery(int cono, string typecd, string key1, string key2, int batchsize, string fldList)
        {
            var sb = new StringBuilder();
            sb.AppendFormatWithEscape("oedc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
            if (typecd != null)
            {
                sb.AppendFormatWithEscape(" AND oedc.typecd = '{0}'", typecd);
            }
            if (key1 != null)
            {
                sb.AppendFormatWithEscape(" AND oedc.key1 = '{0}'", key1);
            }
            if (key2 != null)
            {
                sb.AppendFormatWithEscape(" AND oedc.key2 = '{0}'", key2);
            }
            var where = sb.ToString();
            return this.Fetch(where, batchsize, fldList);
        }
    }
}
