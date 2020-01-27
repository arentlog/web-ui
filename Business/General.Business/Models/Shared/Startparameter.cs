using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Startparameter
   {
      [StringValidation]
      public string Name { get; set; }
      [StringValidation]
      public string SerializedValue { get; set; }
   }
}