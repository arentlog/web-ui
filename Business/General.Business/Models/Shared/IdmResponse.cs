using System.Collections.Generic;
using System.Linq;

namespace General.Business.Models.Shared
{
   public class IdmResponse
   {
      public Items items { get; set; }

      public List<GetImageUrlResponse> ReturnImageUrl(List<GetImageUrlRequest> requests, int validMinutes)
      {
         return requests.Select(request => new GetImageUrlResponse
         {
            Key = request.Key,
            ImageType = request.ImageType,
            Url = this.items.ReturnUrl(request.Key, request.ImageType),
            ValidMinutes = validMinutes
         }).ToList();
      }
   }
}