using System;
using System.Collections.Generic;
using General.Business.Models.PO;
using Infor.Sxe.PO.Data.Models.Pdspoeral;

namespace General.Business.Interfaces.PO
{
   public interface IPoeralService : IDisposable
   {
      IEnumerable<Poeral> GetPoeralByReportNoLineNoSeqNo(GetPoeralByReportNoLineNoSeqNoRequestApi getPoeralByReportNoLineNoSeqNoRequestApi);
   }
}