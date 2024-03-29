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
       
namespace Infor.Sxe.Common.Data.Models.IC
{
   /// <summary>
   /// Temporary File to Hold Handheld Device Data
   /// </summary>
   
   public partial class IcehBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Key#
      /// </summary>
      [Key,Order]
      public decimal keyno { get; set; }

      /// <summary>
      /// Data-id
      /// </summary>
      public int dataid { get; set; }

      /// <summary>
      /// Handheld Data
      /// </summary>
      [StringValidationAttribute]
      public string indata { get; set; }

      /// <summary>
      /// Label Printed
      /// </summary>
      public bool labelfl { get; set; }

      /// <summary>
      /// Update Run
      /// </summary>
      public bool updfl { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      public int lineno { get; set; }

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
      public static T BuildIcehBaseFromRow<T>(DataRow row) where T:IcehBase, new()
      {
         T entity = new T();
         entity.keyno = row.IsNull("keyno") ? decimal.Zero : row.Field<decimal>("keyno");
         entity.dataid = row.IsNull("dataid") ? 0 : row.Field<int>("dataid");
         entity.indata = row.IsNull("indata") ? string.Empty : row.Field<string>("indata");
         entity.labelfl = row.Field<bool>("labelfl");
         entity.updfl = row.Field<bool>("updfl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("icehRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcehBase(ref DataRow row, IcehBase entity)
      {
         row.SetField("keyno", entity.keyno);
         row.SetField("dataid", entity.dataid);
         row.SetField("indata", entity.indata);
         row.SetField("labelfl", entity.labelfl);
         row.SetField("updfl", entity.updfl);
         row.SetField("lineno", entity.lineno);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("icehRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcehBase entity)
      {
         row.SetField("keyno", entity.keyno);
         row.SetField("icehRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	