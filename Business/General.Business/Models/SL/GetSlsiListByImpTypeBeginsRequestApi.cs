using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SL
{
   public class GetSlsiListByImpTypeBeginsRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string imptype { get; set; }
   }
}