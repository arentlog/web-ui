using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLUnitOfMeasuresApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string uom { get; set; }
    }
}