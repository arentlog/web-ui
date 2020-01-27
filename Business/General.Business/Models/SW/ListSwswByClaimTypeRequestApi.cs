using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SW
{
   public class ListSwswByClaimTypeRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string claimtype { get; set; }
   }
}