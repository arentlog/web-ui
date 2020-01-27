using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.SA
{
   public class SaeaGetListNameDescRequestApi
   {
      [StringValidation]
      public string cListType { get; set; }

      [StringValidation]
      public string cListValue { get; set; }

      [StringValidation]
      public string cListValue2 { get; set; }
   }
}