using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class ChangePasswordRequestModel : LoginRequestModel
   {
      [StringValidation]
      public string OldPassword { get; set; }
      [StringValidation]
      public string NewPassword { get; set; }
      [StringValidation]
      public string ConfirmPassword { get; set; }
   }
}