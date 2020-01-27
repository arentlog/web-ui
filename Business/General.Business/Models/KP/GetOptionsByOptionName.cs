using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.KP
{
   public class GetOptionsByOptionNameRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string optionname { get; set; }
   }
}