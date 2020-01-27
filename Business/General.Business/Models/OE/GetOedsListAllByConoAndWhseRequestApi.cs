using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.OE
{
   public class GetOedsListAllByConoAndWhseRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; }
   }
}
