using System;
using System.Collections.Generic;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvAdminlog;

namespace General.Business.Interfaces.PV
{
   public interface IPvAdminLogService : IDisposable
   {
      IEnumerable<PvAdminlog> ListBySubject(ListBySubjectRequestApi criteria);
   }
}