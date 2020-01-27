using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SL
{
   public class GetSupplierLinkSetupForLookupRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string codeiden { get; set; }

      [StringValidation]
      public string codeval { get; set; }

      [StringValidation]
      public string descrip { get; set; }
   }
}