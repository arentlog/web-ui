using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class GetIcamueListRequestApi : FetchWhereRequestBase
   {
      public bool activefl { get; set; }

      [StringValidation]
      public string whse { get; set; }

      [StringValidation]
      public string buyer { get; set; }

      [StringValidation]
      public string prod { get; set; }

      [StringValidation]
      public string frozentype { get; set; }

      [StringValidation]
      public string exceptlist { get; set; }
   }
}