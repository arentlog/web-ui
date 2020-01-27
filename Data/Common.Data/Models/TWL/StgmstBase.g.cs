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
   /// Stgmst
   /// </summary>
   
   public partial class StgmstBase: ModelBase
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
      /// Container
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string containerId { get; set; }

      /// <summary>
      /// Order
      /// </summary>
      [StringValidationAttribute]
      public string order { get; set; }

      /// <summary>
      /// Order Suffix
      /// </summary>
      [StringValidationAttribute]
      public string orderSuffix { get; set; }

      /// <summary>
      /// Location Id
      /// </summary>
      [StringValidationAttribute]
      public string binNum { get; set; }

      /// <summary>
      /// Employee Number
      /// </summary>
      [StringValidationAttribute]
      public string empNum { get; set; }

      /// <summary>
      /// Date and Time
      /// </summary>
      [StringValidationAttribute]
      public string dateTime { get; set; }

      /// <summary>
      /// Container Type
      /// </summary>
      [StringValidationAttribute]
      public string containerType { get; set; }

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
      public static T BuildStgmstBaseFromRow<T>(DataRow row) where T:StgmstBase, new()
      {
         T entity = new T();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.containerId = row.IsNull("container_id") ? string.Empty : row.Field<string>("container_id");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.containerType = row.IsNull("container_type") ? string.Empty : row.Field<string>("container_type");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("stgmstRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromStgmstBase(ref DataRow row, StgmstBase entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("container_id", entity.containerId);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("bin_num", entity.binNum);
         row.SetField("emp_num", entity.empNum);
         row.SetField("date_time", entity.dateTime);
         row.SetField("container_type", entity.containerType);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("stgmstRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, StgmstBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("containerId", entity.containerId);
         row.SetField("stgmstRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	