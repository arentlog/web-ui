using System.Collections.Generic;
using System.Web.Http;
using Infor.Sxe.SA.Data.Models.Pdssasgm;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{
   public partial class SasgmApiController
    {
        [HttpGet]
        [Route("getlistbyquery/{recty:int}/{taxgroup:int}")]
        public IEnumerable<Sasgm> GetListByQuery(int recty, int taxgroup, string statecd = "", string countycd = "", string citycd = "", string othercd = "", int batchsize = 0, string fldlist = "")
        {
            return this.repository.GetListByQuery(recty, taxgroup, statecd, countycd, citycd, othercd, 0, batchsize, fldlist);
        }
    }
}