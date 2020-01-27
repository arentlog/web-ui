using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.OE
{
   public class GetOedcListAllByConoAndKeyRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string typecd { get; set; }
      [StringValidation]
      public string key1 { get; set; }
      [StringValidation]
      public string key2 { get; set; }
   }
}