using System;
using System.Globalization;

namespace ServiceInterfaceClient.Helpers
{
   public static class EncodingExtensions
   {
      public static string ToStringEncoded(this byte[] input)
      {
         return (input == null) ? string.Empty : BitConverter.ToInt64(input, 0).ToString();
      }

      public static byte[] ToByteArray(this string input)
      {
         if (string.IsNullOrEmpty(input))
         {
            return null;
         }
         return long.TryParse(input, out var rowId) ? BitConverter.GetBytes(rowId) : null;
      }

      public static string ToClauseString(this string input)
      {
         if (string.IsNullOrEmpty(input))
         {
            return null;
         }
         if (input.Contains("0x"))
         {
            return input.Replace("0x", "");
         }
         return long.TryParse(input, out var rowId) ? BitConverter.ToString(BitConverter.GetBytes(rowId)).ToLower(CultureInfo.InvariantCulture).Replace("-", "") : null;
      }
   }
}