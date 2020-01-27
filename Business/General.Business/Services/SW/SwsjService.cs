using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.SW;
using General.Business.Models.SW;
using Infor.Sxe.SW.Data.Models.Pdsswsj;
using Infor.Sxe.SW.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.SW
{
   public class SwsjService : ServiceBase, ISwsjService
   {
      private readonly SwsjRepository swsjRepository;

      public SwsjService(SwsjRepository swsjRepository)
      {
         this.swsjRepository = swsjRepository;
      }

      public IEnumerable<Swsj> ListSwsjByTypePCatChargeOEType(ListSwsjByTypePCatChargeOETypeRequestApi criteria)
      {
         var where = new StringBuilder();
         where.AppendFormatWithEscape("swsj.cono = {0}", this.swsjRepository.Cono);
         if (!string.IsNullOrWhiteSpace(criteria.jobtype))
         {
            where.AppendFormatWithEscape(" AND swsj.jobtype = '{0}'", criteria.jobtype);
         }
         if (!string.IsNullOrWhiteSpace(criteria.oetype) && criteria.oetype.ToLower() != "b")
         {
            where.AppendFormatWithEscape(" AND swsj.gentype = {0}",criteria.oetype.ToLower() == "s" ? "true" : "false");
         }
         if (!string.IsNullOrWhiteSpace(criteria.prodcat))
         {
            where.AppendFormatWithEscape(" AND swsj.prodcat = '{0}'", criteria.prodcat);
         }
         if (!string.IsNullOrWhiteSpace(criteria.warrantycd) && criteria.warrantycd.ToLower() != "a")
         {
            where.AppendFormatWithEscape(" AND swsj.warrantycd = '{0}'", criteria.warrantycd.ToLower());
         }

         return this.swsjRepository.GetList(where.ToString(), criteria.batchsize, criteria.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.swsjRepository?.Dispose();
         base.Dispose(true);
      }
   }
}