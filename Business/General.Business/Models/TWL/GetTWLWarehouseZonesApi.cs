using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLWarehouseZonesApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
      [StringValidation]
      public string whNum { get; set; }
      [StringValidation]
      public string searchType { get; set; }
      [StringValidation]
      public string keyField { get; set; }
      [StringValidation]
      public string whZone { get; set; }
   }
}