using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class MenuDetailsModel
   {
      [StringValidation]
      public string FunctionName { get; set; }
      [StringValidation]
      public string MenuTitle { get; set; }
   }
}