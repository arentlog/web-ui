using System;

namespace Security.Security
{
   public class LoggingParams
   {
      public string tenant { get; set; }

      public string oper { get; set; }

      public Guid sessionid { get; set; }

      public int cono { get; set; }

      public string function { get; set; }

      public string host { get; set; }

      public bool IsAuthenticated { get; set; }

      public string callGuid { get; set; }
   }
}