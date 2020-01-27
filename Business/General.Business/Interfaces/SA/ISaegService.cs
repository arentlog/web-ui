using System;
using General.Business.Models.SA;

namespace General.Business.Interfaces.SA
{
   public interface ISaegService : IDisposable
   {
      void DeleteSaegGroupsByOper(DeleteSaegGroupsByOperRequestApi deleteSaegGroupsByOperRequestApi);
   }
}