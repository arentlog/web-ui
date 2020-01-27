using System.Linq;
using General.Business.Interfaces.PD;
using Infor.Sxe.Common.Data.Models.PD;
using Infor.Sxe.PD.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;

namespace General.Business.Services.PD
{
   public class PdscBusinessContextService : ServiceBase, IPdscBusinessContextService, IUseKeys
   {
      private readonly PdscRepository repository;

      public bool UseKeys => false;

      public PdscBusinessContextService(IProgressConnection connection)
      {
         this.repository = new PdscRepository(connection);
      }

      public PdscBase GetBusinessContext(int pdrecno)
      {
         return this.repository.GetListByPdrecno(0, pdrecno, 1, string.Empty).FirstOrDefault();
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }
}