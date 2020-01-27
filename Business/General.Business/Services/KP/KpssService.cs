using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.KP;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpss;
using Infor.Sxe.KP.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.KP.Business.Services
{
   public class KpssService : ServiceBase, IKpssService
   {
      private readonly KpssRepository kpssRepository;

      public KpssService(KpssRepository kpssRepository)
      {
         this.kpssRepository = kpssRepository;
      }

      public IEnumerable<Kpss> GetKpssList(GetKpssListRequestApi getGetKpssListRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"kpss.cono = {this.kpssRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetKpssListRequestApi.prod))
         {
            where.AppendFormatWithEscape(" AND kpss.prod = '{0}'", getGetKpssListRequestApi.prod);
         }

         return this.kpssRepository.GetList(
            where.ToString(),
            getGetKpssListRequestApi.batchsize,
            getGetKpssListRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.kpssRepository?.Dispose();
         base.Dispose(true);
      }
   }
}