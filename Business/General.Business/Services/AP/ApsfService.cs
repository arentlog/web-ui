using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.AP;
using General.Business.Models.AP;
using Infor.Sxe.AP.Data.Models.Pdsapsf;
using Infor.Sxe.AP.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.AP
{
   public class ApsfService : ServiceBase, IApsfService
   {
      private readonly ApsfRepository apsfRepository;

      public ApsfService(ApsfRepository apsfRepository)
      {
         this.apsfRepository = apsfRepository;
      }

      public IEnumerable<Apsf> GetApsfListByTaxDetails(
         GetApsfListByTaxDetailsRequestApi getApsfListByTaxDetailsRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("apsf.cono = {0}", this.apsfRepository.Cono);
         if (getApsfListByTaxDetailsRequestApi.taxYear != 0)
         {
            where.AppendFormat(" AND apsf.taxyear = {0}", getApsfListByTaxDetailsRequestApi.taxYear);
         }
         if (!string.IsNullOrEmpty(getApsfListByTaxDetailsRequestApi.fedTaxId))
         {
            where.AppendFormatWithEscape(" AND apsf.fedtaxid = '{0}'", getApsfListByTaxDetailsRequestApi.fedTaxId);
         }
         if (!string.IsNullOrEmpty(getApsfListByTaxDetailsRequestApi.controlCode))
         {
            where.AppendFormatWithEscape(" AND apsf.controlcode = '{0}'", getApsfListByTaxDetailsRequestApi.controlCode);
         }
         return this.apsfRepository.GetList(
            where.ToString(),
            getApsfListByTaxDetailsRequestApi.batchsize,
            getApsfListByTaxDetailsRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.apsfRepository?.Dispose();
         base.Dispose(true);
      }
   }
}