using System;
using System.Collections.Generic;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSapbq;

namespace General.Business.Interfaces.PV
{
   public interface IPvSapbqService : IDisposable
   {
      IEnumerable<PvSapbq> GetPvSapbqListByQueueName(GetPvSapbqListByQueueRequestApi criteria);

      IEnumerable<PvSapbq> GetPvSapbqListByQueueNameAndDemand(GetPvSapbqListByQueueAndDemandRequestApi criteria);
   }
}