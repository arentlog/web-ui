using System;

namespace Logging.Helpers
{
   public static class LoggingHelpers
   {
      public static string StripOffDomain(this string input)
      {
         if (string.IsNullOrEmpty(input))
         {
            return string.Empty;
         }
         return !input.Contains("/") ? input : input.Substring(0, input.IndexOf("/", StringComparison.Ordinal));
      }
   }
}