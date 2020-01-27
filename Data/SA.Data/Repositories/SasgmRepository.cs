using System.Collections.Generic;
using Infor.Sxe.SA.Data.Models.Pdssasgm;

namespace Infor.Sxe.SA.Data.Repositories
{
   public partial class SasgmRepository
    {
        public IEnumerable<Sasgm> GetListByQuery(int recty, int taxgroup, string statecd, string countycd, string citycd, string othercd, int cono, int batchsize, string fldList)
        {
            return this.adapter.GetListByQuery(recty, taxgroup, statecd, countycd, citycd, othercd, cono, batchsize, fldList);
        }
    }
}
