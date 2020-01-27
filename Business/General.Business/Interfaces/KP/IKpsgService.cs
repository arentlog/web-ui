using System;
using System.Collections.Generic;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpsg;

namespace General.Business.Interfaces.KP
{
   public interface IKpsgService : IDisposable
   {
      IEnumerable<Kpsg> GetGroupsByGroupNameAndSequenceNumber(GetGroupsByGroupNameAndSequenceNumberRequestApi getGetGroupsByGroupNameAndSequenceNumberRequestApi);
   }
}