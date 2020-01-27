using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.KP;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpso;
using Infor.Sxe.KP.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.KP.Business.Services
{
   public class KpsoService : ServiceBase, IKpsoService
   {
      private readonly KpsoRepository kpsoRepository;

      public KpsoService(KpsoRepository kpsoRepository)
      {
         this.kpsoRepository = kpsoRepository;
      }

      public IEnumerable<Kpso> GetOptionsByOptionName(GetOptionsByOptionNameRequestApi getGetOptionsByOptionNameRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"kpso.cono = {this.kpsoRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetOptionsByOptionNameRequestApi.optionname))
         {
            where.AppendFormatWithEscape(" AND kpso.optionname = '{0}'", getGetOptionsByOptionNameRequestApi.optionname);
         }

         return this.kpsoRepository.GetList(
            where.ToString(),
            true,
            getGetOptionsByOptionNameRequestApi.batchsize,
            getGetOptionsByOptionNameRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.kpsoRepository?.Dispose();
         base.Dispose(true);
      }
   }
}