using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.CM;
using General.Business.Models.CM;
using Infor.Sxe.CM.Data.Models.Pdscmst;
using Infor.Sxe.CM.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.CM
{
   public class CmstService : ServiceBase, ICmstService
   {
      private readonly CmstRepository cmstRepository;

      public CmstService(CmstRepository cmstRepository)
      {
         this.cmstRepository = cmstRepository;
      }

      public IEnumerable<Cmst> GetCmstListByIDCodeValDesc(GetCmstListByIDCodeValDescRequestApi getGetCmstListByIDCodeValDescRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"cmst.codeiden = '{getGetCmstListByIDCodeValDescRequestApi.codeiden}'");

         if (!string.IsNullOrEmpty(getGetCmstListByIDCodeValDescRequestApi.codeval))
         {
            where.AppendFormatWithEscape(" AND cmst.codeval BEGINS '{0}'", getGetCmstListByIDCodeValDescRequestApi.codeval);
         }

         if (!string.IsNullOrEmpty(getGetCmstListByIDCodeValDescRequestApi.descrip))
         {
            where.AppendFormatWithEscape(" AND cmst.descrip BEGINS '{0}'", getGetCmstListByIDCodeValDescRequestApi.descrip);
         }

         if (!string.IsNullOrEmpty(getGetCmstListByIDCodeValDescRequestApi.slsrep))
         {
            where.AppendFormatWithEscape(" AND cmst.slsrep BEGINS '{0}'", getGetCmstListByIDCodeValDescRequestApi.slsrep);
         }

         return this.cmstRepository.GetList(
            where.ToString(),
            getGetCmstListByIDCodeValDescRequestApi.batchsize,
            getGetCmstListByIDCodeValDescRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}