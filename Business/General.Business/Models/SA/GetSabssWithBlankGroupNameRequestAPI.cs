using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSabssWithBlankGroupNameRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string batchname { get; set; }

      [StringValidation]
      public string modulename { get; set; }
   }
}