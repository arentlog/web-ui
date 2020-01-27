using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsprintmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class PrintmstService : ServiceBase, IPrintmstService
   {
      private readonly PrintmstRepository printmstRepository;

      public PrintmstService(PrintmstRepository printmstRepository)
      {
         this.printmstRepository = printmstRepository;
      }

        public IEnumerable<Printmst> GetTWLPrinters(GetTWLPrintersApi getTWLPrintersApi)
        {
            var sb = new StringBuilder();
            if (!string.IsNullOrWhiteSpace(getTWLPrintersApi.coNum))
            {
                sb.AppendFormatWithEscape("printmst.co_num = '{0}'", getTWLPrintersApi.coNum);
                if (!string.IsNullOrWhiteSpace(getTWLPrintersApi.whNum))
                {
                    sb.AppendFormatWithEscape(" AND printmst.wh_num = '{0}'", getTWLPrintersApi.whNum);
                }
                if (!string.IsNullOrWhiteSpace(getTWLPrintersApi.printerId))
                {
                    sb.AppendFormatWithEscape(" AND printmst.printer_id = '{0}'", getTWLPrintersApi.printerId);
                }
                if (!string.IsNullOrWhiteSpace(getTWLPrintersApi.printType))
                {
                    sb.AppendFormatWithEscape(" AND printmst.type = '{0}'", (getTWLPrintersApi.printType == "Label" ? "false" : "true"));
                }
            }
            var where = sb.ToString();
            return this.printmstRepository.GetList(where, getTWLPrintersApi.batchsize, getTWLPrintersApi.fldlist);
        }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.printmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}