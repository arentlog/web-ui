using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PO
{
   public class GetPoerahListByVendWhseProdLineRequestApi : FetchWhereRequestBase
   {
      public decimal vendno { get; set; }

      [StringValidation]
      public string whse { get; set; }

      [StringValidation]
      public string prodline { get; set; }
   }
}