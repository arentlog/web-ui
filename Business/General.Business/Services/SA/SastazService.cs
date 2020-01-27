using System.Collections.Generic;
using General.Business.Interfaces.SA;
using Infor.Sxe.SA.Data.Models.Pdssastaz;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SastazService : ServiceBase, ISastazService
   {
      private readonly SastazRepository sastazRepository;

      public SastazService(SastazRepository sastazRepository)
      {
         this.sastazRepository = sastazRepository;
      }

      public IEnumerable<Sastaz> GetSastazByWhereClause(string whereClause, int batchsize, string fldlist)
      {
          return this.sastazRepository.GetList(whereClause.SanitizeWhereClause("sastaz", this.sastazRepository.Cono), batchsize, fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastazRepository?.Dispose();
         base.Dispose(true);
      }
   }
}