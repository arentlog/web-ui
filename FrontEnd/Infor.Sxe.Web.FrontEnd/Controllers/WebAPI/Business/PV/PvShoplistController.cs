using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvShoplist;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvshoplist")]
   public class PvShoplistController : ApiControllerBase
   {
      private readonly IPvShoplistService pvShoplistServiceService;

      public PvShoplistController(IPvShoplistService pvShoplistServiceService)
      {
         this.pvShoplistServiceService = pvShoplistServiceService;
      }

      [HttpPost]
      [Route("getpvshoplistbyoper")]
      public IEnumerable<PvShoplist> GetPvShoplistByOper(GetPvShoplistByOperRequestApi criteria)
      {
         return this.pvShoplistServiceService.GetPvShoplistByOper(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvShoplistServiceService?.Dispose();
         base.Dispose(true);
      }
   }
}