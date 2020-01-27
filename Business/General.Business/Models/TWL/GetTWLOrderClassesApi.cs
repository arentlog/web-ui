using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLOrderClassesApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string code { get; set; }
      [StringValidation]
      public string name { get; set; }
   }
}