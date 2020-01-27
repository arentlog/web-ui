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
   /// PV Sassm Links
   /// </summary>
   
   public partial class PvsassmlinkBase: ModelBase, IUserFields
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
      /// Link ID
      /// </summary>
      [Key,Order]
      public int linkid { get; set; }

      /// <summary>
      /// Source Object ID
      /// </summary>
      public int source { get; set; }

      /// <summary>
      /// Target Object ID
      /// </summary>
      public int target { get; set; }

      /// <summary>
      /// Link Type
      /// </summary>
      [StringValidationAttribute]
      public string linktype { get; set; }

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
      public static T BuildPvsassmlinkBaseFromRow<T>(DataRow row) where T:PvsassmlinkBase, new()
      {
         T entity = new T();
         entity.menuset = row.IsNull("menuset") ? string.Empty : row.Field<string>("menuset");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.objid = row.IsNull("objid") ? 0 : row.Field<int>("objid");
         entity.linkid = row.IsNull("linkid") ? 0 : row.Field<int>("linkid");
         entity.source = row.IsNull("source") ? 0 : row.Field<int>("source");
         entity.target = row.IsNull("target") ? 0 : row.Field<int>("target");
         entity.linktype = row.IsNull("linktype") ? string.Empty : row.Field<string>("linktype");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.rowID = row.Field<byte[]>("pvsassmlinkRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPvsassmlinkBase(ref DataRow row, PvsassmlinkBase entity)
      {
         row.SetField("menuset", entity.menuset);
         row.SetField("functionname", entity.functionname);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("objid", entity.objid);
         row.SetField("linkid", entity.linkid);
         row.SetField("source", entity.source);
         row.SetField("target", entity.target);
         row.SetField("linktype", entity.linktype);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("pvsassmlinkRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PvsassmlinkBase entity)
      {
         row.SetField("menuset", entity.menuset);
         row.SetField("functionname", entity.functionname);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("objid", entity.objid);
         row.SetField("linkid", entity.linkid);
         row.SetField("pvsassmlinkRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	