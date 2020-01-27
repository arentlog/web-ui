using System;
using System.Collections.Generic;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdss;

namespace General.Business.Interfaces.PD
{
   public interface IPdssService : IDisposable
   {
      IEnumerable<Pdss> GetPdssListBySearchTerms(GetPdssListBySearchTermsRequestApi getPdssListBySearchTermsRequestApi);
   }
}