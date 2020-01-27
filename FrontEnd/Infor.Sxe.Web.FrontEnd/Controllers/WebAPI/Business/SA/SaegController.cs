using System.Web.Http;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;

using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.SA
{
   [RoutePrefix("api/sa/saeg")]
   public class SaegController : ApiControllerBase
   {
      private readonly ISaegService saegService;

      public SaegController(ISaegService saegService)
      {
         this.saegService = saegService;
      }

      [HttpPost]
      [Route("deletesaeggroupsbyoper")]
      public void DeleteSaegGroupsByOper(DeleteSaegGroupsByOperRequestApi deleteSaegGroupsByOperRequestApi)
      {
         this.saegService.DeleteSaegGroupsByOper(deleteSaegGroupsByOperRequestApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.saegService?.Dispose();
         base.Dispose(true);
      }
   }
}