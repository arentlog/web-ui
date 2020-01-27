using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.WT
{
   public class GetWterahListByShipFmWhseShipToWhseRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string shipfmwhse { get; set; }

      [StringValidation]
      public string shiptowhse { get; set; }
   }
}