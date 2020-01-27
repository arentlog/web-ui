using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.IC;
using General.Business.Models.IC;
using Infor.Sxe.IC.Data.Models.Pdsicseps;
using Infor.Sxe.IC.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.IC
{
   public class IcsepsService : ServiceBase, IIcsepsService
   {
      private readonly IcsepsRepository repository;

      public IcsepsService(IcsepsRepository repository)
      {
         this.repository = repository;
      }

      public IEnumerable<Icseps> GetListByPk(IcsepsGetListByPkRequestApi icsepsGetListByPkRequestApi)
      {
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icseps.cono = {0}", this.repository.Cono);
         if (string.IsNullOrEmpty(icsepsGetListByPkRequestApi.whse))
         {
            sb.AppendFormatWithEscape(" AND icseps.whse = '{0}'", icsepsGetListByPkRequestApi.whse);
         }
         sb.AppendFormatWithEscape(" AND icseps.runno = {0}", icsepsGetListByPkRequestApi.runno);
         if (string.IsNullOrEmpty(icsepsGetListByPkRequestApi.prod))
         {
            sb.AppendFormatWithEscape(" AND icseps.prod = '{0}'", icsepsGetListByPkRequestApi.prod);
         }
         if (string.IsNullOrEmpty(icsepsGetListByPkRequestApi.serialno))
         {
            sb.AppendFormatWithEscape(" AND icseps.serialno = '{0}'", icsepsGetListByPkRequestApi.serialno);
         }
         sb.AppendFormatWithEscape(" AND icseps.unavailfl = {0}", icsepsGetListByPkRequestApi.unavailfl);
         var where = sb.ToString();
         return this.repository.GetList(where, icsepsGetListByPkRequestApi.batchsize, icsepsGetListByPkRequestApi.fldlist);
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