using System;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property)]
   public class IDAttribute : Attribute
   {
      public IDAttribute(int id)
      {
         this.Id = id;
      }

      public int Id { get; }
   }
}