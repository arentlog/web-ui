using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSassmTypes;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PV
{
   [RoutePrefix("api/pv/pvsassmtypes")]
   public class PvSassmTypesController : ApiControllerBase
   {
      private readonly IPvSassmTypesService pvSassmTypesService;

      public PvSassmTypesController(IPvSassmTypesService pvSassmTypesService)
      {
         this.pvSassmTypesService = pvSassmTypesService;
      }

      [HttpPost]
      [Route("getallpvsassmtypeslist")]
      public IEnumerable<PvSassmTypes> GetAllPvSassmTypesList(GetAllPvSassmTypesListRequestApi criteria)
      {
         return this.pvSassmTypesService.GetAllPvSassmTypesList(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvSassmTypesService?.Dispose();
         base.Dispose(true);
      }
   }
}