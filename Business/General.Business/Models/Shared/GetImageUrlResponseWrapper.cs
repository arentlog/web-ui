using System.Collections.Generic;

namespace General.Business.Models.Shared
{
   public class GetImageUrlResponseWrapper
   {
      public bool InError { get; set; }

      public bool RepositoryFound { get; set; }

      public List<GetImageUrlResponse> GetImageUrlResponse { get; set; }
   }
}