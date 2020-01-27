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
       
namespace Infor.Sxe.Common.Data.Models.PV
{
   /// <summary>
   /// PV SASSM Attributes
   /// </summary>
   
   public partial class PvsassmattrBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Menu Set
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string menuset { get; set; }

      /// <summary>
      /// Function
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string functionname { get; set; }

      /// <summary>
      /// Transl. Mgr. Lang
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string trmgrlang { get; set; }

      /// <summary>
      /// Object ID
      /// </summary>
      [Key,Order]
      public int objid { get; set; }

      /// <summary>
      /// Attribute ID
      /// </summary>
      [Key,Order]
      public int attrid { get; set; }

      /// <summary>
      /// Attribute Name
      /// </summary>
      [StringValidationAttribute]
      public string attrname { get; set; }

      /// <summary>
      /// Attribute Value
      /// </summary>
      [StringValidationAttribute]
      public string attrvalue { get; set; }

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
      public static T BuildPvsassmattrBaseFromRow<T>(DataRow row) where T:PvsassmattrBase, new()
      {
         T entity = new T();
         entity.menuset = row.IsNull("menuset") ? string.Empty : row.Field<string>("menuset");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.attrname = row.IsNull("attrname") ? string.Empty : row.Field<string>("attrname");
         entity.attrvalue = row.IsNull("attrvalue") ? string.Empty : row.Field<string>("attrvalue");
         entity.objid = row.IsNull("objid") ? 0 : row.Field<int>("objid");
         entity.attrid = row.IsNull("attrid") ? 0 : row.Field<int>("attrid");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("pvsassmattrRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPvsassmattrBase(ref DataRow row, PvsassmattrBase entity)
      {
         row.SetField("menuset", entity.menuset);
         row.SetField("functionname", entity.functionname);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("attrname", entity.attrname);
         row.SetField("attrvalue", entity.attrvalue);
         row.SetField("objid", entity.objid);
         row.SetField("attrid", entity.attrid);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("pvsassmattrRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PvsassmattrBase entity)
      {
         row.SetField("menuset", entity.menuset);
         row.SetField("functionname", entity.functionname);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("objid", entity.objid);
         row.SetField("attrid", entity.attrid);
         row.SetField("pvsassmattrRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	