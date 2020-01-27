using Infor.Sxe.Shared.Data.Models.PdsUserLogin;
using System;
using System.Collections.Generic;

namespace Infor.Sxe.Shared.Data.Models
{
   public class LoginInternalResult
   {
      public string userID { get; set; }
      public int cono { get; set; }
      public bool Success { get; set; }
      public string ErrorMessage { get; set; }
      public bool ChangePassword { get; set; }
      public bool UserRequiresClearing { get; set; }
      public List<AvailUsers> availUsers { get; set; }
      public long NumberOfMinutes { get; set; }
      public Guid SessionID { get; set; }
   }
}