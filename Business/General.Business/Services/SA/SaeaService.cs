using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.SA
{
   public class SaeaService : ServiceBase, ISaeaService
   {
      private readonly AssaentryRepository assaentryRepository;

      public SaeaService(AssaentryRepository assaentryRepository)
      {
         this.assaentryRepository = assaentryRepository;
      }

      public string SAEAGetListNameDesc(SaeaGetListNameDescRequestApi request)
      {
         return this.assaentryRepository.SAEAGetListNameDesc(
               request.cListType,
               request.cListValue,
               request.cListValue2);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.assaentryRepository?.Dispose();
         base.Dispose(true);
      }
   }
}