using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PD;
using General.Business.Models.PD;
using Infor.Sxe.PD.Data.Models.Pdspdss;
using Infor.Sxe.PD.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PD
{
   public class PdssService : ServiceBase, IPdssService
   {
      private readonly PdssRepository pdssRepository;

      public PdssService(PdssRepository pdssRepository)
      {
         this.pdssRepository = pdssRepository;
      }

      public IEnumerable<Pdss> GetPdssListBySearchTerms(
         GetPdssListBySearchTermsRequestApi getPdssListBySearchTermsRequestApi)
      {
         var where = new StringBuilder();
         where.AppendFormat("pdss.cono = {0}", this.pdssRepository.Cono);
         if (getPdssListBySearchTermsRequestApi.whse != null)
         {
            where.AppendFormatWithEscape(" AND pdss.whse = '{0}'", getPdssListBySearchTermsRequestApi.whse);
         }
         if (getPdssListBySearchTermsRequestApi.custptype != null)
         {
            where.AppendFormatWithEscape(" AND pdss.custptype = '{0}'", getPdssListBySearchTermsRequestApi.custptype);
         }
         if (getPdssListBySearchTermsRequestApi.pricetype != null)
         {
            where.AppendFormatWithEscape(" AND pdss.pricetype = '{0}'", getPdssListBySearchTermsRequestApi.pricetype);
         }
         if (getPdssListBySearchTermsRequestApi.startdt != null)
         {
            where.AppendFormatWithEscape(" AND pdss.startdt = '{0}'", getPdssListBySearchTermsRequestApi.startdt);
         }
         return this.pdssRepository.GetList(
            where.ToString(), 
            getPdssListBySearchTermsRequestApi.batchsize, 
            getPdssListBySearchTermsRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         if (this.pdssRepository != null)
         {
            this.pdssRepository.Dispose();
         }
         base.Dispose(true);
      }
   }
}
