using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.Shared.Data.Models.Pdswebmodrecord
{
   public partial class Webmodrecord
   {
      [StringValidation]
      public string errorMessage { get; set; }

      public bool willOverwrite { get; set; }
   }
}