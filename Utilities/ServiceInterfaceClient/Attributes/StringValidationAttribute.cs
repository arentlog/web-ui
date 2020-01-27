using System;
using System.ComponentModel.DataAnnotations;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
   public class StringValidationAttribute : ValidationAttribute
   {
      public override bool IsValid(object value)
      {
         var result = true;
         return result;
      }
   }
}