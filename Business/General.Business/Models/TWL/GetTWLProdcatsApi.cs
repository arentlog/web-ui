using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLProdcatsApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
      [StringValidation]
      public string whNum { get; set; }
      [StringValidation]
      public string prodcat { get; set; }
   }
}