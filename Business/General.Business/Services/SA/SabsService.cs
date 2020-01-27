using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssabs;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SabsService : ServiceBase, ISabsService
   {
      private readonly SabsRepository sabsRepository;

      public SabsService(SabsRepository sabsRepository)
      {
         this.sabsRepository = sabsRepository;
      }

      public IEnumerable<Sabs> GetSabssWithBlankGroupName(GetSabssWithBlankGroupNameRequestApi getSabssWithBlankGroupNameRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"sabs.cono = {this.sabsRepository.Cono}");
         if (!string.IsNullOrWhiteSpace(getSabssWithBlankGroupNameRequestApi.batchname))
         {
            where.AppendFormatWithEscape(" AND sabs.batchnm = '{0}'", getSabssWithBlankGroupNameRequestApi.batchname);
         }
         if (!string.IsNullOrWhiteSpace(getSabssWithBlankGroupNameRequestApi.modulename))
         {
            where.AppendFormatWithEscape(" AND sabs.modulenm = '{0}'", getSabssWithBlankGroupNameRequestApi.modulename);
         }
         return this.sabsRepository.GetList(where.ToString(), getSabssWithBlankGroupNameRequestApi.batchsize, getSabssWithBlankGroupNameRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sabsRepository?.Dispose();
         base.Dispose(true);
      }
   }
}