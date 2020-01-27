using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SL
{
   public class GetSlsiListByImportTypeDescRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string imptype { get; set; }
      [StringValidation]
      public string impdescrip { get; set; }
   }
}