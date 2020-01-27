using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.KP;
using General.Business.Models.KP;
using Infor.Sxe.KP.Data.Models.Pdskpsg;
using Infor.Sxe.KP.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace Infor.Sxe.KP.Business.Services
{
   public class KpsgService : ServiceBase, IKpsgService
   {
      private readonly KpsgRepository kpsgRepository;

      public KpsgService(KpsgRepository kpsgRepository)
      {
         this.kpsgRepository = kpsgRepository;
      }

      public IEnumerable<Kpsg> GetGroupsByGroupNameAndSequenceNumber(GetGroupsByGroupNameAndSequenceNumberRequestApi getGetGroupsByGroupNameAndSequenceNumberRequestApi)
      {
         var where = new StringBuilder();
         where.Append($"kpsg.cono = {this.kpsgRepository.Cono}");

         if (!string.IsNullOrEmpty(getGetGroupsByGroupNameAndSequenceNumberRequestApi.groupname))
         {
            where.AppendFormatWithEscape(" AND kpsg.groupname = '{0}'", getGetGroupsByGroupNameAndSequenceNumberRequestApi.groupname);
         } else
         {
            where.AppendFormat(" AND kpsg.groupname = ''");
         }

         if (getGetGroupsByGroupNameAndSequenceNumberRequestApi.seqno != 0)
         {
            where.AppendFormatWithEscape(" AND kpsg.seqno = {0}", getGetGroupsByGroupNameAndSequenceNumberRequestApi.seqno);
         }

         return this.kpsgRepository.GetList(
            where.ToString(),
            true,
            getGetGroupsByGroupNameAndSequenceNumberRequestApi.batchsize,
            getGetGroupsByGroupNameAndSequenceNumberRequestApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.kpsgRepository?.Dispose();
         base.Dispose(true);
      }
   }
}