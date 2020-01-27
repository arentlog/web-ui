using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class ListBySubjectRequestApi : FetchWhereRequestBase
   {
      public int cono { get; set; }

      [StringValidation]
      public string subject { get; set; }
   }
}
