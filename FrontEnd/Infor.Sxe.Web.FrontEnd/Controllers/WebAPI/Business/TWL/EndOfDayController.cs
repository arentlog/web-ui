using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsendOfDay;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.TWL
{
   [RoutePrefix("api/twl/endofday")]
   public class EndOfDayController : ApiControllerBase
   {
      private readonly IEndOfDayService endOfDayService;

      public EndOfDayController(IEndOfDayService endOfDayService)
      {
         this.endOfDayService = endOfDayService;
      }

      [HttpPost]
      [Route("gettwlendofdays")]
      public IEnumerable<EndOfDay> GetTWLEndOfDays(GetTWLEndOfDaysApi getTWLEndOfDaysApi)
      {
         return this.endOfDayService.GetTWLEndOfDays(getTWLEndOfDaysApi);
      }

      [HttpGet]
      [Route("gettwlendofdays/{recType:maxLength(16)}")]
      public IEnumerable<EndOfDay> GetTWLEndOfDays(string recType, int batchsize = 0, string fldlist = "")
      {
         var getTWLEndOfDaysApi = new GetTWLEndOfDaysApi()
         {
            recType = recType,
            batchsize = batchsize,
            fldlist = fldlist
         };
         return this.endOfDayService.GetTWLEndOfDays(getTWLEndOfDaysApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.endOfDayService?.Dispose();
         base.Dispose(true);
      }
   }
}