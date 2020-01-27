using System;
using General.Business.Models.SA;

namespace General.Business.Interfaces.SA
{
   public interface ISaeaService : IDisposable
   {
      string SAEAGetListNameDesc(SaeaGetListNameDescRequestApi request);
   }
}