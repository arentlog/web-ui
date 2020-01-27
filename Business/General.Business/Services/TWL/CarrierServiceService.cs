using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using Infor.Sxe.TWL.Data.Models.PdscarrierService;

namespace General.Business.Services.TWL
{
   public class CarrierServiceService : ServiceBase, ICarrierServiceService
   {
      private readonly CarrierServiceRepository carrierServiceRepository;

      public CarrierServiceService(CarrierServiceRepository carrierServiceRepository)
      {
         this.carrierServiceRepository = carrierServiceRepository;
      }

      public IEnumerable<Infor.Sxe.TWL.Data.Models.PdscarrierService.CarrierService> GetTWLCarrierServices(GetTWLCarrierServicesApi getTWLCarrierServicesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLCarrierServicesApi.coNum))
         {
            sb.AppendFormatWithEscape("carrier_service.co_num = '{0}'", getTWLCarrierServicesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLCarrierServicesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND carrier_service.wh_num = '{0}'", getTWLCarrierServicesApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLCarrierServicesApi.carrierId))
            {
               sb.AppendFormatWithEscape(" AND carrier_service.carrier_id = '{0}'", getTWLCarrierServicesApi.carrierId);
            }
            if (!string.IsNullOrWhiteSpace(getTWLCarrierServicesApi.service))
            {
               sb.AppendFormatWithEscape(" AND carrier_service.service = '{0}'", getTWLCarrierServicesApi.service);
            }
         }
         var where = sb.ToString();
         return this.carrierServiceRepository.GetList(where, getTWLCarrierServicesApi.batchsize, getTWLCarrierServicesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.carrierServiceRepository?.Dispose();
         base.Dispose(true);
      }
   }
}