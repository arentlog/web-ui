using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SL;
using General.Business.Models.SL;
using Infor.Sxe.SL.Data.Models.Pdsslst;
using Infor.Sxe.SL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SL
{
   public class SlstService : ServiceBase, ISlstService
   {
      private readonly SlstRepository slstRepository;

      public SlstService(SlstRepository slstRepository)
      {
         this.slstRepository = slstRepository;
      }

      public IEnumerable<Slst> GetSupplierLinkSetupForLookup(
         GetSupplierLinkSetupForLookupRequestApi getSupplierLinkSetupForLookupRequestApi)
      {
         var where = new StringBuilder();

         where.Append($"slst.cono = '{this.slstRepository.Cono}'");

         if (!string.IsNullOrEmpty(getSupplierLinkSetupForLookupRequestApi.codeiden))
         {
            where.AppendFormatWithEscape(" AND slst.codeiden = '{0}'", getSupplierLinkSetupForLookupRequestApi.codeiden);
         }
         if (!string.IsNullOrEmpty(getSupplierLinkSetupForLookupRequestApi.codeval))
         {
            where.AppendFormatWithEscape(" AND slst.codeval begins '{0}'", getSupplierLinkSetupForLookupRequestApi.codeval);
         }
         if (!string.IsNullOrEmpty(getSupplierLinkSetupForLookupRequestApi.descrip))
         {
            where.AppendFormatWithEscape(" AND slst.descrip begins '{0}'", getSupplierLinkSetupForLookupRequestApi.descrip);
         }

         return this.slstRepository.GetList(
            where.ToString(),
            getSupplierLinkSetupForLookupRequestApi.batchsize,
            getSupplierLinkSetupForLookupRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.slstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}