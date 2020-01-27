using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Re
   {
      [StringValidation]
      public string name { get; set; }
      [StringValidation]
      public string size { get; set; }
      [StringValidation]
      public string mimetype { get; set; }
      [StringValidation]
      public string filename { get; set; }
      [StringValidation]
      public string url { get; set; }
      [StringValidation]
      public string sha256 { get; set; }
   }
}