using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvSassmTypes;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvSassmTypesService : ServiceBase, IPvSassmTypesService
   {
      private readonly PvSassmTypesRepository pvSassmTypesRepository;

      public PvSassmTypesService(PvSassmTypesRepository pvSassmTypesRepository)
      {
         this.pvSassmTypesRepository = pvSassmTypesRepository;
      }

      public IEnumerable<PvSassmTypes> GetAllPvSassmTypesList(GetAllPvSassmTypesListRequestApi criteria)
      {
         var where = new StringBuilder();
         var typeCode = "";
         if (!string.IsNullOrEmpty(criteria.typeCode))
	      {
	 	      typeCode = criteria.typeCode;
         }

         where.AppendFormatWithEscape("pv_sassm_types.type_code > '{0}'", typeCode);

         return this.pvSassmTypesRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvSassmTypesRepository?.Dispose();
         base.Dispose(true);
      }
   }
}