using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsprintmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/printmst")]
   public class PrintmstController : ApiControllerBase
   {
      private readonly IPrintmstService printmstService;

      public PrintmstController(IPrintmstService printmstService)
      {
         this.printmstService = printmstService;
      }

      [HttpPost]
      [Route("gettwlprinters")]
      public IEnumerable<Printmst> GetTWLPrinters(GetTWLPrintersApi getTWLPrintersApi)
      {
         return this.printmstService.GetTWLPrinters(getTWLPrintersApi);
      }

      [HttpGet]
      [Route("gettwlprinters/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{printerId:maxLength(25)}")]
      public IEnumerable<Printmst> GetTWLPrinters(string coNum, string whNum, string printerId, int batchsize = 0, string fldlist = "")
      {
         var getTWLPrintersApi = new GetTWLPrintersApi()
         {
            coNum = coNum,
            whNum = whNum,
            printerId = printerId,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.printmstService.GetTWLPrinters(getTWLPrintersApi);
      }

      [HttpGet]
      [Route("gettwlprinters/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Printmst> GetTWLPrinters(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLPrintersApi = new GetTWLPrintersApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.printmstService.GetTWLPrinters(getTWLPrintersApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.printmstService?.Dispose();
         base.Dispose(true);
      }
   }
}