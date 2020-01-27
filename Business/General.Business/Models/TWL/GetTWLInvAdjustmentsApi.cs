using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLInvAdjustmentsApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
      [StringValidation]
      public string whNum { get; set; }
      [StringValidation]
      public string adjCode { get; set; }
      [StringValidation]
      public string tranTypes { get; set; }      
   }
}