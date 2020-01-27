using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsl;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.IC
{
   public class IcslService : ServiceBase, IIcslService
   {
      private readonly IcslRepository icslRepository;

      public IcslService(IcslRepository icslRepository)
      {
         this.icslRepository = icslRepository;
      }

      public IEnumerable<Icsl> GetIcslListByWhseVendNoProdLine(
         GetIcslListByWhseVendNoProdLineRequestApi getIcslListByWhseVendNoProdLineRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"icsl.cono = {this.icslRepository.Cono}");

         if (!string.IsNullOrEmpty(getIcslListByWhseVendNoProdLineRequestApi.whse))
         {
            where.AppendFormatWithEscape(" and icsl.whse = '{0}'", getIcslListByWhseVendNoProdLineRequestApi.whse);
         }
         where.AppendFormatWithEscape(" and icsl.vendno = {0}", getIcslListByWhseVendNoProdLineRequestApi.vendno);

         if (!string.IsNullOrEmpty(getIcslListByWhseVendNoProdLineRequestApi.prodline))
         {
            where.AppendFormatWithEscape(" and icsl.prodline = '{0}'", getIcslListByWhseVendNoProdLineRequestApi.prodline);
         }

         return this.icslRepository.GetList(
            where.ToString(),
            getIcslListByWhseVendNoProdLineRequestApi.batchsize,
            getIcslListByWhseVendNoProdLineRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icslRepository?.Dispose();
         base.Dispose(true);
      }
   }
}