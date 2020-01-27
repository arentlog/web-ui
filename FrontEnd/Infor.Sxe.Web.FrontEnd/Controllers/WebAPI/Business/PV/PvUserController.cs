using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvUser;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvuser")]
   public class PvUserController : ApiControllerBase
   {
      private readonly IPvUserService pvUserServiceService;

      public PvUserController(IPvUserService pvUserServiceService)
      {
         this.pvUserServiceService = pvUserServiceService;
      }

      [HttpPost]
      [Route("getlistbykeys")]
      public IEnumerable<PvUser> GetListByKeys(GetPvUserListByKeysRequestApi criteria)
      {
         return this.pvUserServiceService.GetPvUserListByKeys(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvUserServiceService?.Dispose();
         base.Dispose(true);
      }
   }
}