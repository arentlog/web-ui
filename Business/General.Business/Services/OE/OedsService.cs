using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.OE;
using General.Business.Models.OE;
using Infor.Sxe.OE.Data.Models.Pdsoeds;
using Infor.Sxe.OE.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.OE
{
   public class OedsService : ServiceBase, IOedsService
   {
      private readonly OedsRepository oedsRepository;

      public OedsService(OedsRepository oedsRepository)
      {
         this.oedsRepository = oedsRepository;
      }

      public IEnumerable<Oeds> GetOedsListAllByConoAndWhse(
         GetOedsListAllByConoAndWhseRequestApi getGetOedsListAllByConoAndWhseRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"oeds.cono = {this.oedsRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetOedsListAllByConoAndWhseRequestApi.whse))
         {
            where.AppendFormatWithEscape(" AND oeds.whse = '{0}'", getGetOedsListAllByConoAndWhseRequestApi.whse);
         }


         return this.oedsRepository.GetList(
            where.ToString(),
            getGetOedsListAllByConoAndWhseRequestApi.batchsize,
            getGetOedsListAllByConoAndWhseRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.oedsRepository?.Dispose();
         base.Dispose(true);
      }
   }
}