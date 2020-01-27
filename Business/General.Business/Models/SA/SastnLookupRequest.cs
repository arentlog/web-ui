using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.SA
{
   public class SastnLookupRequest
   {
      [StringValidation]
      public string codeiden { get; set; }
      [StringValidation]
      public string term { get; set; }
      public bool IsAutoComplete { get; set; }
      public int recordcountlimit { get; set; }
   }
}