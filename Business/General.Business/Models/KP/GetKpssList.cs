using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.KP
{
   public class GetKpssListRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string prod { get; set; }
   }
}