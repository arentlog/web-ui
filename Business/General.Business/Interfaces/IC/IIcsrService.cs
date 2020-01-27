using System;
using General.Business.Models.IC;

namespace General.Business.Interfaces.IC
{
   public interface IIcsrService : IDisposable
   {
      GetIcsrZeroVendorBlankWhseLineResponseModel GetIcsrZeroVendorBlankWhseLine();
   }
}
