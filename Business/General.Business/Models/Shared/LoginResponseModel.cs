using System;
using ServiceInterfaceClient.Attributes;

namespace General.Business.Models.Shared
{
   public class LoginResponseModel
   {
      public bool ShowImages { get; set; }
      [StringValidation]
      public string Oper { get; set; }
      [StringValidation]
      public string Tenant { get; set; }
      public int Cono { get; set; }
      public bool Success { get; set; }
      public bool ChangePassword { get; set; }
      public bool UserRequiresClearing { get; set; }
      public int DefaultRecordLimit { get; set; }
      public int ReportRecordLimit { get; set; }
      public int LookupMaxResults { get; set; }
      public Guid SessionID { get; set; }
      public long NumberOfMinutesBearer { get; set; }
      public long NumberOfMinutes { get; set; }
      [StringValidation]
      public string RestAccessUrl { get; set; }
      [StringValidation]
      public string PendoApiKey { get; set; }
      [StringValidation]
      public string TryAndBuy { get; set; }
      [StringValidation]
      public string Guid { get; set; }
      public int CallRetryDelay { get; set; }
      public int CallRetryLimit { get; set; }
      public bool SuppressBusinessContext { get; set; }
      public string DateFormat { get; set; }
      public bool Release
      {
         get
         {
#if !DEBUG
            return true;
#else
            return false;
#endif
         }
      }
   }
}