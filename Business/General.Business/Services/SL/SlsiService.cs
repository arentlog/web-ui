using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslsi;
using Infor.Sxe.SL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SL
{
   public class SlsiService : ServiceBase, ISlsiService
   {
      private readonly SlsiRepository slsiRepository;

      public SlsiService(SlsiRepository slsiRepository)
      {
         this.slsiRepository = slsiRepository;
      }

      public IEnumerable<Slsi> GetListAll(int batchsize, string fldList)
      {
         return this.slsiRepository.GetList(string.Empty, batchsize, fldList);
      }

      public IEnumerable<Slsi> GetSlsiListByImportTypeDesc(GetSlsiListByImportTypeDescRequestApi getGetSlsiListByImportTypeDescRequestApi)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrEmpty(getGetSlsiListByImportTypeDescRequestApi.imptype))
         {
            where.AppendFormatWithEscape("slsi.imptype BEGINS '{0}'", getGetSlsiListByImportTypeDescRequestApi.imptype);
         }

         if (!string.IsNullOrEmpty(getGetSlsiListByImportTypeDescRequestApi.impdescrip))
         {
            if (!string.IsNullOrEmpty(where.ToString()))
            {
               where.Append(" AND ");
            }
            where.AppendFormatWithEscape("slsi.impdescrip BEGINS '{0}'", getGetSlsiListByImportTypeDescRequestApi.impdescrip);
         }

         return this.slsiRepository.GetList(
            where.ToString(),
            getGetSlsiListByImportTypeDescRequestApi.batchsize,
            getGetSlsiListByImportTypeDescRequestApi.fldlist);
      }

      public IEnumerable<Slsi> GetSlsiListByImpTypeBegins(GetSlsiListByImpTypeBeginsRequestApi getGetSlsiListByImpTypeBeginsRequestApi)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrEmpty(getGetSlsiListByImpTypeBeginsRequestApi.imptype))
         {
            where.AppendFormatWithEscape("slsi.imptype BEGINS '{0}'", getGetSlsiListByImpTypeBeginsRequestApi.imptype);
         }

         return this.slsiRepository.GetList(
            where.ToString(),
            getGetSlsiListByImpTypeBeginsRequestApi.batchsize,
            getGetSlsiListByImpTypeBeginsRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slsiRepository?.Dispose();
         base.Dispose(true);
      }
   }
}