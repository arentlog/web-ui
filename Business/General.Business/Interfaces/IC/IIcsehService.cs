using System;
using System.Collections.Generic;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicseh;

namespace General.Business.Interfaces.IC
{
   public interface IIcsehService : IDisposable
   {
      IEnumerable<Icseh> GetIcsehListAllByMSDSSheetNoAndLangcd(GetIcsehListAllByMSDSSheetNoAndLangcdRequestApi getGetIcsehListAllByMSDSSheetAndLangcdRequestApi);
   }
}