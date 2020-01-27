using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class GetIcsehListAllByMSDSSheetNoAndLangcdRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string msdssheetno { get; set; }

      [StringValidation]
      public string langcd { get; set; }
   }
}