using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.IC
{
   public class AsicsetupService : ServiceBase, IAsicsetupService
   {
      private readonly AsicsetupRepository asicsetupRepository;

      public AsicsetupService(AsicsetupRepository asicsetupRepository)
      {
         this.asicsetupRepository = asicsetupRepository;
      }

      public void IcsdpSavePw(IcsdpSavePwRequestApi criteria)
      {
         this.asicsetupRepository.ICSDPSavePW(criteria.cWhse, criteria.iMediaCd, criteria.cMerchantPassword);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.asicsetupRepository?.Dispose();
         base.Dispose(true);
      }
   }
}