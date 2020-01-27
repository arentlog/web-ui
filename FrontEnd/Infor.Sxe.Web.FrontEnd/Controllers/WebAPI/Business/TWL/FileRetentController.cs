using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsfileRetent;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/fileretent")]
   public class FileRetentController : ApiControllerBase
   {
      private readonly IFileRetentService fileRetentService;

      public FileRetentController(IFileRetentService fileRetentService)
      {
         this.fileRetentService = fileRetentService;
      }

      [HttpPost]
      [Route("gettwlfileretentions")]
      public IEnumerable<FileRetent> GetTWLFileRetentions(GetTWLFileRetentionsApi getTWLFileRetentionsApi)
      {
         return this.fileRetentService.GetTWLFileRetentions(getTWLFileRetentionsApi);
      }

      [HttpGet]
      [Route("gettwlfileretentions/{fileName:maxLength(110)}")]
      public IEnumerable<FileRetent> GetTWLFileRetentions(string fileName, int batchsize = 0, string fldlist = "")
      {
         var getTWLFileRetentionsApi = new GetTWLFileRetentionsApi()
         {
            fileName = fileName,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.fileRetentService.GetTWLFileRetentions(getTWLFileRetentionsApi);
      }

      [HttpGet]
      [Route("gettwlfileretentions")]
      public IEnumerable<FileRetent> GetTWLFileRetentions(int batchsize = 0, string fldlist = "")
      {
         var getTWLFileRetentionsApi = new GetTWLFileRetentionsApi()
         {
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.fileRetentService.GetTWLFileRetentions(getTWLFileRetentionsApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.fileRetentService?.Dispose();
         base.Dispose(true);
      }
   }
}