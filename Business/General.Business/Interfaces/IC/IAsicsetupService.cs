using System;
using General.Business.Models.IC;

namespace General.Business.Interfaces.IC
{
   public interface IAsicsetupService : IDisposable
   {
      void IcsdpSavePw(IcsdpSavePwRequestApi criteria);
   }
}