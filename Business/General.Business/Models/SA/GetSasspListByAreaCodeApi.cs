using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSasspListByAreaCodeRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string areacd { get; set; }
   }
}