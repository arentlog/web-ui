using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLItemsApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
      [StringValidation]
      public string whNum { get; set; }
      [StringValidation]
      public string absNum { get; set; }
      [StringValidation]
      public string itemType { get; set; }
      [StringValidation]
      public string prodGrp { get; set; }
   }
}