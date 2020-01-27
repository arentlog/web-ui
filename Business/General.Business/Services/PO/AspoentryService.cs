using System.Collections.Generic;
using General.Business.Interfaces.PO;
using Infor.Sxe.PO.Data.Models.Pdspoebtdeletebatch;
using Infor.Sxe.PO.Data.Models.Pdspoebtupdatedata;
using Infor.Sxe.PO.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.PO.Business.Services
{
   public class AspoentryService : ServiceBase, IAspoentryService
   {
      private readonly AspoentryRepository aspoentryRepository;

      public AspoentryService(AspoentryRepository aspoentryRepository)
      {
         this.aspoentryRepository = aspoentryRepository;
      }

      public void PoebtDeleteBatchCollection(IEnumerable<Poebtdeletebatch> poebtdeletebatchCollection)
      {
         foreach (Poebtdeletebatch poebtdeletebatch in poebtdeletebatchCollection)
         {
            aspoentryRepository.POEBTDeleteBatch(poebtdeletebatch);
         }
      }

      public void PoebtUpdateCollection(IEnumerable<Poebtupdatedata> poebtupdateCollection)
      {
         foreach (Poebtupdatedata poebtupdatedata in poebtupdateCollection)
         {
            aspoentryRepository.POEBTUpdateData(poebtupdatedata);
         }
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (this.aspoentryRepository != null)
         {
            this.aspoentryRepository.Dispose();
         }
         base.Dispose(true);
      }
   }
}
