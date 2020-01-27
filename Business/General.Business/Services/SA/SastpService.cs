using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SA;
using General.Business.Models.SA;
using Infor.Sxe.SA.Data.Models.Pdssastp;
using Infor.Sxe.SA.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SA
{
   public class SastpService : ServiceBase, ISastpService
   {
      private readonly SastpRepository sastpRepository;

      public SastpService(SastpRepository sastpRepository)
      {
         this.sastpRepository = sastpRepository;
      }

      public IEnumerable<Sastp> GetSastpList(GetSastpListRequestApi getGetSastpListRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"sastp.cono = {this.sastpRepository.Cono}");
         where.AppendFormatWithEscape(" AND sastp.processno >= '{0}'", getGetSastpListRequestApi.processno);
         
         return this.sastpRepository.GetList(
            where.ToString(),
            getGetSastpListRequestApi.batchsize,
            getGetSastpListRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.sastpRepository?.Dispose();
         base.Dispose(true);
      }
   }
}