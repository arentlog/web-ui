using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLComdetInterfacesApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string recordType { get; set; }
      [StringValidation]
      public string version { get; set; }
   }
}