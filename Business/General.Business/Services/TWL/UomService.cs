using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdsuom;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class UomService : ServiceBase, IUomService
   {
      private readonly UomRepository uomRepository;

      public UomService(UomRepository uomRepository)
      {
         this.uomRepository = uomRepository;
      }

      public IEnumerable<Uom> GetTWLUnitOfMeasures(GetTWLUnitOfMeasuresApi getTWLUnitOfMeasuresApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLUnitOfMeasuresApi.uom))
         {
            sb.AppendFormatWithEscape(" uom.uom = '{0}'", getTWLUnitOfMeasuresApi.uom);
         }

         var where = sb.ToString();
         return this.uomRepository.GetList(where, getTWLUnitOfMeasuresApi.batchsize, getTWLUnitOfMeasuresApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.uomRepository?.Dispose();
         base.Dispose(true);
      }
   }
}