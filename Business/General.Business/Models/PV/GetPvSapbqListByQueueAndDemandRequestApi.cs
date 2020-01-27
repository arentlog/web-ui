using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class GetPvSapbqListByQueueAndDemandRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string queueName { get; set; }

      [StringValidation]
      public string demand { get; set; }
   }
}