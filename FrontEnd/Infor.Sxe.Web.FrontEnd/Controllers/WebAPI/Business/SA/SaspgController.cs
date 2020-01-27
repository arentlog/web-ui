using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssaspg;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/saspg")]
   public class SaspgController : ApiControllerBase
   {
      private readonly ISaspgService saspgService;

      public SaspgController(ISaspgService saspgService)
      {
         this.saspgService = saspgService;
      }

      [HttpPost]
      [Route("getsaspgprintergroup")]
      public IEnumerable<Saspg> GetSaspgPrinterGroup(GetSaspgPrinterGroupRequestApi getSaspgPrinterGroupRequestApi)
      {
         return this.saspgService.GetSaspgPrinterGroup(getSaspgPrinterGroupRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.saspgService?.Dispose();
         base.Dispose(true);
      }
   }
}