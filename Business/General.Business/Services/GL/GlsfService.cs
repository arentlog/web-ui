using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.GL;
using General.Business.Models.GL;
using Infor.Sxe.GL.Data.Models.Pdsglsf;
using Infor.Sxe.GL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.GL
{
   public class GlsfService : ServiceBase, IGlsfService
   {
      private readonly GlsfRepository glsfRepository;

      public GlsfService(GlsfRepository glsfRepository)
      {
         this.glsfRepository = glsfRepository;
      }

      public IEnumerable<Glsf> GetGlifListByGroupNameDesc(GetGlifListByGroupNameDescRequestApi getGlifListByGroupNameDescRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("glsf.swseqno = 0");

         if (!string.IsNullOrWhiteSpace(getGlifListByGroupNameDescRequestApi.groupnm))
         {
            where.AppendFormatWithEscape(" AND glsf.groupnm BEGINS '{0}'", getGlifListByGroupNameDescRequestApi.groupnm);
         }
         if (!string.IsNullOrWhiteSpace(getGlifListByGroupNameDescRequestApi.gltitle))
         {
            where.AppendFormatWithEscape(" AND glsf.gltitle BEGINS '{0}'", getGlifListByGroupNameDescRequestApi.gltitle);
         }
         return this.glsfRepository.GetList(where.ToString(), getGlifListByGroupNameDescRequestApi.batchsize, getGlifListByGroupNameDescRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.glsfRepository?.Dispose();
         base.Dispose(true);
      }
   }
}