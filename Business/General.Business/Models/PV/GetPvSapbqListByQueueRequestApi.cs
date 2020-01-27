using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PV
{
   public class GetPvSapbqListByQueueRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string queueName { get; set; }
   }
}