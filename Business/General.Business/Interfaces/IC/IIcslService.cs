using System;
using System.Collections.Generic;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsl;

namespace General.Business.Interfaces.IC
{
   public interface IIcslService : IDisposable
   {
      IEnumerable<Icsl> GetIcslListByWhseVendNoProdLine(GetIcslListByWhseVendNoProdLineRequestApi getIcslListByWhseVendNoProdLineRequestApi);
   }
}