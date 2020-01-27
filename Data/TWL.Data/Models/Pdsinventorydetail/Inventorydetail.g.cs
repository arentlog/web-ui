//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 13370 $
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
using System.Collections.Generic;
using System.Linq;
using HelpPageErrorSimulator.HelpArea.Areas.HelpPage.ModelDescriptions;
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;

namespace Infor.Sxe.TWL.Data.Models.Pdsinventorydetail
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsinventorydetail.Inventorydetail")]
   public partial class Inventorydetail : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string attributes { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string cargoControl { get; set; }
      public decimal caseQuantity { get; set; }
      [StringValidationAttribute]
      public string countryCode { get; set; }
      [StringValidationAttribute]
      public string crossDockOrder { get; set; }
      [StringValidationAttribute]
      public string crossDockOrderSuffix { get; set; }
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
      [StringValidationAttribute]
      public string cycleEmpNum { get; set; }
      public bool cycleFlag { get; set; }
      public int cycleId { get; set; }
      [StringValidationAttribute]
      public string cycleLevel { get; set; }
      [StringValidationAttribute]
      public string dateTimeRec { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      public DateTime? dateExpiration { get; set; }
      public int id { get; set; }
      public decimal itemCost { get; set; }
      [StringValidationAttribute]
      public string itemDesc { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string nsComment { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string poNumber { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      public decimal reservedQty { get; set; }
      [StringValidationAttribute]
      public string rtnCategory { get; set; }
      public bool rtnPalletFull { get; set; }
      [StringValidationAttribute]
      public string stockStat { get; set; }
      [StringValidationAttribute]
      public string suggestedBin { get; set; }
      public int taskId { get; set; }
      public decimal totalQty { get; set; }
      [StringValidationAttribute]
      public string transDate { get; set; }
      [StringValidationAttribute]
      public string transProc { get; set; }
      [StringValidationAttribute]
      public string transUser { get; set; }
      [StringValidationAttribute]
      public string truckId { get; set; }
      [StringValidationAttribute]
      public string uom { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      public bool isTransEnabled { get; set; }
      public bool isMovesEnabled { get; set; }
      public bool isReplsEnabled { get; set; }
      public bool isPicksEnabled { get; set; }
      public bool isSerialEnabled { get; set; }
      [StringValidationAttribute]
      public string itemRowID { get; set; }
      [StringValidationAttribute]
      public string binmstRowID { get; set; }
      [StringValidationAttribute]
      public string inventoryRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Inventorydetail BuildInventorydetailFromRow(DataRow row)
      {
         Inventorydetail entity = new Inventorydetail();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.attributes = row.IsNull("attributes") ? string.Empty : row.Field<string>("attributes");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.cargoControl = row.IsNull("cargo_control") ? string.Empty : row.Field<string>("cargo_control");
         entity.caseQuantity = row.IsNull("case_quantity") ? decimal.Zero : row.Field<decimal>("case_quantity");
         entity.countryCode = row.IsNull("country_code") ? string.Empty : row.Field<string>("country_code");
         entity.crossDockOrder = row.IsNull("cross_dock_order") ? string.Empty : row.Field<string>("cross_dock_order");
         entity.crossDockOrderSuffix = row.IsNull("cross_dock_order_suffix") ? string.Empty : row.Field<string>("cross_dock_order_suffix");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.cycleEmpNum = row.IsNull("cycle_emp_num") ? string.Empty : row.Field<string>("cycle_emp_num");
         entity.cycleFlag = row.Field<bool>("cycle_flag");
         entity.cycleId = row.IsNull("cycle_id") ? 0 : row.Field<int>("cycle_id");
         entity.cycleLevel = row.IsNull("cycle_level") ? string.Empty : row.Field<string>("cycle_level");
         entity.dateTimeRec = row.IsNull("date_time_rec") ? string.Empty : row.Field<string>("date_time_rec");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.dateExpiration = row.Field<DateTime?>("date_expiration");
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.itemCost = row.IsNull("item_cost") ? decimal.Zero : row.Field<decimal>("item_cost");
         entity.itemDesc = row.IsNull("item_desc") ? string.Empty : row.Field<string>("item_desc");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.nsComment = row.IsNull("ns_comment") ? string.Empty : row.Field<string>("ns_comment");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.poNumber = row.IsNull("po_number") ? string.Empty : row.Field<string>("po_number");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.reservedQty = row.IsNull("reserved_qty") ? decimal.Zero : row.Field<decimal>("reserved_qty");
         entity.rtnCategory = row.IsNull("rtn_category") ? string.Empty : row.Field<string>("rtn_category");
         entity.rtnPalletFull = row.Field<bool>("rtn_pallet_full");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.suggestedBin = row.IsNull("suggested_bin") ? string.Empty : row.Field<string>("suggested_bin");
         entity.taskId = row.IsNull("task_id") ? 0 : row.Field<int>("task_id");
         entity.totalQty = row.IsNull("total_qty") ? decimal.Zero : row.Field<decimal>("total_qty");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.truckId = row.IsNull("truck_id") ? string.Empty : row.Field<string>("truck_id");
         entity.uom = row.IsNull("uom") ? string.Empty : row.Field<string>("uom");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.isTransEnabled = row.Field<bool>("is_trans_enabled");
         entity.isMovesEnabled = row.Field<bool>("is_moves_enabled");
         entity.isReplsEnabled = row.Field<bool>("is_repls_enabled");
         entity.isPicksEnabled = row.Field<bool>("is_picks_enabled");
         entity.isSerialEnabled = row.Field<bool>("is_serial_enabled");
         entity.itemRowID = row.Field<byte[]>("itemRowID").ToStringEncoded();
         entity.binmstRowID = row.Field<byte[]>("binmstRowID").ToStringEncoded();
         entity.inventoryRowID = row.Field<byte[]>("inventoryRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromInventorydetail(ref DataRow row, Inventorydetail entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("attributes", entity.attributes);
         row.SetField("bin_num", entity.binNum);
         row.SetField("cargo_control", entity.cargoControl);
         row.SetField("case_quantity", entity.caseQuantity);
         row.SetField("country_code", entity.countryCode);
         row.SetField("cross_dock_order", entity.crossDockOrder);
         row.SetField("cross_dock_order_suffix", entity.crossDockOrderSuffix);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("cycle_emp_num", entity.cycleEmpNum);
         row.SetField("cycle_flag", entity.cycleFlag);
         row.SetField("cycle_id", entity.cycleId);
         row.SetField("cycle_level", entity.cycleLevel);
         row.SetField("date_time_rec", entity.dateTimeRec);
         row.SetField("emp_num", entity.empNum);
         row.SetField("date_expiration", entity.dateExpiration);
         row.SetField("id", entity.id);
         row.SetField("item_cost", entity.itemCost);
         row.SetField("item_desc", entity.itemDesc);
         row.SetField("lot", entity.lot);
         row.SetField("ns_comment", entity.nsComment);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("po_number", entity.poNumber);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("reserved_qty", entity.reservedQty);
         row.SetField("rtn_category", entity.rtnCategory);
         row.SetField("rtn_pallet_full", entity.rtnPalletFull);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("suggested_bin", entity.suggestedBin);
         row.SetField("task_id", entity.taskId);
         row.SetField("total_qty", entity.totalQty);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("trans_user", entity.transUser);
         row.SetField("truck_id", entity.truckId);
         row.SetField("uom", entity.uom);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("is_trans_enabled", entity.isTransEnabled);
         row.SetField("is_moves_enabled", entity.isMovesEnabled);
         row.SetField("is_repls_enabled", entity.isReplsEnabled);
         row.SetField("is_picks_enabled", entity.isPicksEnabled);
         row.SetField("is_serial_enabled", entity.isSerialEnabled);
         row.SetField("itemRowID", entity.itemRowID.ToByteArray());
         row.SetField("binmstRowID", entity.binmstRowID.ToByteArray());
         row.SetField("inventoryRowID", entity.inventoryRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591