using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infor.Sxe.OE.Data.Models.Pdsoedc;

namespace Infor.Sxe.OE.Data.Repositories
{
    public partial class OedcRepository
    {
        public Oedc GetByQuery(int cono, string typecd, string key1, string key2, int batchsize, string fldList)
        {
            return this.adapter.GetByQuery(cono, typecd, key1, key2, batchsize, fldList);
        }
    }
}
