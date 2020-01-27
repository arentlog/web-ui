using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Infor.Sxe.OE.Data.Models.Pdsoedc;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.OE
{
    public partial class OedcApiController
    {
        [HttpGet]
        [Route("getbyquery/{typecd:maxLength(4)}")]
        public Oedc GetByQuery(string typecd, string key1 = "", string key2 = "", string fldlist = "")
        {
            return this.repository.GetByQuery(0, typecd, key1, key2, 1, fldlist);
        }
    }
}