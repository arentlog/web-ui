using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssassr;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sassr")]
   public class SassrController : ApiControllerBase
   {
      private readonly ISassrService sassrService;

      public SassrController(ISassrService sassrService)
      {
         this.sassrService = sassrService;
      }

      [HttpPost]
      [Route("getsassrbykeys")]

      public IEnumerable<Sassr> GetSasrDetails(GetSassrByKeysRequestApi getSassrByKeysRequestApi)
      {
         return this.sassrService.GetSassrByKeys(getSassrByKeysRequestApi);
      }

      [HttpPost]
      [Route("listsassrsbykeys")]

      public IEnumerable<Sassr> ListSassrsByKeys(ListSassrsByKeysRequestApi criteria)
      {
         return this.sassrService.ListSassrsByKeys(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sassrService?.Dispose();
         base.Dispose(true);
      }
   }
}