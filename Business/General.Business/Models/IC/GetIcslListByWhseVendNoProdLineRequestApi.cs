using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class GetIcslListByWhseVendNoProdLineRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; }
	  
      public decimal vendno { get; set; }

      [StringValidation]
      public string prodline { get; set; }
   }
}