using System.Collections.Generic;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdstransType;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.TWL
{
   public class TransTypeService : ServiceBase, ITransTypeService
   {
      private readonly TransTypeRepository transTypeRepository;

      public TransTypeService(TransTypeRepository transTypeRepository)
      {
         this.transTypeRepository = transTypeRepository;
      }

      public IEnumerable<TransType> GetTWLTransTypes(GetTWLTransTypesApi getTWLTransTypesApi)
      {
         return this.transTypeRepository.GetList(string.Empty, getTWLTransTypesApi.batchsize, getTWLTransTypesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.transTypeRepository?.Dispose();
         base.Dispose(true);
      }
   }
}