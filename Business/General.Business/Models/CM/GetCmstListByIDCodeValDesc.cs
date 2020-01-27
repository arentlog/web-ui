using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.CM
{
   public class GetCmstListByIDCodeValDescRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string codeiden { get; set; }

      [StringValidation]
      public string codeval { get; set; }

      [StringValidation]
      public string descrip { get; set; }

      [StringValidation]
      public string slsrep { get; set; }
   }
}