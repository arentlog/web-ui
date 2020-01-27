using System.Web.Http;

using Infor.Sxe.PV.Data.Models.PdspvUser;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.PV
{
   public partial class PvUserApiController
   {
      [HttpGet]
      [Route("getbypkwithcono")]
      public PvUser GetWithCono(int cono, string oper2 = "", string fldlist = "")
      {
         return this.repository.Get(cono, oper2, 1, fldlist);
      }
   }
}