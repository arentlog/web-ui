using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastaz;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sastaz")]
   public class SastazController : ApiControllerBase
   {
      private readonly ISastazService sastazService;

      public SastazController(ISastazService sastazService)
      {
         this.sastazService = sastazService;
      }

      [HttpGet]
      [Route("getsastazbywhereclause")]
      public IEnumerable<Sastaz> GetSastazByWhereClause(string whereClause, int batchsize = 0, string fldlist = "")
      {
         return this.sastazService.GetSastazByWhereClause(whereClause, batchsize, fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastazService?.Dispose();
         base.Dispose(true);
      }
   }
}