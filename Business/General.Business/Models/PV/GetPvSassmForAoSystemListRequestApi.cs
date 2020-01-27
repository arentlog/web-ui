using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class GetPvSassmForAoSystemListRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string menuSet { get; set; }
      [StringValidation]
      public string functionName { get; set; }
      [StringValidation]
      public string trmgrlang { get; set; }
      [StringValidation]
      public string recordtype { get; set; }
      [StringValidation]
      public string windowTitle { get; set; }
   }
}