using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.PV;
using General.Business.Models.PV;
using Infor.Sxe.PV.Data.Models.PdspvUser;
using Infor.Sxe.PV.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.PV
{
   public class PvUserService : ServiceBase, IPvUserService
   {
      private readonly PvUserRepository pvUserRepository;

      public PvUserService(PvUserRepository pvUserRepository)
      {
         this.pvUserRepository = pvUserRepository;
      }

      public IEnumerable<PvUser> GetPvUserListByKeys(GetPvUserListByKeysRequestApi criteria)
      {
         var where = new StringBuilder();

         where.Append($"cono = {criteria.cono}");
         if (!string.IsNullOrEmpty(criteria.oper2))
         {
            where.AppendFormatWithEscape(" AND pv_user.oper2 BEGINS '{0}'", criteria.oper2);
         }
         if (!string.IsNullOrEmpty(criteria.userName))
         {
            where.AppendFormatWithEscape(" AND pv_user._User-Name BEGINS '{0}'", criteria.userName);
         }
         if (!string.IsNullOrEmpty(criteria.dept))
         {
            where.AppendFormatWithEscape(" AND pv_user.Dept BEGINS '{0}'", criteria.dept);
         }

         return this.pvUserRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.pvUserRepository?.Dispose();
         base.Dispose(true);
      }
   }
}