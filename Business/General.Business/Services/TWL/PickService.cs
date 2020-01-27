using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdspick;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class PickService : ServiceBase, IPickService
   {
      private readonly PickRepository pickRepository;

      public PickService(PickRepository pickRepository)
      {
         this.pickRepository = pickRepository;
      }

      public IEnumerable<Pick> GetPicksByZone(GetTWLPicksApi getTWLPicksApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLPicksApi.coNum))
         {
            sb.AppendFormatWithEscape("pick.co_num = '{0}'", getTWLPicksApi.coNum);
            if (!string.IsNullOrWhiteSpace(getTWLPicksApi.whNum))
            {
               sb.AppendFormatWithEscape(" AND pick.wh_num = '{0}'", getTWLPicksApi.whNum);
            }
            if (!string.IsNullOrWhiteSpace(getTWLPicksApi.whZone))
            {
               sb.AppendFormatWithEscape(" AND pick.wh_zone = '{0}'", getTWLPicksApi.whZone);
            }
         }
         var where = sb.ToString();
         return this.pickRepository.GetList(where, getTWLPicksApi.batchsize, getTWLPicksApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pickRepository?.Dispose();
         base.Dispose(true);
      }
   }
}