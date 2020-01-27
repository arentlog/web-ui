using System.Collections.Generic;
using System.Text;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdsnotes;
using Infor.Sxe.Shared.Data.Repositories;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;

namespace General.Business.Services.Shared
{
   public class NotesService : ServiceBase, INotesService
   {
      private readonly NotesRepository notesRepository;

      public NotesService(NotesRepository notesRepository)
      {
         this.notesRepository = notesRepository;
      }

      public IEnumerable<Notes> GetSasuNotes(GetSasuNotesApi getSasuNotesApi)
      {
         var where = new StringBuilder();
         where.Append($"cono = {getSasuNotesApi.cono}");
         where.AppendFormatWithEscape(" AND notes.notestype = '{0}'", getSasuNotesApi.notestype);
         if (!string.IsNullOrWhiteSpace(getSasuNotesApi.primarykey))
         {
            where.AppendFormatWithEscape(" AND notes.primarykey = '{0}'", getSasuNotesApi.primarykey);
         }
         if (!string.IsNullOrWhiteSpace(getSasuNotesApi.secondarykey))
         {
            where.AppendFormatWithEscape(" AND notes.secondarykey = '{0}'", getSasuNotesApi.secondarykey);
         }
         if (getSasuNotesApi.pageno > 0)
         {
            where.AppendFormatWithEscape(" AND notes.pageno = '{0}'", getSasuNotesApi.pageno);
         }
         return this.notesRepository.GetList(where.ToString(), getSasuNotesApi.batchsize, getSasuNotesApi.fldlist);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.notesRepository?.Dispose();
         base.Dispose(true);
      }
   }
}