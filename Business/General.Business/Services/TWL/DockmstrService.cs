using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsdockmstr;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class DockmstrService : ServiceBase, IDockmstrService
   {
      private readonly DockmstrRepository dockmstrRepository;

      public DockmstrService(DockmstrRepository dockmstrRepository)
      {
         this.dockmstrRepository = dockmstrRepository;
      }

      public IEnumerable<Dockmstr> GetTWLDocks(GetTWLDocksApi getTWLDocksApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLDocksApi.coNum))
         {
            sb.AppendFormatWithEscape("dockmstr.co_num = '{0}'", getTWLDocksApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLDocksApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND dockmstr.wh_num = '{0}'", getTWLDocksApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLDocksApi.dockId))
            {
               sb.AppendFormatWithEscape(" AND dockmstr.dock_id = '{0}'", getTWLDocksApi.dockId);
            }
         }
         var where = sb.ToString();
         return this.dockmstrRepository.GetList(where, getTWLDocksApi.batchsize, getTWLDocksApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.dockmstrRepository?.Dispose();
         base.Dispose(true);
      }
   }
}