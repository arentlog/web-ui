using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PD
{
   public class GetPdscListByWhseRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; }
   }
}