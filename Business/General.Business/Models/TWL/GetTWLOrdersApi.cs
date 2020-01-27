using System;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLOrdersApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
      [StringValidation]
      public string whNum { get; set; }
      [StringValidation]
      public string orderBegins { get; set; }
      [StringValidation]
      public string orderSuffixBegins { get; set; }
      public DateTime? orderDateFrom { get; set; }
      public DateTime? orderDateTo { get; set; }
      [StringValidation]
      public string orderStatus { get; set; }
      [StringValidation]
      public string carrierBegins { get; set; }
   }
}