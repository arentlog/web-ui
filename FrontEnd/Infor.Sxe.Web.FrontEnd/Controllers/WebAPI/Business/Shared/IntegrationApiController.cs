using System.Web.Http;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   [RoutePrefix("api/shared/integration")]
   public class IntegrationApiController : ApiControllerBase
   {
      private readonly IIntegrationService integrationService;

      public IntegrationApiController(IIntegrationService integrationService)
      {
         this.integrationService = integrationService;
      }

      [HttpPost]
      [Route("startMingleWorkflow")]
      public MingleWorkflowResponse startMingleWorkflow(MingleWorkflowRequest mingleWorkflowRequest)
      {
         return this.integrationService.StartMingleWorkflow(mingleWorkflowRequest);
      }

      [HttpPost]
      [Route("idm/items/getimageurl")]
      public GetImageUrlResponseWrapper GetImageUrl(GetImageUrlRequestWrapper getImageUrlRequestWrapper)
      {
         return this.integrationService.GetImageUrl(getImageUrlRequestWrapper);
      }

      [HttpGet]
      [Route("idm/items/clearcache")]
      public void ClearCache(string repositoryName = "")
      {
         this.integrationService.ClearRepository(repositoryName);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.integrationService?.Dispose();
         base.Dispose(true);
      }
   }
}