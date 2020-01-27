using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsprintmst;

namespace General.Business.Interfaces.TWL
{
   public interface IPrintmstService : IDisposable
   {
      IEnumerable<Printmst> GetTWLPrinters(GetTWLPrintersApi getTWLPrintersApi);
   }
}