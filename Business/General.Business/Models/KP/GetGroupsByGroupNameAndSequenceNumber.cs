using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.KP
{
   public class GetGroupsByGroupNameAndSequenceNumberRequestApi : FetchWhereRequestBase
   {
      [StringValidation]
      public string groupname { get; set; }

      public int seqno { get; set; }
   }
}