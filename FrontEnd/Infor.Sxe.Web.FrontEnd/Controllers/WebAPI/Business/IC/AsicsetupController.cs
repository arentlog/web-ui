using System.Web.Http;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.IC
{
   [RoutePrefix("api/ic/asicsetup")] 
   public class AsicsetupController : ApiControllerBase
   {
      private readonly IAsicsetupService asicsetupService;

      public AsicsetupController(IAsicsetupService asicsetupService)
      {
         this.asicsetupService = asicsetupService;
      }

      [HttpPost]
      [Route("icsdpsavepw")] 
      public void IcsdpSavePw(IcsdpSavePwRequestApi criteria)
      {
         this.asicsetupService.IcsdpSavePw(criteria);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.asicsetupService?.Dispose();
         base.Dispose(true);
      }
   }
}