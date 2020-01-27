using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsec;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.IC
{
   public class IcsecService : ServiceBase, IIcsecService
   {
      private readonly IcsecRepository icsecRepository;

      public IcsecService(IcsecRepository icsecRepository)
      {
         this.icsecRepository = icsecRepository;
      }

      public IEnumerable<Icsec> GetIcsecsByTypeProd(
         GetIcsecsByTypeProdRequestApi getIcsecsByTypeProdRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"icsec.cono = {this.icsecRepository.Cono}");

         if (!string.IsNullOrEmpty(getIcsecsByTypeProdRequestApi.type))
         {
            where.AppendFormatWithEscape(" and icsec.rectype = '{0}'", getIcsecsByTypeProdRequestApi.type);
         }

         if (!string.IsNullOrEmpty(getIcsecsByTypeProdRequestApi.prod))
         {
            where.AppendFormatWithEscape(" and icsec.prod = '{0}'", getIcsecsByTypeProdRequestApi.prod);
         }

         return this.icsecRepository.GetList(
            where.ToString(),
            getIcsecsByTypeProdRequestApi.batchsize,
            getIcsecsByTypeProdRequestApi.fldlist);
      }

      public IEnumerable<Icsec> GetIcsecsByTypeProdAltProd(
         GetIcsecsByTypeProdAltProdRequestApi getIcsecsByTypeProdAltProdRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"icsec.cono = {this.icsecRepository.Cono}");

         if (!string.IsNullOrEmpty(getIcsecsByTypeProdAltProdRequestApi.rectype))
         {
            where.AppendFormatWithEscape(" and icsec.rectype = '{0}'", getIcsecsByTypeProdAltProdRequestApi.rectype);
         }

         if (!string.IsNullOrEmpty(getIcsecsByTypeProdAltProdRequestApi.prod))
         {
            where.AppendFormatWithEscape(" and icsec.prod = '{0}'", getIcsecsByTypeProdAltProdRequestApi.prod);
         }

         if (!string.IsNullOrEmpty(getIcsecsByTypeProdAltProdRequestApi.altprod))
         {
            where.AppendFormatWithEscape(" and icsec.altprod = '{0}'", getIcsecsByTypeProdAltProdRequestApi.altprod);
         }

         return this.icsecRepository.GetList(
            where.ToString(),
            getIcsecsByTypeProdAltProdRequestApi.batchsize,
            getIcsecsByTypeProdAltProdRequestApi.fldlist);
      }

        public IEnumerable<Icsec> GetIcsecsByTypeKeyNoProdCustShipTo(
        GetIcsecsByTypeKeyNoProdCustShipToRequestApi getIcsecsByTypeKeyNoProdCustShipToRequestApi)
        {
            var where = new StringBuilder();
            where.Append($"icsec.cono = {this.icsecRepository.Cono}");

            if (!string.IsNullOrEmpty(getIcsecsByTypeKeyNoProdCustShipToRequestApi.rectype))
            {
                where.AppendFormatWithEscape(" and icsec.rectype = '{0}'", getIcsecsByTypeKeyNoProdCustShipToRequestApi.rectype);
            }

            if (!string.IsNullOrEmpty(getIcsecsByTypeKeyNoProdCustShipToRequestApi.prod))
            {
                where.AppendFormatWithEscape(" and icsec.prod = '{0}'", getIcsecsByTypeKeyNoProdCustShipToRequestApi.prod);
            }

            if (getIcsecsByTypeKeyNoProdCustShipToRequestApi.keyno != decimal.MinValue)
            {
                where.AppendFormatWithEscape(" and icsec.keyno = {0}", getIcsecsByTypeKeyNoProdCustShipToRequestApi.keyno);
            }

            if (getIcsecsByTypeKeyNoProdCustShipToRequestApi.custno != decimal.MinValue)
            {
                where.AppendFormatWithEscape(" and icsec.custno = {0}", getIcsecsByTypeKeyNoProdCustShipToRequestApi.custno);
            }
            
            if (!string.IsNullOrEmpty(getIcsecsByTypeKeyNoProdCustShipToRequestApi.shipto))
            {
                where.AppendFormatWithEscape(" and icsec.shipto = '{0}'", getIcsecsByTypeKeyNoProdCustShipToRequestApi.shipto);
            }

            return this.icsecRepository.GetList(
               where.ToString(),
               getIcsecsByTypeKeyNoProdCustShipToRequestApi.batchsize,
               getIcsecsByTypeKeyNoProdCustShipToRequestApi.fldlist);
        }


        protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icsecRepository?.Dispose();
         base.Dispose(true);
      }
   }
}