using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsec;
using System.Linq;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icsec")]
   public class IcsecController : ApiControllerBase
   {
      private readonly IIcsecService icsecService;

      public IcsecController(IIcsecService icsecService)
      {
         this.icsecService = icsecService;
      }

      [HttpPost]
      [Route("geticsecsbytypeprod")]
      public IEnumerable<Icsec> GetIcsecsByTypeProd(GetIcsecsByTypeProdRequestApi getIcsecsByTypeProdRequestApi)
      {
         return this.icsecService.GetIcsecsByTypeProd(getIcsecsByTypeProdRequestApi);
      }

      [HttpPost]
      [Route("geticsecsbytypeprodaltprod")]
      public IEnumerable<Icsec> GetIcsecsByTypeProdAltProd(GetIcsecsByTypeProdAltProdRequestApi getIcsecsByTypeProdAltProdRequestApi)
      {
         return this.icsecService.GetIcsecsByTypeProdAltProd(getIcsecsByTypeProdAltProdRequestApi);
      }

      [HttpPost]
      [Route("existsbykeynoprodcustshipto")]
      public bool GetIcsecsByTypeKeyNoProdCustShipTo(GetIcsecsByTypeKeyNoProdCustShipToRequestApi getIcsecsByTypeKeyNoProdCustShipToRequestApi)
      {
         List<Icsec> icsecEntities = this.icsecService.GetIcsecsByTypeKeyNoProdCustShipTo(getIcsecsByTypeKeyNoProdCustShipToRequestApi).ToList();
         return (icsecEntities!=null && icsecEntities.Count>0);
      }     

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icsecService?.Dispose();
         base.Dispose(true);
      }
   }
}