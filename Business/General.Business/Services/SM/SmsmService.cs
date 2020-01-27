using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SM;
using General.Business.Models.SM;
using Infor.Sxe.SM.Data.Models.Pdssmsm;
using Infor.Sxe.SM.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SM
{
   public class SmsmService : ServiceBase, ISmsmService
   {
      private readonly SmsmRepository smsmRepository;

      public SmsmService(SmsmRepository smsmRepository)
      {
         this.smsmRepository = smsmRepository;
      }

      public IEnumerable<Smsm> GetSmsmes(GetSmsmesRequestApi getGetSmsmesRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"smsm.cono = {this.smsmRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetSmsmesRequestApi.commtype))
         {
            where.AppendFormatWithEscape(" AND smsm.commtype BEGINS '{0}'", getGetSmsmesRequestApi.commtype);
         }


         if (!string.IsNullOrEmpty(getGetSmsmesRequestApi.slsrep))
         {
            where.AppendFormatWithEscape(" AND (smsm.slsrep = '{0}'", getGetSmsmesRequestApi.slsrep);
            where.AppendFormatWithEscape(" OR smsm.slsrep = '')", getGetSmsmesRequestApi.slsrep);
         }

         return this.smsmRepository.GetList(
            where.ToString(),
            getGetSmsmesRequestApi.batchsize,
            getGetSmsmesRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.smsmRepository?.Dispose();
         base.Dispose(true);
      }
   }
}