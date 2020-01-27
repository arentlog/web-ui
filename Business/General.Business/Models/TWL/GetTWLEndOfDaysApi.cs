using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLEndOfDaysApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string recType { get; set; }
   }
}