using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscarrier;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class CarrierService : ServiceBase, ICarrierService
   {
      private readonly CarrierRepository carrierRepository;

      public CarrierService(CarrierRepository carrierRepository)
      {
         this.carrierRepository = carrierRepository;
      }

      public IEnumerable<Carrier> GetTWLCarriers(GetTWLCarriersApi getTWLCarriersApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLCarriersApi.coNum))
         {
            sb.AppendFormatWithEscape("carrier.co_num = '{0}'", getTWLCarriersApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLCarriersApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND carrier.wh_num = '{0}'", getTWLCarriersApi.whNum);
               if (!string.IsNullOrWhiteSpace(getTWLCarriersApi.carrierId))
               {
                  sb.AppendFormatWithEscape(" AND carrier.carrier_id = '{0}'", getTWLCarriersApi.carrierId);
               }
            }
         }
         var where = sb.ToString();
         return this.carrierRepository.GetList(where, getTWLCarriersApi.batchsize, getTWLCarriersApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.carrierRepository?.Dispose();
         base.Dispose(true);
      }
   }
}