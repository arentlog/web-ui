using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.IC
{
   public class IcsepsGetListByPkRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string whse { get; set; } 
      public int runno { get; set; }
      [StringValidation]
      public string prod { get; set; }
      [StringValidation]
      public string serialno { get; set; }
      public bool unavailfl { get; set; }
   }
}