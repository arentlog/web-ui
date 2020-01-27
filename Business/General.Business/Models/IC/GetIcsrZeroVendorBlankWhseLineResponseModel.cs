using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.IC
{
   public class GetIcsrZeroVendorBlankWhseLineResponseModel
   {
      [StringValidation]
      public string rankty { get; set; }
      [StringValidation]
      public string icusage { get; set; }
   }
}