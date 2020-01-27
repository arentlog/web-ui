using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssabs;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/sabs")]
   public class SabsController : ApiControllerBase
   {
      private readonly ISabsService sabsService;

      public SabsController(ISabsService sabsService)
      {
         this.sabsService = sabsService;
      }

      [HttpPost]
      [Route("getsabsswithblankgroupname")]
      public IEnumerable<Sabs> GetSabssWithBlankGroupName(GetSabssWithBlankGroupNameRequestApi getSabssWithBlankGroupNameRequestApi)
      {
         return this.sabsService.GetSabssWithBlankGroupName(getSabssWithBlankGroupNameRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sabsService?.Dispose();
         base.Dispose(true);
      }
   }
}