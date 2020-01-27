using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SM
{
   public class GetSmsnListBySalesRepAndNameRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string slsrep { get; set; }

      [StringValidation]
      public string slsrepboth { get; set; }

      [StringValidation]
      public string name { get; set; }
   }
}