using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsshpmst;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/shpmst")]
   public class ShpmstController : ApiControllerBase
   {
      private readonly IShpmstService shpmstService;

      public ShpmstController(IShpmstService shpmstService)
      {
         this.shpmstService = shpmstService;
      }

      [HttpPost]
      [Route("gettwlShpmst")]
      public IEnumerable<Shpmst> GetTWLShpmst(GetTWLShpmstApi getTWLShpmstApi)
      {
         return this.shpmstService.GetTWLShpmst(getTWLShpmstApi);
      }

      [HttpGet]
      [Route("gettwlShpmst/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{carrierId:maxLength(16)}/{manifestId:int}")]
      public IEnumerable<Shpmst> GetTWLShpmst(string coNum, string whNum, string carrierId, int manifestId, int batchsize = 0, string fldlist = "")
      {
         var getTWLShpmstApi = new GetTWLShpmstApi()
         {
            coNum = coNum,
            whNum = whNum,
            carrierId = carrierId,
            manifestId = manifestId,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.shpmstService.GetTWLShpmst(getTWLShpmstApi);
      }

      [HttpGet]
      [Route("gettwlShpmst/{coNum:maxLength(4)}/{whNum:maxLength(4)}/{manifestId:int}")]
      public IEnumerable<Shpmst> GetTWLShpmst(string coNum, string whNum, int manifestId, int batchsize = 0, string fldlist = "")
      {
         var getTWLShpmstApi = new GetTWLShpmstApi()
         {
            coNum = coNum,
            whNum = whNum,
            manifestId = manifestId,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.shpmstService.GetTWLShpmst(getTWLShpmstApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.shpmstService?.Dispose();
         base.Dispose(true);
      }
   }
}