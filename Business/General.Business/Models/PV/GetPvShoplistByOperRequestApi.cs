using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class GetPvShoplistByOperRequestApi : FetchWhereRequestBase
   {
      public int cono { get; set; }

      [StringValidation]
      public string oper2 { get; set; }
   }
}