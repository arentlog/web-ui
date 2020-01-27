using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class LoginRequestModel
   {
      [StringValidation]
      public string Oper { get; set; }
      [StringValidation]
      public string Password { get; set; }
      [StringValidation]
      public string Tenant { get; set; }
      [StringValidation]
      public string Locale { get; set; }
      public int Cono { get; set; }
      public int OffsetTime { get; set; }
   }
}