using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.Pdscmpmst;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class CmpmstService : ServiceBase, ICmpmstService
   {
      private readonly CmpmstRepository cmpmstRepository;

      public CmpmstService(CmpmstRepository cmpmstRepository)
      {
         this.cmpmstRepository = cmpmstRepository;
      }

      public IEnumerable<Cmpmst> GetTWLCompanies(GetTWLCompaniesApi getTWLCompaniesApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLCompaniesApi.coNum))
         {
            sb.AppendFormatWithEscape("cmpmst.co_num = '{0}'", getTWLCompaniesApi.coNum);
         }
         var where = sb.ToString();  
         return this.cmpmstRepository.GetList(where, getTWLCompaniesApi.batchsize, getTWLCompaniesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.cmpmstRepository?.Dispose();
         base.Dispose(true);
      }
   }
}