using System;

namespace Security.Security
{
   [Serializable]
   public class TokenObject
   {
      private string sessionid;

      public TokenObject()
      {
         this.Oper = string.Empty;
         this.Cono = 0;
      }

      public string Sessionid
      {
         get => this.sessionid;
         set
         {
            this.sessionid = value;
            if (Guid.TryParse(this.Sessionid, out var sessionidGuid))
            {
               this.SessionidGuid = sessionidGuid;
            }
         }
      }

      public int OffsetTime { get; set; }

      public Guid SessionidGuid { get; set; }

      public string Oper { get; set; }

      public int Cono { get; set; }

      public int DefaultRecordLimit { get; set; }

      public int ReportRecordLimit { get; set; }

      public int LookupMaxResults { get; set; }

      public string Tenant { get; set; }

      public string IdmConsumerKey { get; set; }

      public string IdmSharedSecret { get; set; }

      public string IdmUrl { get; set; }

      public int InforIdmCacheExpirationAbsolute { get; set; }

      public string IonApiUrl { get; set; }

      public string CurrentUiCulture { get; set; }

      public string RestAccessUrl { get; set; }
   }
}