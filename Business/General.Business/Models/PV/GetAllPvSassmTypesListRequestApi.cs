using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class GetAllPvSassmTypesListRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string typeCode { get; set; }
   }
}
