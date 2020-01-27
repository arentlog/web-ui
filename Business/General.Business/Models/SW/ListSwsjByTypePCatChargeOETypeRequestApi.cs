using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SW
{
   public class ListSwsjByTypePCatChargeOETypeRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string jobtype { get; set; }

      [StringValidation]
      public string prodcat { get; set; }

      [StringValidation]
      public string oetype { get; set; }

      [StringValidation]
      public string warrantycd { get; set; }
   }
}