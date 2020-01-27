using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdscartonSize;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class CartonSizeService : ServiceBase, ICartonSizeService
   {
      private readonly CartonSizeRepository cartonSizeRepository;

      public CartonSizeService(CartonSizeRepository cartonSizeRepository)
      {
         this.cartonSizeRepository = cartonSizeRepository;
      }

      public IEnumerable<CartonSize> GetTWLCartonSizes(GetTWLCartonSizesApi getTWLCartonSizesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLCartonSizesApi.coNum))
         {
            sb.AppendFormatWithEscape("carton_size.co_num = '{0}'", getTWLCartonSizesApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLCartonSizesApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND carton_size.wh_num = '{0}'", getTWLCartonSizesApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLCartonSizesApi.boxId))
            {
               sb.AppendFormatWithEscape(" AND carton_size.box_id = '{0}'", getTWLCartonSizesApi.boxId);
            }
         }
         var where = sb.ToString();
         return this.cartonSizeRepository.GetList(where, getTWLCartonSizesApi.batchsize, getTWLCartonSizesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cartonSizeRepository?.Dispose();
         base.Dispose(true);
      }
   }
}