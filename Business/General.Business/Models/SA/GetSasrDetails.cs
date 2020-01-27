using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSasrDetailsRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; }

      [StringValidation]
      public string shipvia { get; set; }

      [StringValidation]
      public string zone { get; set; }
   }
}