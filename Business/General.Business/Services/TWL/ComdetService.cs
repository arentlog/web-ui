using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscomdet;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ComdetService : ServiceBase, IComdetService
   {
      private readonly ComdetRepository comdetRepository;

      public ComdetService(ComdetRepository comdetRepository)
      {
         this.comdetRepository = comdetRepository;
      }

      public IEnumerable<Comdet> GetTWLComdetInterfaces(GetTWLComdetInterfacesApi getTWLComdetInterfacesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLComdetInterfacesApi.version))
         {
            sb.AppendFormatWithEscape("comdet.version = '{0}'", getTWLComdetInterfacesApi.version);
            if (!string.IsNullOrWhiteSpace(getTWLComdetInterfacesApi.recordType))
            {
               sb.AppendFormatWithEscape(" AND comdet.record_type = '{0}'", getTWLComdetInterfacesApi.recordType);
            }
         }
         var where = sb.ToString();
         return this.comdetRepository.GetList(where, getTWLComdetInterfacesApi.batchsize, getTWLComdetInterfacesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.comdetRepository?.Dispose();
         base.Dispose(true);
      }
   }
}