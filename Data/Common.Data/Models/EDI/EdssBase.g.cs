//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.EDI
{
   /// <summary>
   /// EDI Segment File
   /// </summary>
   
   public partial class EdssBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Version
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string version { get; set; }

      /// <summary>
      /// Segment
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string segment { get; set; }

      /// <summary>
      /// Element
      /// </summary>
      [Key,Order]
      public decimal element { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip { get; set; }

      /// <summary>
      /// Length
      /// </summary>
      public int size { get; set; }

      /// <summary>
      /// Data Type
      /// </summary>
      [StringValidationAttribute]
      public string type { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildEdssBaseFromRow<T>(DataRow row) where T:EdssBase, new()
      {
         T entity = new T();
         entity.version = row.IsNull("version") ? string.Empty : row.Field<string>("version");
         entity.segment = row.IsNull("segment") ? string.Empty : row.Field<string>("segment");
         entity.element = row.IsNull("element") ? decimal.Zero : row.Field<decimal>("element");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.size = row.IsNull("size") ? 0 : row.Field<int>("size");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("edssRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEdssBase(ref DataRow row, EdssBase entity)
      {
         row.SetField("version", entity.version);
         row.SetField("segment", entity.segment);
         row.SetField("element", entity.element);
         row.SetField("descrip", entity.descrip);
         row.SetField("size", entity.size);
         row.SetField("type", entity.type);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("edssRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, EdssBase entity)
      {
         row.SetField("version", entity.version);
         row.SetField("segment", entity.segment);
         row.SetField("element", entity.element);
         row.SetField("edssRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	