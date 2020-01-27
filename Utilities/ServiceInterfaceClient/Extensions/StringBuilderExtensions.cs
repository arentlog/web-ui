using System;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace ServiceInterfaceClient.Extensions
{
   public static class StringBuilderExtensions
   {
      private static readonly Regex RemoveSpecialCharactersExpression = new Regex(@"[~`@#$%()\-+={}[\]\\:;""'<,>.?/]", RegexOptions.Compiled);

      public static void AppendKeywords(this StringBuilder where, string keywordStem, object value, bool removeSpecialCharacters, bool includeWildCard, bool prefixWithAmperSand)
      {
         // special case, don't insert empty strings
         if (value == null || (value is string && string.IsNullOrWhiteSpace(value.ToString())))
         {
            return;
         }

         if (removeSpecialCharacters & value is string) { value = RemoveSpecialCharacter(value.ToString()); }
         where.Append($"{(prefixWithAmperSand ? "&" : "")}{keywordStem}{value}{(includeWildCard ? "*" : "")}");
      }

      private static string RemoveSpecialCharacter(string input)
      {
         return RemoveSpecialCharactersExpression.Replace(input, "_");
      }

      public static void AppendFormatWithEscape(
         this StringBuilder builder,
         string format,
         params object[] value)
      {
         ProcessArray(builder, format, value);
      }

      public static void AppendFormatWithEscape(
         this StringBuilder builder,
         string format,
         object value)
      {
         if (value.GetType().IsArray)
         {
            ProcessArray(builder, format, ((Array)value).Cast<object>().ToArray());
         }
         else
         {
            builder.AppendFormat(format, ReturnMassagedSingleValue(value));
         }
      }

      private static void ProcessArray(StringBuilder builder, string format, object[] value)
      {
         for (var i = 0; i < value.Length; i++)
         {
            value[i] = ReturnMassagedSingleValue(value[i]);
         }
         builder.AppendFormat(format, value);
      }

      private static object ReturnMassagedSingleValue(object value)
      {
         var stringValue = (value as string);
         if (stringValue != null)
         {
            return stringValue.EscapeQuery();
         }
         return value;
      }
   }
}
