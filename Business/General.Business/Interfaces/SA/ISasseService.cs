using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssasse;

namespace General.Business.Interfaces.SA
{
   public interface ISasseService : IDisposable
   {
      IEnumerable<Sasse> GetSasseListAllByErrorAndLang(GetSasseListAllByErrorAndLangRequestApi getSasseListAllByErrorAndLangRequestApi);
   }
}