using ServiceInterfaceClient.Attributes;

namespace Infor.Sxe.GL.Data.Models.Pdsglaccountlookup
{
   public partial class Glaccountlookupcriteria
   {
      [StringValidation]
      public string Term { get; set; }
      public bool IsAutoComplete { get; set; }
      public bool IsForGlsf { get; set; }
   }
}