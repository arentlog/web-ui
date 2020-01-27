using System.Data;

namespace Infor.Sxe.IC.Data.Models.Pdsicsp
{
   public partial class Icsp
   {
      public bool bypassicsccopy { get; set; }

      public static void UpdateRowWithExtraFields(ref DataRow row, Icsp entity)
      {
         row.SetField("bypassicsccopy", entity.bypassicsccopy);
      }

      public static T BuildRecordWithExtraFields<T>(T entity, DataRow row)
      {
         var icspReturn = (entity as Icsp);
         if (icspReturn != null)
         {
            icspReturn.bypassicsccopy = row.Field<bool>("bypassicsccopy");
         }
         return entity;
      }
   }
}