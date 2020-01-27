using Newtonsoft.Json;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class GetImageUrlRequest
   {
      [StringValidation]
      public string ImageType { get; set; }

      [StringValidation]
      public string Key { get; set; }

      [JsonIgnore]
      public string CombinedKey => $"{this.ImageType}|{this.Key}";
   }
}