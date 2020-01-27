using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsdockmstr;

namespace General.Business.Interfaces.TWL
{
   public interface IDockmstrService : IDisposable
   {
      IEnumerable<Dockmstr> GetTWLDocks(GetTWLDocksApi getTWLDocksApi);
   }
}