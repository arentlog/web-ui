using System;

namespace ServiceInterfaceClient.Attributes
{
   [AttributeUsage(AttributeTargets.Class)]
   public class EntityTypeAttribute : Attribute
   {
      #region Fields

      #endregion

      #region Constructors and Destructors

      public EntityTypeAttribute(string entityType, string drillback, string bodNoun)
      {
         this.EntityType = entityType.Replace(" ", string.Empty);
         this.DrillBack = drillback;
         this.BodNoun = bodNoun.Replace(" ", string.Empty);
      }

      public EntityTypeAttribute(string entityType, string drillback) : this(entityType, drillback, string.Empty)
      {
      }

      public EntityTypeAttribute(string entityType) : this(entityType, string.Empty)
      {
      }

      #endregion

      #region Public Properties

      public string EntityType { get; }

      public string DrillBack { get; }

      public string BodNoun { get; }

      #endregion
   }
}