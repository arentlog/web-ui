using System;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property)]
   public class BodIDAttribute : Attribute
   {
      public BodIDAttribute(int id, RequiredId yesNo)
      {
         this.Id = id;
         this.YesNo = yesNo;
      }

      public RequiredId YesNo { get; }

      public int Id { get; }
   }

   public enum RequiredId
   {
      False = 0,
      True = 1,
   }
}