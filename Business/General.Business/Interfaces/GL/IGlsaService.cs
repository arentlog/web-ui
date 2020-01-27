using System;
using Infor.Sxe.GL.Data.Models.Complex;
using Infor.Sxe.GL.Data.Models.Pdsglaccountlookup;

namespace General.Business.Interfaces.GL
{
   public interface IGlsaService : IDisposable
   {
      GlsaLookupResponseAPI AdvancedLookup(Glaccountlookupcriteria glaccountlookupcriteria);
   }
}