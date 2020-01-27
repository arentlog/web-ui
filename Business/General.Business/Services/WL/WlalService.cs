using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.WL;
using General.Business.Models.WL;
using Infor.Sxe.WL.Data.Models.Pdswlal;
using Infor.Sxe.WL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SL
{
   public class WlalService : ServiceBase, IWlalService
   {
      private readonly WlalRepository wlalRepository;

      public WlalService(WlalRepository wlalRepository)
      {
         this.wlalRepository = wlalRepository;
      }

      public IEnumerable<Wlal> GetWlalByLocationDescription(GetWlalByLocationDescriptionApi getWlalByLocationDescriptionApi)
      {
         var where = new StringBuilder();

         if (!string.IsNullOrWhiteSpace(getWlalByLocationDescriptionApi.wlloc))
         {
            where.AppendFormatWithEscape(" wlal.wlloc BEGINS '{0}'", getWlalByLocationDescriptionApi.wlloc);
         }
         if (!string.IsNullOrWhiteSpace(getWlalByLocationDescriptionApi.descrip))
         {
            if (!string.IsNullOrEmpty(where.ToString()))
            {
               where.Append(" AND ");
            }
               where.AppendFormatWithEscape(" wlal.descrip BEGINS '{0}'", getWlalByLocationDescriptionApi.descrip);
         }
         return this.wlalRepository.GetList(where.ToString(), getWlalByLocationDescriptionApi.batchsize, getWlalByLocationDescriptionApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.wlalRepository?.Dispose();
         base.Dispose(true);
      }
   }
}
