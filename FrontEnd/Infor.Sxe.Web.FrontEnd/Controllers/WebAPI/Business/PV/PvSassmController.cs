using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSassm;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvsassm")]
   public class PvSassmController : ApiControllerBase
   {
      private readonly IPvSassmService pvSassmService;

      public PvSassmController(IPvSassmService pvSassmService)
      {
         this.pvSassmService = pvSassmService;
      }

      [HttpPost]
      [Route("getprsassmforaosystem")]
      public IEnumerable<PvSassm> GetPvSassmForAoSystem(GetPvSassmForAoSystemListRequestApi criteria)
      {
         return this.pvSassmService.GetPvSassmForAoSystem(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvSassmService?.Dispose();
         base.Dispose(true);
      }
   }
}