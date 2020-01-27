using General.Business.Interfaces.GL;
using Infor.Sxe.Common.Data.Models.GL;
using Infor.Sxe.GL.Data.Models.Pdsglvalidateparse;
using Infor.Sxe.GL.Data.Repositories;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Interfaces;
using ServiceInterfaceClient.Progress;

namespace General.Business.Services.GL
{
   public class GlsaBusinessContextService : ServiceBase, IGlsaBusinessContextService, IUseKeys
   {
      private readonly GlsaRepository glsaRepository;

      private readonly AsglsetupRepository asglsetupRepository;

      private readonly SascRepository sascRepository;

      public bool UseKeys => true;

      public GlsaBusinessContextService(IProgressConnection connection)
      {
         this.glsaRepository = new GlsaRepository(connection);
         this.asglsetupRepository = new AsglsetupRepository(connection);
         this.sascRepository = new SascRepository(connection);
      }
      public GlsaBase GetBusinessContext(string glNo)
      {
         var sascEntity = this.sascRepository.Get(0, 1, "glcurfisc");
         if (sascEntity != null)
         {
            var retGlsa = this.asglsetupRepository.GLValidateParse(new Glvalidateparse { glno = glNo, yr = sascEntity.glcurfisc });
            if (!string.IsNullOrEmpty(retGlsa?.glsarowid))
            {
               return this.glsaRepository.GetByRowId(retGlsa.glsarowid, string.Empty);
            }
         }
         return null;
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.glsaRepository?.Dispose();
         this.asglsetupRepository?.Dispose();
         this.sascRepository?.Dispose();
         base.Dispose(true);
      }
   }
}