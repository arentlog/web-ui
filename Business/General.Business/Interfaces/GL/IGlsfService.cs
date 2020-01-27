using System;
using System.Collections.Generic;
using General.Business.Models.GL;
using Infor.Sxe.GL.Data.Models.Pdsglsf;

namespace General.Business.Interfaces.GL
{
   public interface IGlsfService : IDisposable
   {
      IEnumerable<Glsf> GetGlifListByGroupNameDesc(GetGlifListByGroupNameDescRequestApi getGlifListByGroupNameDescRequestApi);
   }
}