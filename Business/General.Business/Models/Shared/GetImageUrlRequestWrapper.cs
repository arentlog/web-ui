using System.Collections.Generic;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class GetImageUrlRequestWrapper
   {
      [StringValidation]
      public string Repository { get; set; }

      public bool IgnoreCache { get; set; }

      public List<GetImageUrlRequest> GetImageUrlRequest { get; set; }
   }
}