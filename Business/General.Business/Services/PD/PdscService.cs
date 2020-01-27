using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdsc;
using Infor.Sxe.PD.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PD
{
   public class PdscService : ServiceBase, IPdscService
   {
      private readonly PdscRepository pdscRepository;

      public PdscService(PdscRepository pdscRepository)
      {
         this.pdscRepository = pdscRepository;
      }

      public IEnumerable<Pdsc> GetPdscListByWhse(
         GetPdscListByWhseRequestApi getPdscListByWhseRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("pdsc.cono = {0}", this.pdscRepository.Cono);
         where.AppendFormat(" AND pdsc.levelcd = 0");
         if (getPdscListByWhseRequestApi.whse != null)
         {
            where.AppendFormatWithEscape(" AND pdsc.whse = '{0}'", getPdscListByWhseRequestApi.whse);
         }
         return this.pdscRepository.GetList(
            where.ToString(),
            getPdscListByWhseRequestApi.batchsize,
            getPdscListByWhseRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (this.pdscRepository != null)
         {
            this.pdscRepository.Dispose();
         }
         base.Dispose(true);
      }
   }
}
