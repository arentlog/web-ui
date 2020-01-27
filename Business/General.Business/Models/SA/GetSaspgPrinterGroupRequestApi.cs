using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSaspgPrinterGroupRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string group { get; set; }
   }
}