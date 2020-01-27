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
   /// Contains discrepancy records
   /// </summary>
   
   public partial class InvProbBase: ModelBase
   {

      /// <summary>
      /// Inv Problem Id
      /// </summary>
      public int invProbId { get; set; }

      /// <summary>
      /// Transaction Number
      /// </summary>
      public int transNum { get; set; }

      /// <summary>
      /// Transaction Type
      /// </summary>
      [StringValidationAttribute]
      public string transType { get; set; }

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
      /// Location
      /// </summary>
      [StringValidationAttribute]
      public string binNum { get; set; }

      /// <summary>
      /// Expected Location
      /// </summary>
      [StringValidationAttribute]
      public string expBin { get; set; }

      /// <summary>
      /// Pallet Id
      /// </summary>
      [StringValidationAttribute]
      public string palletId { get; set; }

      /// <summary>
      /// Pallet Id
      /// </summary>
      [StringValidationAttribute]
      public string expPallet { get; set; }

      /// <summary>
      /// Absolute Item Number
      /// </summary>
      [StringValidationAttribute]
      public string absNum { get; set; }

      /// <summary>
      /// Lot
      /// </summary>
      [StringValidationAttribute]
      public string lot { get; set; }

      /// <summary>
      /// Catalog Number
      /// </summary>
      [StringValidationAttribute]
      public string itemNum { get; set; }

      /// <summary>
      /// Actual Qty
      /// </summary>
      public decimal actualQty { get; set; }

      /// <summary>
      /// Expected Qty
      /// </summary>
      public decimal expQty { get; set; }

      /// <summary>
      /// Printed
      /// </summary>
      public bool printed { get; set; }

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
      /// Case Quantity
      /// </summary>
      public decimal caseQuantity { get; set; }

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
      /// Lot Before
      /// </summary>
      [StringValidationAttribute]
      public string lotBefore { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildInvProbBaseFromRow<T>(DataRow row) where T:InvProbBase, new()
      {
         T entity = new T();
         entity.invProbId = row.IsNull("inv_prob_id") ? 0 : row.Field<int>("inv_prob_id");
         entity.transNum = row.IsNull("trans_num") ? 0 : row.Field<int>("trans_num");
         entity.transType = row.IsNull("trans_type") ? string.Empty : row.Field<string>("trans_type");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.expBin = row.IsNull("exp_bin") ? string.Empty : row.Field<string>("exp_bin");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.expPallet = row.IsNull("exp_pallet") ? string.Empty : row.Field<string>("exp_pallet");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.itemNum = row.IsNull("item_num") ? string.Empty : row.Field<string>("item_num");
         entity.actualQty = row.IsNull("actual_qty") ? decimal.Zero : row.Field<decimal>("actual_qty");
         entity.expQty = row.IsNull("exp_qty") ? decimal.Zero : row.Field<decimal>("exp_qty");
         entity.printed = row.Field<bool>("printed");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.caseQuantity = row.IsNull("case_quantity") ? decimal.Zero : row.Field<decimal>("case_quantity");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.lotBefore = row.IsNull("lot_before") ? string.Empty : row.Field<string>("lot_before");
         entity.rowID = row.Field<byte[]>("inv_probRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromInvProbBase(ref DataRow row, InvProbBase entity)
      {
         row.SetField("inv_prob_id", entity.invProbId);
         row.SetField("trans_num", entity.transNum);
         row.SetField("trans_type", entity.transType);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("bin_num", entity.binNum);
         row.SetField("exp_bin", entity.expBin);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("exp_pallet", entity.expPallet);
         row.SetField("abs_num", entity.absNum);
         row.SetField("lot", entity.lot);
         row.SetField("item_num", entity.itemNum);
         row.SetField("actual_qty", entity.actualQty);
         row.SetField("exp_qty", entity.expQty);
         row.SetField("printed", entity.printed);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("case_quantity", entity.caseQuantity);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("lot_before", entity.lotBefore);
         row.SetField("inv_probRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, InvProbBase entity)
      {
         row.SetField("inv_probRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	