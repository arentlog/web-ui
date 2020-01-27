using System.Collections.Generic;
using System.Web.Http;
using Infor.Sxe.SA.Data.Models;
using Infor.Sxe.SA.Data.Models.Pdssasogh;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{
   public partial class SasoghApiController
   {
      [HttpPost]
      [Route("lookup")]
      public IEnumerable<Sasogh> Lookup(Sasoghlookupcriteria sasoghlookupcriteria)
      {
         return this.repository.GetSasoghListByName(0, sasoghlookupcriteria.groupname ?? string.Empty, sasoghlookupcriteria.recordcountlimit, string.Empty);
      }
   }
}