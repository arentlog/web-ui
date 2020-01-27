using System.Collections.Generic;
using Infor.Sxe.OE.Data.Models.Pdsoeelk;
using System.Web.Http;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.OE
{
   public partial class OeelkApiController
   {
      [HttpGet]
      [Route("getoeelknoseqno/{ordertype:maxLength(4)}/{orderno:int}/{ordersuf:int}/{lineno:int}")]
      public IEnumerable<Oeelk> GetOeelkNoSeqno(string ordertype, int orderno, int ordersuf, int lineno, string fldlist = "")
      {
         return this.repository.GetOeelkNoSeqno(0, ordertype, orderno, ordersuf, lineno, 1, fldlist);
      }
   }
}