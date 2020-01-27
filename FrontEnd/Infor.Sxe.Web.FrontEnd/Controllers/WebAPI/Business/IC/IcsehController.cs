using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicseh;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/icseh")]
   public class IcsehController : ApiControllerBase
   {
      private readonly IIcsehService icsehService;

      public IcsehController(IIcsehService icsehService)
      {
         this.icsehService = icsehService;
      }

      [HttpPost]
      [Route("geticsehlistallbymsdssheetnoandlangcd")]
      public IEnumerable<Icseh> GetIcsehListAllByMSDSSheetNoAndLangcd(GetIcsehListAllByMSDSSheetNoAndLangcdRequestApi getIcsehListAllByMSDSSheetNoAndLangcdRequestApi)
      {
         return this.icsehService.GetIcsehListAllByMSDSSheetNoAndLangcd(getIcsehListAllByMSDSSheetNoAndLangcdRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icsehService?.Dispose();
         base.Dispose(true);
      }
   }
}