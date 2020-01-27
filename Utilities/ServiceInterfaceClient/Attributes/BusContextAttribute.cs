using System;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
   public class BusContextAttribute : Attribute
   {
      #region Fields

      #endregion

      #region Constructors and Destructors

      public BusContextAttribute(BusPart busPart)
      {
         this.BusPart = busPart;
      }

      #endregion

      #region Public Properties
      
      public BusPart BusPart { get; }

      #endregion
   }

   public enum BusPart
   {
      Name = 0,

      Descr = 1,

      AcctEntity = 2,

      Location = 3,
   }
}