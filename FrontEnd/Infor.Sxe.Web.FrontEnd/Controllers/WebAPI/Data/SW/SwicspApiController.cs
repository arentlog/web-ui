using Infor.Sxe.SW.Data.Models.Pdsswicsp;
using System.Web.Http;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SW
{
   public partial class SwicspApiController
   {
      [HttpGet]
      [Route("getbyprodwithstatusfl/{prod:maxLength(100)}/{setupfl:maxLength(4)}")]
      public Swicsp GetByProdWithStatusFl(string prod, string setupfl, int batchsize = 0, string fldlist = "")
      {
         return this.repository.GetByProdWithStatusFl(0, prod, setupfl, batchsize, fldlist);
      }
   }
}