using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsreturnReason;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class ReturnReasonService : ServiceBase, IReturnReasonService
   {
      private readonly ReturnReasonRepository returnReasonRepository;

      public ReturnReasonService(ReturnReasonRepository returnReasonRepository)
      {
         this.returnReasonRepository = returnReasonRepository;
      }

      public IEnumerable<ReturnReason> GetTWLReturnReasons(GetTWLReturnReasonsApi getTWLReturnReasonsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLReturnReasonsApi.coNum))
         {
            sb.AppendFormatWithEscape("return_reason.co_num = '{0}'", getTWLReturnReasonsApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLReturnReasonsApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND return_reason.wh_num = '{0}'", getTWLReturnReasonsApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLReturnReasonsApi.code))
            {
               sb.AppendFormatWithEscape(" AND return_reason.code = '{0}'", getTWLReturnReasonsApi.code);
            }
         }
         var where = sb.ToString();
         return this.returnReasonRepository.GetList(where, getTWLReturnReasonsApi.batchsize, getTWLReturnReasonsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.returnReasonRepository?.Dispose();
         base.Dispose(true);
      }
   }
}