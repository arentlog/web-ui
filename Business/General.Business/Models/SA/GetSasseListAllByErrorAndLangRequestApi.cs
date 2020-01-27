using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSasseListAllByErrorAndLangRequestApi : FetchWhereRequestBase
   {
      public int error { get; set; }

      [StringValidation]
      public string langcd { get; set; }
   }
}