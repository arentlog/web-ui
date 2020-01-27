using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetCompanyLookupRequestApi : FetchWhereRequestBase
   {
      public int cono { get; set; }

      [StringValidation]
      public string conm { get; set; }
   }
}