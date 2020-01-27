using System;
using System.Collections.Generic;
using System.Text;
using Infor.Sxe.SA.Data.Models.Pdssasgm;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.SA.Data.Adapters
{
   public partial class SasgmAdapter
    {
        public IEnumerable<Sasgm> GetListByQuery(int recty, int taxgroup, string statecd, string countycd, string citycd, string othercd, int cono, int batchsize, string fldList)
        {
            cono = cono == 0 ? this.connection.CompanyNumber : cono;
            var sb = new StringBuilder();
            sb.AppendFormat("sasgm.cono = {0}", cono);
            sb.AppendFormat(" AND sasgm.recty = {0}", recty);
            sb.AppendFormat(" AND sasgm.taxgroup = {0}", taxgroup);
            if (!String.IsNullOrEmpty(statecd))
            {
                sb.AppendFormatWithEscape(" AND sasgm.statecd = '{0}'", statecd);
            }
            if (!String.IsNullOrEmpty(countycd))
            {
                sb.AppendFormatWithEscape(" AND sasgm.countycd = '{0}'", countycd);
            }
            if (!String.IsNullOrEmpty(citycd))
            {
                sb.AppendFormatWithEscape(" AND sasgm.citycd = '{0}'", citycd);
            }
            if (!String.IsNullOrEmpty(othercd))
            {
                sb.AppendFormatWithEscape(" AND sasgm.othercd = '{0}'", othercd);
            }
            var where = sb.ToString();
            return this.GetList(where, batchsize, fldList);
        }
    }
}
