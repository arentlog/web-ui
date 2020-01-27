using System.Web.Http;
using Infor.Sxe.SA.Data.Models.Pdssasc;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{
   public partial class SascApiController
   {
      [HttpGet]
      [Route("getbypkwithcono")]
      public Sasc Get(int cono, string fldlist = "")
      {
         return this.repository.Get(cono, 1, fldlist);
      }
   }
}