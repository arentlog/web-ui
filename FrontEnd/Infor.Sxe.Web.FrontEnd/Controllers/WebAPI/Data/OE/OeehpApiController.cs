using System.Collections.Generic;
using System.Web.Http;
using Infor.Sxe.OE.Data.Models.Pdsoeehp;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.OE
{
   public partial class OeehpApiController
   {
      [HttpGet]
      [Route("getoeehplistbyordertynosuf/{orderty:maxLength(4)}/{orderno:int}/{ordersuf:int}")]
      public IEnumerable<Oeehp> GetOeehpListByOrderTyNoSuf(string orderty, int orderno, int ordersuf, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetOeehpListByOrderTyNoSuf(0, orderty, orderno, ordersuf, batchsize, fldlist);
      }
   }
}