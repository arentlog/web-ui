using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class GetPvUserListByKeysRequestApi : FetchWhereRequestBase
   {
      public int cono { get; set; }

      [StringValidation]
      public string oper2 { get; set; }

      [StringValidation]
      public string userName { get; set; }

      [StringValidation]
      public string dept { get; set; }
   }
}