using System;
using System.Collections.Generic;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsdrpLog;

namespace General.Business.Interfaces.TWL
{
   public interface IDrpLogService : IDisposable
   {
      IEnumerable<DrpLog> GetTWLAutoDropLogs(GetTWLAutoDropLogsApi getTWLAutoDropLogsApi);
   }
}