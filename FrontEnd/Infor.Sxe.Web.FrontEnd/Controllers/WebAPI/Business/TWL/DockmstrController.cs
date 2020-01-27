using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsdockmstr;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/dockmstr")]
   public class DockmstrController : ApiControllerBase
   {
      private readonly IDockmstrService dockmstrService;

      public DockmstrController(IDockmstrService dockmstrService)
      {
         this.dockmstrService = dockmstrService;
      }

      [HttpPost]
      [Route("gettwldocks")]
      public IEnumerable<Dockmstr> GetTWLDocks(GetTWLDocksApi getTWLDocksApi)
      {
         return this.dockmstrService.GetTWLDocks(getTWLDocksApi);
      }

      [HttpGet]
      [Route("gettwldocks/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{dockId:maxLength(16)}")]
      public IEnumerable<Dockmstr> GetTWLDocks(string coNum, string whNum, string dockId, int batchsize = 0, string fldlist = "")
      {
         var getTWLDocksApi = new GetTWLDocksApi()
         {
            coNum = coNum,
            whNum = whNum,
            dockId = dockId,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.dockmstrService.GetTWLDocks(getTWLDocksApi);
      }

      [HttpGet]
      [Route("gettwldocks/{coNum:maxLength(4)}/{whNum:maxLength(4)}")]
      public IEnumerable<Dockmstr> GetTWLDocks(string coNum, string whNum, int batchsize = 0, string fldlist = "")
      {
         var getTWLDocksApi = new GetTWLDocksApi()
         {
            coNum = coNum,
            whNum = whNum,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.dockmstrService.GetTWLDocks(getTWLDocksApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.dockmstrService?.Dispose();
         base.Dispose(true);
      }
   }
}