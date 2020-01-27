using System;
using System.Globalization;

namespace ServiceInterfaceClient.Extensions
{
   public static class StringExtensions
   {
      public static string EscapeQuery(
         this string value)
      {
         return value.Replace("'", "''");
      }

      public static string FirstLetterToUpper(this string str)
      {
         if (string.IsNullOrEmpty(str))
         {
            return str;
         }
         if (str.Length > 1)
         {
            return char.ToUpper(str[0]) + str.Substring(1);
         }
         return str.ToUpper(CultureInfo.InvariantCulture);
      }

      public static string StripAfterLastOccuranceTemp(this string source, string checkChar)
      {
         return source.IndexOf(checkChar, StringComparison.Ordinal) <= 0 ? source : source.Substring(0, source.LastIndexOf(checkChar, StringComparison.Ordinal));
      }

      public static string StripBeforeLastOccurance(this string source, string checkChar)
      {
         return source.IndexOf(checkChar, StringComparison.Ordinal) <= 0 ? source : source.Substring(source.LastIndexOf(checkChar, StringComparison.Ordinal) + 1);
      }

      public static string SanitizeWhereClause(this string source, string tableName, int cono)
      {
         var whereClause = $"{tableName}.cono = {cono}";
         if (!string.IsNullOrEmpty(source))
         {
            source = source.Trim();
            if (source.StartsWith("AND ", StringComparison.InvariantCultureIgnoreCase))
            {
               source = source.Substring(4).Trim();
            }
            if (!string.IsNullOrEmpty(source))
            {
               whereClause = $"{whereClause} AND ({source})";
            }
         }
         return whereClause;
      }
   }
}