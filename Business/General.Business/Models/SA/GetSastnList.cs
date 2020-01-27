using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSastnListRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string codeiden { get; set; }

      [StringValidation]
      public string codeval { get; set; }

   }
}