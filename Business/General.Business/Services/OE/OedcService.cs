using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.OE;
using General.Business.Models.OE;
using Infor.Sxe.OE.Data.Models.Pdsoedc;
using Infor.Sxe.OE.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.OE
{
   public class OedcService : ServiceBase, IOedcService
   {
      private readonly OedcRepository oedcRepository;

      public OedcService(OedcRepository oedcRepository)
      {
         this.oedcRepository = oedcRepository;
      }

      public IEnumerable<Oedc> GetOedcListAllByConoAndKey(
         GetOedcListAllByConoAndKeyRequestApi getGetOedcListAllByConoAndKeyRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"oedc.cono = {this.oedcRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetOedcListAllByConoAndKeyRequestApi.typecd))
         {
            where.AppendFormatWithEscape(" AND oedc.typecd = '{0}'", getGetOedcListAllByConoAndKeyRequestApi.typecd);
         }
         if (!string.IsNullOrEmpty(getGetOedcListAllByConoAndKeyRequestApi.key1))
         {
            where.AppendFormatWithEscape(" AND oedc.key1 begins '{0}'", getGetOedcListAllByConoAndKeyRequestApi.key1);
         }
         if (!string.IsNullOrEmpty(getGetOedcListAllByConoAndKeyRequestApi.key2))
         {
            where.AppendFormatWithEscape(" AND oedc.key2 begins '{0}'", getGetOedcListAllByConoAndKeyRequestApi.key2);
         }

         return this.oedcRepository.GetList(
            where.ToString(),
            getGetOedcListAllByConoAndKeyRequestApi.batchsize,
            getGetOedcListAllByConoAndKeyRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.oedcRepository?.Dispose();
         base.Dispose(true);
      }
   }
}