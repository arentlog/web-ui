using System;
using System.Collections.Generic;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsi;

namespace General.Business.Interfaces.SL
{
   public interface ISlsiService : IDisposable
   {
      IEnumerable<Slsi> GetListAll(int batchsize, string fldList);

      IEnumerable<Slsi> GetSlsiListByImpTypeBegins(GetSlsiListByImpTypeBeginsRequestApi getGetSlsiListByImpTypeBeginsRequestApi);

      IEnumerable<Slsi> GetSlsiListByImportTypeDesc(GetSlsiListByImportTypeDescRequestApi getGetSlsiListByImportTypeDescRequestApi);
   }
}