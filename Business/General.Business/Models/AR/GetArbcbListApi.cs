using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.AR
{
   public class GetArbcbListRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string batch { get; set; }

      [StringValidation]
      public string operinit { get; set; }
   }
}