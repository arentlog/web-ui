using Newtonsoft.Json;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class GetImageUrlResponse
   {
      [StringValidation]
      public string ImageType { get; set; }

      [StringValidation]
      public string Key { get; set; }

      [StringValidation]
      public string Url { get; set; }

      public int ValidMinutes { get; set; }

      [StringValidation,JsonIgnore]
      public string CombinedKey => $"{this.ImageType}|{this.Key}";
   }
}