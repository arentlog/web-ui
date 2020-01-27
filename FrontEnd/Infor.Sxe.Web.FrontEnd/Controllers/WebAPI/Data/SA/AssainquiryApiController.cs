using System.Collections.Generic;
using System.Web.Http;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Data.SA
{
   using Sxe.SA.Data.Models.Pdssaicdisconnect;

   public partial class AssainquiryApiController
   {
      [Route("saiclistdisconnect")]
      [HttpPost]
      public void SAICListDisconnect(List<Saicdisconnect> saicdisconnectlist)
      {
         this.repository.SAICListDisconnect(saicdisconnectlist);
      }
   }
}