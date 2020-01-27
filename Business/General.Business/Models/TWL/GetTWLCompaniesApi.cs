using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLCompaniesApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
   }
}