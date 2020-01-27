using System;
using System.Collections.Generic;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssapb;

namespace General.Business.Interfaces.SA
{
   public interface ISapbService : IDisposable
   {
      IEnumerable<Sapb> GetSapbByReportFunction(GetSapbByReportFunctionRequestApi getSapbByReportFunctionRequestApi);

      IEnumerable<Sapb> GetSapbByConoReportFunctionAltReport(GetSapbByConoReportFunctionAltReportRequestApi getSapbByConoReportFunctionAltReportRequestApi);
   }
}