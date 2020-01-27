using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasgl;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SasglService : ServiceBase, ISasglService
   {
      private readonly SasglRepository sasglRepository;

      public SasglService(SasglRepository sasglRepository)
      {
         this.sasglRepository = sasglRepository;
      }

      public IEnumerable<Sasgl> GetSasglListAllByState(GetSasglListAllByStateRequestApi getGetSasglListAllByStateRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"sasgl.cono = {this.sasglRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSasglListAllByStateRequestApi.state))
         {
            where.AppendFormatWithEscape(" AND sasgl.state = '{0}'", getGetSasglListAllByStateRequestApi.state);
         }

         return this.sasglRepository.GetList(
            where.ToString(),
            getGetSasglListAllByStateRequestApi.batchsize,
            getGetSasglListAllByStateRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sasglRepository?.Dispose();
         base.Dispose(true);
      }
   }
}