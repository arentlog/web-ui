using System;
using Infor.Sxe.Common.Data.Models.GL;

namespace General.Business.Interfaces.GL
{
   public interface IGlsaBusinessContextService : IDisposable
   {
      GlsaBase GetBusinessContext(string glNo);
   }
}