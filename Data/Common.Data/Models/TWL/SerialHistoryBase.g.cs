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
   /// Cross-reference of serial numbers to order detail
   /// </summary>
   
   public partial class SerialHistoryBase: ModelBase
   {

      /// <summary>
      /// Company
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string coNum { get; set; }

      /// <summary>
      /// Warehouse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whNum { get; set; }

      /// <summary>
      /// Order
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string order { get; set; }

      /// <summary>
      /// Order Suffix
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string orderSuffix { get; set; }

      /// <summary>
      /// Line
      /// </summary>
      [Key,Order]
      public int line { get; set; }

      /// <summary>
      /// 
      /// </summary>
      [Key,Order]
      public int lineSequence { get; set; }

      /// <summary>
      /// Serial Number
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string serialNum { get; set; }

      /// <summary>
      /// Order Type
      /// </summary>
      [StringValidationAttribute]
      public string type { get; set; }

      /// <summary>
      /// Item Number
      /// </summary>
      [StringValidationAttribute]
      public string absNum { get; set; }

      /// <summary>
      /// RMA
      /// </summary>
      [StringValidationAttribute]
      public string rma { get; set; }

      /// <summary>
      /// Pick Id
      /// </summary>
      public int pickId { get; set; }

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
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSerialHistoryBaseFromRow<T>(DataRow row) where T:SerialHistoryBase, new()
      {
         T entity = new T();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.serialNum = row.IsNull("serial_num") ? string.Empty : row.Field<string>("serial_num");
         entity.rma = row.IsNull("rma") ? string.Empty : row.Field<string>("rma");
         entity.pickId = row.IsNull("pick_id") ? 0 : row.Field<int>("pick_id");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("serial_historyRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSerialHistoryBase(ref DataRow row, SerialHistoryBase entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("type", entity.type);
         row.SetField("line", entity.line);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("abs_num", entity.absNum);
         row.SetField("serial_num", entity.serialNum);
         row.SetField("rma", entity.rma);
         row.SetField("pick_id", entity.pickId);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("serial_historyRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SerialHistoryBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("order", entity.order);
         row.SetField("orderSuffix", entity.orderSuffix);
         row.SetField("line", entity.line);
         row.SetField("lineSequence", entity.lineSequence);
         row.SetField("serialNum", entity.serialNum);
         row.SetField("serial_historyRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	