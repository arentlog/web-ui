using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class GetIcsecsByTypeProdAltProdRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string rectype { get; set; }

      [StringValidation]
      public string prod { get; set; }

      [StringValidation]
      public string altprod { get; set; }
   }
}