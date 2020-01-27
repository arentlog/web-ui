using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.TWL;
using General.Business.Models.TWL;
using Infor.Sxe.TWL.Data.Models.PdsfileRetent;
using Infor.Sxe.TWL.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.TWL
{
   public class FileRetentService : ServiceBase, IFileRetentService
   {
      private readonly FileRetentRepository fileRetentRepository;

      public FileRetentService(FileRetentRepository fileRetentRepository)
      {
         this.fileRetentRepository = fileRetentRepository;
      }

      public IEnumerable<FileRetent> GetTWLFileRetentions(GetTWLFileRetentionsApi getTWLFileRetentionsApi)
      {
         var sb = new StringBuilder();
         if (!string.IsNullOrWhiteSpace(getTWLFileRetentionsApi.fileName))
         {
            sb.AppendFormatWithEscape("file_retent.file_name = '{0}'", getTWLFileRetentionsApi.fileName);
         }
         var where = sb.ToString();
         return this.fileRetentRepository.GetList(where, getTWLFileRetentionsApi.batchsize, getTWLFileRetentionsApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.fileRetentRepository?.Dispose();
         base.Dispose(true);
      }
   }
}