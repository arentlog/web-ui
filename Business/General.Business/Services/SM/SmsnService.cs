using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SM;
using General.Business.Models.SM;
using Infor.Sxe.SM.Data.Models.Pdssmsn;
using Infor.Sxe.SM.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SM
{
   public class SmsnService : ServiceBase, ISmsnService
   {
      private readonly SmsnRepository smsnRepository;

      public SmsnService(SmsnRepository smsnRepository)
      {
         this.smsnRepository = smsnRepository;
      }

      public IEnumerable<Smsn> GetSmsnListBySalesRepAndName(GetSmsnListBySalesRepAndNameRequestApi getGetSmsnListBySalesRepAndNameRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"smsn.cono = {this.smsnRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSmsnListBySalesRepAndNameRequestApi.slsrep))
         {
            where.AppendFormatWithEscape(" AND smsn.slsrep BEGINS '{0}'", getGetSmsnListBySalesRepAndNameRequestApi.slsrep);
         }

         if (!string.IsNullOrEmpty(getGetSmsnListBySalesRepAndNameRequestApi.name))
         {
            where.AppendFormatWithEscape(" AND smsn.name BEGINS '{0}'", getGetSmsnListBySalesRepAndNameRequestApi.name);
         }

         if (!string.IsNullOrEmpty(getGetSmsnListBySalesRepAndNameRequestApi.slsrepboth))
         {
            where.AppendFormatWithEscape(" AND (smsn.slsrep BEGINS '{0}' or smsn.name BEGINS '{0}')", getGetSmsnListBySalesRepAndNameRequestApi.slsrepboth);
         }
         return this.smsnRepository.GetList(
            where.ToString(),
            getGetSmsnListBySalesRepAndNameRequestApi.batchsize,
            getGetSmsnListBySalesRepAndNameRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.smsnRepository?.Dispose();
         base.Dispose(true);
      }
   }
}