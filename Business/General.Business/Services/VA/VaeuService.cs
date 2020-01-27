using General.Business.Models.VA;
using Infor.Sxe.VA.Data.Models.Pdsmessaging;
using Infor.Sxe.VA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using System.Collections.Generic;
using System.Linq;
using General.Business.Interfaces.VA;

namespace General.Business.Services.VA
{
   public class VaeuService : ServiceBase, IVaeuService
   {
      private readonly AsvaentryRepository asvaentryRepository;

      public VaeuService(AsvaentryRepository asvaentryRepository)
      {
         this.asvaentryRepository = asvaentryRepository;
      }

      public IEnumerable<Messaging> UpgradeVersionsByList(ValueAddUpgradeVersionByListRequestApi vaeuUpgradeVersionsRequest)
      {
         var results = new List<Messaging>();

         if (vaeuUpgradeVersionsRequest.vaeuBuildValistResults == null || !vaeuUpgradeVersionsRequest.vaeuBuildValistResults.Any())
         {
            return new List<Messaging>();
         }

         foreach (var vaeuUpgrade in vaeuUpgradeVersionsRequest.vaeuBuildValistResults)
         {
            results.AddRange(
               this.asvaentryRepository.VAEUUpgrade(
                  vaeuUpgrade.vano,
                  vaeuUpgrade.vasuf,
                  vaeuUpgrade.verno,
                  vaeuUpgradeVersionsRequest.toVersionNumber));
         }

         return results;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.asvaentryRepository?.Dispose();
         base.Dispose(true);
      }
   }
}