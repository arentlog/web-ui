using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.SA
{
   public class GetSastpListRequestApi : FetchWhereRequestBase
   {
      public int processno { get; set; }
   }
}
