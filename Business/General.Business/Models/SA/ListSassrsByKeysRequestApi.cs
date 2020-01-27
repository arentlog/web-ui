using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class ListSassrsByKeysRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string currproc { get; set; }

      [StringValidation]
      public string trmgrlang { get; set; }
   }
}