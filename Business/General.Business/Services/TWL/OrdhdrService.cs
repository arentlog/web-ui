using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsordhdr;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class OrdhdrService : ServiceBase, IOrdhdrService
   {
      private readonly OrdhdrRepository ordhdrRepository;

      public OrdhdrService(OrdhdrRepository ordhdrRepository)
      {
         this.ordhdrRepository = ordhdrRepository;
      }

      public IEnumerable<Ordhdr> GetTWLOrders(GetTWLOrdersApi getTWLOrdersApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLOrdersApi.coNum))
         {
            sb.AppendFormatWithEscape("ordhdr.co_num = '{0}'", getTWLOrdersApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLOrdersApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND ordhdr.wh_num = '{0}'", getTWLOrdersApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLOrdersApi.orderBegins))
            {
               sb.AppendFormatWithEscape(" AND ordhdr.order begins '{0}'", getTWLOrdersApi.orderBegins);
            }
            if (!string.IsNullOrWhiteSpace(getTWLOrdersApi.orderSuffixBegins))
            {
               sb.AppendFormatWithEscape(" AND ordhdr.order_suffix begins '{0}'", getTWLOrdersApi.orderSuffixBegins);
            }
            if (getTWLOrdersApi.orderDateFrom != null)
            {
               sb.AppendFormatWithEscape(" AND ordhdr.order_date GE '{0}'", getTWLOrdersApi.orderDateFrom);
            }
            if (getTWLOrdersApi.orderDateTo != null)
            {
               sb.AppendFormatWithEscape(" AND ordhdr.order_date LE '{0}'", getTWLOrdersApi.orderDateTo);
            }
            if (!string.IsNullOrWhiteSpace(getTWLOrdersApi.orderStatus))
            {
               sb.AppendFormatWithEscape(" AND ordhdr.order_status = '{0}'", getTWLOrdersApi.orderStatus);
            }
            if (!string.IsNullOrWhiteSpace(getTWLOrdersApi.carrierBegins))
            {
               sb.AppendFormatWithEscape(" AND ordhdr.carrier begins '{0}'", getTWLOrdersApi.carrierBegins);
            }
         }
         var where = sb.ToString();
         return this.ordhdrRepository.GetList(where, getTWLOrdersApi.batchsize, getTWLOrdersApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.ordhdrRepository?.Dispose();
         base.Dispose(true);
      }
   }
}