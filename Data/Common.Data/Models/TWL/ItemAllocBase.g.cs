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
       
namespace Infor.Sxe.Common.Data.Models.TWL
{
   /// <summary>
   /// Reserves allocated inventory (i.e.: makes it unavailable)
   /// </summary>
   
   public partial class ItemAllocBase: ModelBase
   {

      /// <summary>
      /// Id
      /// </summary>
      public int id { get; set; }

      /// <summary>
      /// Time Stamp
      /// </summary>
      [StringValidationAttribute]
      public string dateTime { get; set; }

      /// <summary>
      /// Company
      /// </summary>
      [StringValidationAttribute]
      public string coNum { get; set; }

      /// <summary>
      /// Warehouse
      /// </summary>
      [StringValidationAttribute]
      public string whNum { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [StringValidationAttribute]
      public string type { get; set; }

      /// <summary>
      /// key1
      /// </summary>
      public int key1 { get; set; }

      /// <summary>
      /// key2
      /// </summary>
      public int key2 { get; set; }

      /// <summary>
      /// key3
      /// </summary>
      public int key3 { get; set; }

      /// <summary>
      /// Item Number
      /// </summary>
      [StringValidationAttribute]
      public string absNum { get; set; }

      /// <summary>
      /// Lot
      /// </summary>
      [StringValidationAttribute]
      public string lot { get; set; }

      /// <summary>
      /// Quantity
      /// </summary>
      public decimal quantity { get; set; }

      /// <summary>
      /// Employee Number
      /// </summary>
      [StringValidationAttribute]
      public string empNum { get; set; }

      /// <summary>
      /// Transaction Number
      /// </summary>
      public int transNum { get; set; }

      /// <summary>
      /// comment
      /// </summary>
      [StringValidationAttribute]
      public string comment { get; set; }

      /// <summary>
      /// custom_data1
      /// </summary>
      [StringValidationAttribute]
      public string customData1 { get; set; }
      [StringValidationAttribute]
      public string customData2 { get; set; }
      [StringValidationAttribute]
      public string customData3 { get; set; }
      [StringValidationAttribute]
      public string customData4 { get; set; }
      [StringValidationAttribute]
      public string customData5 { get; set; }

      /// <summary>
      /// trans_user
      /// </summary>
      [StringValidationAttribute]
      public string transUser { get; set; }

      /// <summary>
      /// trans_date
      /// </summary>
      [StringValidationAttribute]
      public string transDate { get; set; }

      /// <summary>
      /// trans_proc
      /// </summary>
      [StringValidationAttribute]
      public string transProc { get; set; }

      /// <summary>
      /// Alt. Parent Whse
      /// </summary>
      [StringValidationAttribute]
      public string altparentwhse { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildItemAllocBaseFromRow<T>(DataRow row) where T:ItemAllocBase, new()
      {
         T entity = new T();
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.key1 = row.IsNull("key1") ? 0 : row.Field<int>("key1");
         entity.key2 = row.IsNull("key2") ? 0 : row.Field<int>("key2");
         entity.key3 = row.IsNull("key3") ? 0 : row.Field<int>("key3");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.transNum = row.IsNull("trans_num") ? 0 : row.Field<int>("trans_num");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.altparentwhse = row.IsNull("altparentwhse") ? string.Empty : row.Field<string>("altparentwhse");
         entity.rowID = row.Field<byte[]>("item_allocRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromItemAllocBase(ref DataRow row, ItemAllocBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("date_time", entity.dateTime);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("type", entity.type);
         row.SetField("key1", entity.key1);
         row.SetField("key2", entity.key2);
         row.SetField("key3", entity.key3);
         row.SetField("abs_num", entity.absNum);
         row.SetField("lot", entity.lot);
         row.SetField("quantity", entity.quantity);
         row.SetField("emp_num", entity.empNum);
         row.SetField("trans_num", entity.transNum);
         row.SetField("comment", entity.comment);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("altparentwhse", entity.altparentwhse);
         row.SetField("item_allocRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ItemAllocBase entity)
      {
         row.SetField("item_allocRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	