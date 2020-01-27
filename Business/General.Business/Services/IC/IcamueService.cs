using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicamue;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.IC
{
   public class IcamueService : ServiceBase, IIcamueService
   {
      private readonly IcamueRepository icamueRepository;

      public IcamueService(IcamueRepository icamueRepository)
      {
         this.icamueRepository = icamueRepository;
      }

      public IEnumerable<Icamue> GetIcamueList(GetIcamueListRequestApi getGetIcamueListRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"icamue.cono = {this.icamueRepository.Cono}");

         where.AppendFormatWithEscape(" AND icamue.activefl = {0}", getGetIcamueListRequestApi.activefl);

         if (!string.IsNullOrEmpty(getGetIcamueListRequestApi.whse))
         {
            where.AppendFormatWithEscape(" AND icamue.whse = '{0}'", getGetIcamueListRequestApi.whse);
         }
         
         if (!string.IsNullOrEmpty(getGetIcamueListRequestApi.buyer))
         {
            where.AppendFormatWithEscape(" AND icamue.buyer = '{0}'", getGetIcamueListRequestApi.buyer);
         }

         if (!string.IsNullOrEmpty(getGetIcamueListRequestApi.prod))
         {
            where.AppendFormatWithEscape(" AND icamue.prod = '{0}'", getGetIcamueListRequestApi.prod);
         }

         if (!string.IsNullOrEmpty(getGetIcamueListRequestApi.frozentype))
         {
            where.AppendFormatWithEscape(" AND icamue.frozentype = '{0}'", getGetIcamueListRequestApi.frozentype);
         }

         if (!string.IsNullOrEmpty(getGetIcamueListRequestApi.exceptlist))
         {
            where.AppendFormatWithEscape(" AND can-do('{0}',icamue.exctype)", getGetIcamueListRequestApi.exceptlist);
         }

         return this.icamueRepository.GetList(
            where.ToString(), 
            getGetIcamueListRequestApi.batchsize, 
            getGetIcamueListRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.icamueRepository?.Dispose();
         base.Dispose(true);
      }
   }
}