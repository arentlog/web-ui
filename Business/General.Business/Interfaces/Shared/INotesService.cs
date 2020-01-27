using System;
using System.Collections.Generic;
using General.Business.Models.Shared;
using Infor.Sxe.Shared.Data.Models.Pdsnotes;

namespace General.Business.Interfaces.Shared
{
   public interface INotesService : IDisposable
   {
      IEnumerable<Notes> GetSasuNotes(GetSasuNotesApi getSasuNotesApi);
   }
}