using System.Linq;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Services.IC
{
   public class IcsrService : ServiceBase, IIcsrService
   {
      private readonly IcsrRepository repository;

      public IcsrService(IcsrRepository repository)
      {
         this.repository = repository;
      }

      public GetIcsrZeroVendorBlankWhseLineResponseModel GetIcsrZeroVendorBlankWhseLine()
      {
         var where = new StringBuilder();
         where.Append(
            $"icsr.cono = {this.repository.Cono} AND icsr.vendno = 0 AND icsr.whse = '' AND icsr.prodline = ''");
         var record = this.repository.GetList(where.ToString(), 1, "icusage,rankty").FirstOrDefault();
         return (record == null ? null : new GetIcsrZeroVendorBlankWhseLineResponseModel { icusage  = record.icusage, rankty = record.rankty });
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.repository?.Dispose();
         base.Dispose(true);
      }
   }
}