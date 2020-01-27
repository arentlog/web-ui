using System;
using Infor.Sxe.Common.Data.Models.PD;

namespace General.Business.Interfaces.PD
{
   public interface IPdscBusinessContextService : IDisposable
   {
      PdscBase GetBusinessContext(int pdrecno);
   }
}