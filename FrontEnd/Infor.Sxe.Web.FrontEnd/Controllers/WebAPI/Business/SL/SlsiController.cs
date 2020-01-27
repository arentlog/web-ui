using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsi;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SL
{
   [RoutePrefix("api/sl/slsi")]
   public class SlsiController : ApiControllerBase
   {
      private readonly ISlsiService slsiService;

      public SlsiController(ISlsiService slsiService)
      {
         this.slsiService = slsiService;
      }

      [HttpGet]
      [Route("getlist")]
      public IEnumerable<Slsi> GetListAll(int batchsize = 0, string fldlist = "")
      {
         return this.slsiService.GetListAll(batchsize, fldlist);
      }

      [HttpPost]
      [Route("getslsilistbyimptypebegins")]

      public IEnumerable<Slsi> GetSlsiListByImpTypeBegins(GetSlsiListByImpTypeBeginsRequestApi GetSlsiListByImpTypeBeginsRequestApi)
      {
         return this.slsiService.GetSlsiListByImpTypeBegins(GetSlsiListByImpTypeBeginsRequestApi);
      }

      [HttpPost]
      [Route("getslsilistbyimporttypedesc")]

      public IEnumerable<Slsi> GetSlsiListByImportTypeDesc(GetSlsiListByImportTypeDescRequestApi GetSlsiListByImportTypeDescRequestApi)
      {
         return this.slsiService.GetSlsiListByImportTypeDesc(GetSlsiListByImportTypeDescRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slsiService?.Dispose();
         base.Dispose(true);
      }
   }
}