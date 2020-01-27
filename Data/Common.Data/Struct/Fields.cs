namespace Infor.Sxe.Common.Data.Struct
{
   public struct Fields
   {
      public const string AccountingEntity = "accountingEntity";
      public const string Description = "description";
      public const string Entities = "entities";
      public const string EntityType = "entityType";
      public const string ReadOnly = "readOnly";
      public const string Visible = "visible";
      public const string Location = "location";
      public const string Name = "name";
      public const string DrillbackUrl = "drillbackURL";
      public const string BodReference = "bodReference";
      public const string ViewId = "ViewId";
      public const string LogicalId = "LogicalId";

      public static string Id(int index)
      {
         return "id" + index;
      }
   }
}