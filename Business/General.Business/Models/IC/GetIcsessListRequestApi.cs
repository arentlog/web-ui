using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class GetIcsessListRequestApi : FetchWhereRequestBase
   {
      public decimal vendno { get; set; }

      [StringValidation]
      public string rectype { get; set; }

      public int position { get; set; }

      [StringValidation]
      public string data { get; set; }
   }
}