using System;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
   public class DrillbackParamAttribute : Attribute
   {
      #region Fields

      #endregion

      #region Constructors and Destructors

      public DrillbackParamAttribute(string name, int index)
      {
         this.Name = name;
         this.Index = index;
      }

      public DrillbackParamAttribute(string name) : this(name, 0)
      {
      }

      #endregion

      #region Public Properties

      public string Name { get; }

      public int Index { get; }

      #endregion
   }
}