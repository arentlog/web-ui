using System.Web.Http;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.Shared
{
   using Sxe.Shared.Data.Models.Pdscret;
   public partial class CretApiController
   {
      [HttpGet]
      [Route("getbyvendno")]
      public Cret Get(int bankno = 0, decimal checkno = 0, int ckrectype = 0, decimal vendno = 0, string fldlist = "")
      {
         return this.repository.Get(0, bankno, checkno, ckrectype, vendno, 1, fldlist);
      }
   }
}