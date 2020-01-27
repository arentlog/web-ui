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
   /// Contains the detail for production staging
   /// </summary>
   
   public partial class ProdStgDtlBase: ModelBase
   {

      /// <summary>
      /// Id
      /// </summary>
      [Key,Order]
      public int id { get; set; }

      /// <summary>
      /// Line
      /// </summary>
      [Key,Order]
      public int line { get; set; }

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
      /// From Location
      /// </summary>
      [StringValidationAttribute]
      public string fromBin { get; set; }

      /// <summary>
      /// To Location
      /// </summary>
      [StringValidationAttribute]
      public string toBin { get; set; }

      /// <summary>
      /// Allocated
      /// </summary>
      public bool allocationStatus { get; set; }

      /// <summary>
      /// Line Status
      /// </summary>
      [StringValidationAttribute]
      public string lineStatus { get; set; }

      /// <summary>
      /// Quantity
      /// </summary>
      public decimal itemQty { get; set; }

      /// <summary>
      /// Actual Quantity
      /// </summary>
      public decimal actQty { get; set; }

      /// <summary>
      /// Kit Quantity
      /// </summary>
      public decimal kitQty { get; set; }

      /// <summary>
      /// Item Number
      /// </summary>
      [StringValidationAttribute]
      public string kitNum { get; set; }

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
      public static T BuildProdStgDtlBaseFromRow<T>(DataRow row) where T:ProdStgDtlBase, new()
      {
         T entity = new T();
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.fromBin = row.IsNull("from_bin") ? string.Empty : row.Field<string>("from_bin");
         entity.toBin = row.IsNull("to_bin") ? string.Empty : row.Field<string>("to_bin");
         entity.allocationStatus = row.Field<bool>("allocation_status");
         entity.lineStatus = row.IsNull("line_status") ? string.Empty : row.Field<string>("line_status");
         entity.itemQty = row.IsNull("item_qty") ? decimal.Zero : row.Field<decimal>("item_qty");
         entity.actQty = row.IsNull("act_qty") ? decimal.Zero : row.Field<decimal>("act_qty");
         entity.kitQty = row.IsNull("kit_qty") ? decimal.Zero : row.Field<decimal>("kit_qty");
         entity.kitNum = row.IsNull("kit_num") ? string.Empty : row.Field<string>("kit_num");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("prod_stg_dtlRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromProdStgDtlBase(ref DataRow row, ProdStgDtlBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("line", entity.line);
         row.SetField("abs_num", entity.absNum);
         row.SetField("lot", entity.lot);
         row.SetField("from_bin", entity.fromBin);
         row.SetField("to_bin", entity.toBin);
         row.SetField("allocation_status", entity.allocationStatus);
         row.SetField("line_status", entity.lineStatus);
         row.SetField("item_qty", entity.itemQty);
         row.SetField("act_qty", entity.actQty);
         row.SetField("kit_qty", entity.kitQty);
         row.SetField("kit_num", entity.kitNum);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("prod_stg_dtlRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, ProdStgDtlBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("line", entity.line);
         row.SetField("prod_stg_dtlRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	