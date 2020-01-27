using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.AP
{
   public class GetApsfListByTaxDetailsRequestApi : FetchWhereRequestBase
   {
      public int taxYear { get; set; }

      [StringValidation]
      public string fedTaxId { get; set; }

      [StringValidation]
      public string controlCode { get; set; }
   }
}