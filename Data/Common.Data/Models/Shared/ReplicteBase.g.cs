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
       
namespace Infor.Sxe.Common.Data.Models.SHARED
{
   /// <summary>
   /// Replication Trigger Log 
   /// </summary>
   
   public partial class ReplicteBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Table Name
      /// </summary>
      [StringValidationAttribute]
      public string tablenm { get; set; }

      /// <summary>
      /// New Record
      /// </summary>
      public string newrecord { get; set; }

      /// <summary>
      /// Old Record
      /// </summary>
      public string oldrecord { get; set; }

      /// <summary>
      /// Created Date
      /// </summary>
      public DateTime? createdt { get; set; }

      /// <summary>
      /// Created Time
      /// </summary>
      public int createtm { get; set; }

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
      /// Dump Name
      /// </summary>
      [StringValidationAttribute]
      public string dumpnm { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildReplicteBaseFromRow<T>(DataRow row) where T:ReplicteBase, new()
      {
         T entity = new T();
         entity.tablenm = row.IsNull("tablenm") ? string.Empty : row.Field<string>("tablenm");
         entity.newrecord = row.Field<byte[]>("newrecord").ToStringEncoded();
         entity.oldrecord = row.Field<byte[]>("oldrecord").ToStringEncoded();
         entity.createdt = row.Field<DateTime?>("createdt");
         entity.createtm = row.IsNull("createtm") ? 0 : row.Field<int>("createtm");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.dumpnm = row.IsNull("dumpnm") ? string.Empty : row.Field<string>("dumpnm");
         entity.rowID = row.Field<byte[]>("replicteRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReplicteBase(ref DataRow row, ReplicteBase entity)
      {
         row.SetField("tablenm", entity.tablenm);
         row.SetField("newrecord", entity.newrecord.ToByteArray());
         row.SetField("oldrecord", entity.oldrecord.ToByteArray());
         row.SetField("createdt", entity.createdt);
         row.SetField("createtm", entity.createtm);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("dumpnm", entity.dumpnm);
         row.SetField("replicteRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ReplicteBase entity)
      {
         row.SetField("replicteRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	