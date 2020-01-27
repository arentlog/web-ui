using System;
using System.Collections.Generic;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsess;

namespace General.Business.Interfaces.IC
{
   public interface IIcsessService : IDisposable
   {
      IEnumerable<Icsess> GetIcsessList(GetIcsessListRequestApi getIcsessListRequestApi);
   }
}