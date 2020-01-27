using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class SupportedRespository
   {
      [StringValidation]
      public string IdmEntityType { get; set; }

      [StringValidation]
      public string IdmRepository { get; set; }

      [StringValidation]
      public string Formatter { get; set; }
   }
}