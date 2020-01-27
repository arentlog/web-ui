using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SM
{
   public class GetSmsmesRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string commtype { get; set; }

      [StringValidation]
      public string slsrep { get; set; }
   }
}