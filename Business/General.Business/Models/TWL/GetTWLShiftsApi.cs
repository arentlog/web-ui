using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.TWL
{
   public class GetTWLShiftsApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string coNum { get; set; }
      [StringValidation]
      public string whNum { get; set; }
      public int shfNum { get; set; }
   }
}