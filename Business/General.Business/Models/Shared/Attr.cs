using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Attr
   {
      [StringValidation]
      public string name { get; set; }
      [StringValidation]
      public string type { get; set; }
      [StringValidation]
      public string qual { get; set; }
      [StringValidation]
      public string value { get; set; }
   }
}