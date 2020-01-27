using System;
using General.Business.Models.Shared;

namespace General.Business.Interfaces.Shared
{
   public interface IIntegrationService : IDisposable
   {
      GetImageUrlResponseWrapper GetImageUrl(GetImageUrlRequestWrapper getImageUrlRequestWrapper);

      void ClearRepository(string repositoryName);

      MingleWorkflowResponse StartMingleWorkflow(MingleWorkflowRequest req);
   }
}