using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.PO
{
   public class GetPoeralByReportNoLineNoSeqNoRequestApi : FetchWhereRequestBase
   {
      public int reportno { get; set; }
      public int lineno { get; set; }
      public int seqno { get; set; }
   }
}