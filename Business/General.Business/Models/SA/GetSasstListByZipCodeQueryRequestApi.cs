using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{  
   public class GetSasstListByZipCodeQueryRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string zipcd{ get; set; }
   }
}