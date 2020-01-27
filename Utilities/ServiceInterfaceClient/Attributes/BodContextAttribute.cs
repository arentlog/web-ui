using System;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property)]
   public class BodContextAttribute : Attribute
   {
      #region Fields

      #endregion

      #region Constructors and Destructors

      public BodContextAttribute(BodPart bodPart, string blank)
      {
         this.BodPart = bodPart;
         this.Blank = blank;
      }

      public BodContextAttribute(BodPart bodPart) : this(bodPart, string.Empty)
      {
      }

      #endregion

      #region Public Properties

      public BodPart BodPart { get; }

      public string Blank { get; }

      #endregion
   }

   public enum BodPart
   {
      Noun = 0,

      AcctEntity = 1,

      Location = 2,
   }
}