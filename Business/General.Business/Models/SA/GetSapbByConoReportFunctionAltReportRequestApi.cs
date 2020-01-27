using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSapbByConoReportFunctionAltReportRequestApi : FetchWhereRequestBase
   {
      public int cono { get; set; }

      [StringValidation]
      public string currproc { get; set; }

      [StringValidation]
      public string altproc { get; set; }
   }
}