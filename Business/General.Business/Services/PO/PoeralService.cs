using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PO;
using General.Business.Models.PO;
using Infor.Sxe.PO.Data.Models.Pdspoeral;
using Infor.Sxe.PO.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.PO
{
   public class PoeralService : ServiceBase, IPoeralService
   {
      private readonly PoeralRepository poeralRepository;

      public PoeralService(PoeralRepository poeralRepository)
      {
         this.poeralRepository = poeralRepository;
      }

      public IEnumerable<Poeral> GetPoeralByReportNoLineNoSeqNo(
         GetPoeralByReportNoLineNoSeqNoRequestApi getPoeralByReportNoLineNoSeqNoRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("poeral.cono = {0}", this.poeralRepository.Cono);
         where.AppendFormat(" and poeral.reportno = {0}", getPoeralByReportNoLineNoSeqNoRequestApi.reportno);
         where.AppendFormat(" and poeral.lineno = {0}", getPoeralByReportNoLineNoSeqNoRequestApi.lineno);
         where.AppendFormat(" and poeral.seqno = {0}", getPoeralByReportNoLineNoSeqNoRequestApi.seqno);

         return this.poeralRepository.GetList(
            where.ToString(),
            getPoeralByReportNoLineNoSeqNoRequestApi.batchsize,
            getPoeralByReportNoLineNoSeqNoRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (this.poeralRepository != null)
         {
            this.poeralRepository.Dispose();
         }
         base.Dispose(true);
      }
   }
}