using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.SA
{
   public class SastnLookupResponse
   {
      [StringValidation]
      public string codeiden { get; set; }
      public int codeval { get; set; }
      [StringValidation]
      public string descrip { get; set; }
      [StringValidation]
      public string rowID { get; set; }
   }
}