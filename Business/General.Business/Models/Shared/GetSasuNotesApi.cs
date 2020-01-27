using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;

namespace General.Business.Models.Shared
{
   public class GetSasuNotesApi : FetchWhereRequestBase
   {
      public int cono { get; set; }

      [StringValidation]
      public string notestype { get; set; }

      [StringValidation]
      public string primarykey { get; set; }

      [StringValidation]
      public string secondarykey { get; set; }

      public int pageno { get; set; }
   }
}