using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.Shared
{
   public class GetTriggerSetupListByNameApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string triggerName { get; set; }
   }
}