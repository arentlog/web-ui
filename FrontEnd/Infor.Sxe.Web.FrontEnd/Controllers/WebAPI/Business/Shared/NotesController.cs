using System.Collections.Generic;
using System.Web.Http;
using General.Business.Interfaces.Shared;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdsnotes;
using ServiceInterfaceClient.BaseClasses;

namespace Infor.Sxe.Web.FrontEnd.Controllers.WebAPI.Business.Shared
{
   [RoutePrefix("api/shared/notes")]
   public class NotesController : ApiControllerBase
   {
      private readonly INotesService notesService;

      public NotesController(INotesService notesService)
      {
         this.notesService = notesService;
      }

      [HttpPost]
      [Route("getsasunotes")]
      public IEnumerable<Notes> GetSasuNotes(GetSasuNotesApi getSasuNotesApi)
      {
         return this.notesService.GetSasuNotes(getSasuNotesApi);
      }

      protected override void Dispose(bool disposing)
      {
         if (!disposing)
         {
            return;
         }
         this.notesService?.Dispose();
         base.Dispose(true);
      }
   }
}