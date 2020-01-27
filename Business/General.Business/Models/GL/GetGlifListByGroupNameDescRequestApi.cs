using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.GL
{
   public class GetGlifListByGroupNameDescRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string groupnm { get; set; }

      [StringValidation]
      public string gltitle { get; set; }
   }
}