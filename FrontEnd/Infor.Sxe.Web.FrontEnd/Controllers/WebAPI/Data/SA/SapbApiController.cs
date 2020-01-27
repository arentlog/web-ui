using System.Web.Http;
using Infor.Sxe.SA.Data.Models.Pdssapb;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{
   public partial class SapbApiController
   {
      [HttpGet]
      [Route("getbypkwithcono")]
      public Sapb GetWithCono(int cono, string reportnm = "", string fldlist = "")
      {
         return this.repository.Get(cono, reportnm, 1, fldlist);
      }
   }
}