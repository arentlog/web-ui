using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.Shared
{
   public class GetAuthorizationPointsApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string ourproc { get; set; }

      [StringValidation]
      public string trmgrlang { get; set; }
   }
}