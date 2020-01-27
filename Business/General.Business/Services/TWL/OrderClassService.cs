using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsorderClass;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class OrderClassService : ServiceBase, IOrderClassService
   {
      private readonly OrderClassRepository orderClassRepository;

      public OrderClassService(OrderClassRepository orderClassRepository)
      {
         this.orderClassRepository = orderClassRepository;
      }

      public IEnumerable<OrderClass> GetTWLOrderClasses(GetTWLOrderClassesApi getTWLOrderClassesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLOrderClassesApi.code))
         {
            sb.AppendFormatWithEscape("order_class.code = '{0}'", getTWLOrderClassesApi.code);
            if (!string.IsNullOrWhiteSpace(getTWLOrderClassesApi.name))
            {
               sb.AppendFormatWithEscape(" AND order_class.name = '{0}'", getTWLOrderClassesApi.name);
            }
         }
         var where = sb.ToString();
         return this.orderClassRepository.GetList(where, getTWLOrderClassesApi.batchsize, getTWLOrderClassesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.orderClassRepository?.Dispose();
         base.Dispose(true);
      }
   }
}