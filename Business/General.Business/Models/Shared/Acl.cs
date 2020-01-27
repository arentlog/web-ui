using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class Acl
   {
      [StringValidation]
      public string name { get; set; }
   }
}