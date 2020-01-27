using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.WL
{
   public class GetWlalByLocationDescriptionApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string wlloc { get; set; }

      [StringValidation]
      public string descrip { get; set; }
   }
}