using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class GetIcsecsByTypeProdRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string type { get; set; }

      [StringValidation]
      public string prod { get; set; }
   }
}