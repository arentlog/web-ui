using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscommst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class CommstService : ServiceBase, ICommstService
   {
      private readonly CommstRepository commstRepository;

      public CommstService(CommstRepository commstRepository)
      {
         this.commstRepository = commstRepository;
      }

      public IEnumerable<Commst> GetTWLCommstInterfaces(GetTWLCommstInterfacesApi getTWLCommstInterfacesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLCommstInterfacesApi.version))
         {
            sb.AppendFormatWithEscape("commst.version = '{0}'", getTWLCommstInterfacesApi.version);
            if (!string.IsNullOrWhiteSpace(getTWLCommstInterfacesApi.recordType))
            {
               sb.AppendFormatWithEscape(" AND commst.record_type = '{0}'", getTWLCommstInterfacesApi.recordType);
            }
         }
         var where = sb.ToString();
         return this.commstRepository.GetList(where, getTWLCommstInterfacesApi.batchsize, getTWLCommstInterfacesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.commstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}