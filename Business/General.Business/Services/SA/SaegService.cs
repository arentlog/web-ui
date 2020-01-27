using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.SA
{
   public class SaegService : ServiceBase, ISaegService
   {
      private readonly AssaentryRepository assaentryRepository;

      public SaegService(AssaentryRepository assaentryRepository)
      {
         this.assaentryRepository = assaentryRepository;
      }

      public void DeleteSaegGroupsByOper(DeleteSaegGroupsByOperRequestApi deleteSaegGroupsByOperRequestApi)
      {
         if (deleteSaegGroupsByOperRequestApi.groupNames == null || deleteSaegGroupsByOperRequestApi.groupNames.Count == 0)
         {
            return;
         }
         foreach (var groupName in deleteSaegGroupsByOperRequestApi.groupNames)
         {
            this.assaentryRepository.SAEGDeleteGroupOper(groupName, deleteSaegGroupsByOperRequestApi.oper);
         }
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