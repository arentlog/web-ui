using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdspick;

namespace General.Business.Interfaces.TWL
{
   public interface IPickService : IDisposable
   {
      IEnumerable<Pick> GetPicksByZone(GetTWLPicksApi getTWLPicksApi);
   }
}