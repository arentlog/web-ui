using Infor.Sxe.Shared.Data.Models.Pdswebextendrecord;
using Infor.Sxe.Shared.Data.Models.Pdswebmodlistresults;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class JsonViewResponseApi
   {
      [StringValidation]
      public string view { get; set; }
      public Webextendrecord webextendrecord { get; set; }
      public Webmodlistresults webmodrecord { get; set; }
   }
}