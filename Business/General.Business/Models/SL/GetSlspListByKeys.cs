using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SL
{
   public class GetSlspListByKeysRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string imptype { get; set; }

      [StringValidation]
      public string slgroup { get; set; }

      [StringValidation]
      public string whse { get; set; }
   }
}