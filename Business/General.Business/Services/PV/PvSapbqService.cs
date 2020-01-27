using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSapbq;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvSapbqServices : ServiceBase, IPvSapbqService
   {
      private readonly PvSapbqRepository pvSapbqRepository;

      public PvSapbqServices(PvSapbqRepository pvSapbqRepository)
      {
         this.pvSapbqRepository = pvSapbqRepository;
      }

      public IEnumerable<PvSapbq> GetPvSapbqListByQueueName(GetPvSapbqListByQueueRequestApi criteria)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrWhiteSpace(criteria.queueName))
         {
            where.AppendFormatWithEscape(" pv_sapbq.queue_name begins '{0}'", criteria.queueName);
         }

         return this.pvSapbqRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      public IEnumerable<PvSapbq> GetPvSapbqListByQueueNameAndDemand(GetPvSapbqListByQueueAndDemandRequestApi criteria)
      {
         var where = new StringBuilder();

         if (string.IsNullOrEmpty(criteria.demand))
         {
            criteria.demand = "a";
         }

         where.AppendFormatWithEscape("((pv_sapbq.demand_only = true and '{0}' = 'd')", criteria.demand);
         where.AppendFormatWithEscape(" or (pv_sapbq.demand_only = false and  '{0}' = 's')", criteria.demand);
         where.AppendFormatWithEscape(" or '{0}' = 'a') ", criteria.demand);

         if (!string.IsNullOrWhiteSpace(criteria.queueName))
         {
            where.AppendFormatWithEscape(" and pv_sapbq.queue_name begins '{0}'", criteria.queueName);
         }

         return this.pvSapbqRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvSapbqRepository?.Dispose();
         base.Dispose(true);
      }
   }
}