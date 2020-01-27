using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SL
{
   public class GetSlsnListByKeysRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string imptype { get; set; }

      [StringValidation]
      public string vendcd { get; set; }

      [StringValidation]
      public string linecd { get; set; }
   }
}