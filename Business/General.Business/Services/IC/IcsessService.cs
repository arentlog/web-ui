using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicsess;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.IC
{
   public class IcsessService : ServiceBase, IIcsessService
   {
      private readonly IcsessRepository icsessRepository;

      public IcsessService(IcsessRepository icsessRepository)
      {
         this.icsessRepository = icsessRepository;
      }

      public IEnumerable<Icsess> GetIcsessList(
         GetIcsessListRequestApi getIcsessListRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"icsess.cono = {this.icsessRepository.Cono}");

         if (getIcsessListRequestApi.vendno != 0)
         {
            where.Append($" AND icsess.vendno = '{getIcsessListRequestApi.vendno}'");
         }
         if (!string.IsNullOrEmpty(getIcsessListRequestApi.rectype))
         {
            where.AppendFormatWithEscape(" AND icsess.rectype = '{0}'", getIcsessListRequestApi.rectype);
         }
         if (getIcsessListRequestApi.position != 0)
         {
            where.Append($" AND icsess.position = '{getIcsessListRequestApi.position}'");
         }
         if (!string.IsNullOrEmpty(getIcsessListRequestApi.data))
         {
            where.AppendFormatWithEscape(" AND icsess.data = '{0}'", getIcsessListRequestApi.data);
         }

         return this.icsessRepository.GetList(
            where.ToString(),
            getIcsessListRequestApi.batchsize,
            getIcsessListRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icsessRepository?.Dispose();
         base.Dispose(true);
      }
   }
}