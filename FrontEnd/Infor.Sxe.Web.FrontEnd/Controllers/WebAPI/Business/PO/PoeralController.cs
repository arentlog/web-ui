using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.PO;
using General.Business.Models.PO;
using Infor.Sxe.PO.Data.Models.Pdspoeral;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.PO
{
   [RoutePrefix("api/po/poeral")]
   public class PoeralController : ApiControllerBase
   {
      private readonly IPoeralService poeralService;

      public PoeralController(IPoeralService poeralService)
      {
         this.poeralService = poeralService;
      }

      [HttpPost]
      [Route("getpoeralbyreportnolinenoseqno")]
      public IEnumerable<Poeral> GetPoeralByReportNoLineNoSeqNo(GetPoeralByReportNoLineNoSeqNoRequestApi getPoeralByReportNoLineNoSeqNoRequestApi)
      {
         return this.poeralService.GetPoeralByReportNoLineNoSeqNo(getPoeralByReportNoLineNoSeqNoRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.poeralService?.Dispose();
         base.Dispose(true);
      }
   }
}