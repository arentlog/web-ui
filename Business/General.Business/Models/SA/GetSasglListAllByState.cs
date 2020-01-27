using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSasglListAllByStateRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string state { get; set; }
      
   }
}