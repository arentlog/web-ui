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
   /// Order Detail (Line) Table
   /// </summary>
   
   public partial class OrddtlBase: ModelBase
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
      /// Line Seq
      /// </summary>
      [Key,Order]
      public int lineSequence { get; set; }

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
      /// Work Center
      /// </summary>
      [StringValidationAttribute]
      public string workCenter { get; set; }

      /// <summary>
      /// Pick Line
      /// </summary>
      public bool pickLine { get; set; }

      /// <summary>
      /// Item Number
      /// </summary>
      [StringValidationAttribute]
      public string absNum { get; set; }

      /// <summary>
      /// Stock Status
      /// </summary>
      [StringValidationAttribute]
      public string stockStat { get; set; }

      /// <summary>
      /// Lot
      /// </summary>
      [StringValidationAttribute]
      public string lot { get; set; }

      /// <summary>
      /// Same Lot
      /// </summary>
      public bool sameLot { get; set; }

      /// <summary>
      /// Serial Number
      /// </summary>
      [StringValidationAttribute]
      public string serialNum { get; set; }

      /// <summary>
      /// Location
      /// </summary>
      [StringValidationAttribute]
      public string binNum { get; set; }

      /// <summary>
      /// Full Case Location
      /// </summary>
      [StringValidationAttribute]
      public string flZone { get; set; }

      /// <summary>
      /// Quantity Ordered
      /// </summary>
      public decimal orderedQty { get; set; }

      /// <summary>
      /// Original Quantity
      /// </summary>
      public decimal origReqQty { get; set; }

      /// <summary>
      /// Requested Quantity
      /// </summary>
      public decimal reqQty { get; set; }

      /// <summary>
      /// Actual Quantity
      /// </summary>
      public decimal actQty { get; set; }

      /// <summary>
      /// Quantity Returned
      /// </summary>
      public decimal retQty { get; set; }

      /// <summary>
      /// Item Discount
      /// </summary>
      public decimal discount { get; set; }

      /// <summary>
      /// Tax
      /// </summary>
      public decimal tax { get; set; }

      /// <summary>
      /// Item Price
      /// </summary>
      public decimal charges { get; set; }

      /// <summary>
      /// Comment
      /// </summary>
      [StringValidationAttribute]
      public string comment { get; set; }

      /// <summary>
      /// Allocated
      /// </summary>
      public bool assigned { get; set; }

      /// <summary>
      /// MSDS Required
      /// </summary>
      public bool msdsRequired { get; set; }

      /// <summary>
      /// MSDS Packed
      /// </summary>
      public bool msdsPacked { get; set; }

      /// <summary>
      /// MSDS Employee
      /// </summary>
      [StringValidationAttribute]
      public string msdsEmployee { get; set; }

      /// <summary>
      /// MSDS Sheet
      /// </summary>
      [StringValidationAttribute]
      public string msdsSheet { get; set; }

      /// <summary>
      /// Ord Alt Num
      /// </summary>
      public int orderAltNum { get; set; }

      /// <summary>
      /// Ord Alt Suff
      /// </summary>
      public int orderAltSuf { get; set; }

      /// <summary>
      /// Line Alt Num
      /// </summary>
      public int lineAltNumber { get; set; }

      /// <summary>
      /// Orig. Calc. Weight
      /// </summary>
      public decimal origWeight { get; set; }

      /// <summary>
      /// Drop Weight
      /// </summary>
      public decimal dropWeight { get; set; }

      /// <summary>
      /// Ship Weight
      /// </summary>
      public decimal shipWeight { get; set; }

      /// <summary>
      /// Orig Cube
      /// </summary>
      public decimal origCube { get; set; }

      /// <summary>
      /// Drop Cube
      /// </summary>
      public decimal dropCube { get; set; }

      /// <summary>
      /// Ship Cube
      /// </summary>
      public decimal shipCube { get; set; }

      /// <summary>
      /// RT Number
      /// </summary>
      [StringValidationAttribute]
      public string rtNum { get; set; }

      /// <summary>
      /// Vendor ID
      /// </summary>
      [StringValidationAttribute]
      public string vendorId { get; set; }

      /// <summary>
      /// PO Number
      /// </summary>
      [StringValidationAttribute]
      public string poNumber { get; set; }

      /// <summary>
      /// PO Suffix
      /// </summary>
      [StringValidationAttribute]
      public string poSuffix { get; set; }

      /// <summary>
      /// PO Line
      /// </summary>
      public int poLine { get; set; }

      /// <summary>
      /// PO Line Seq
      /// </summary>
      public int poLineSequence { get; set; }

      /// <summary>
      /// Package Code
      /// </summary>
      [StringValidationAttribute]
      public string packageCode { get; set; }

      /// <summary>
      /// Custom Data
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
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string lineStatus { get; set; }

      /// <summary>
      /// Sale Unit of Measure
      /// </summary>
      [StringValidationAttribute]
      public string saleUom { get; set; }

      /// <summary>
      /// Sale Uom Conv
      /// </summary>
      public decimal saleUomConv { get; set; }

      /// <summary>
      /// Required
      /// </summary>
      public bool kitRequired { get; set; }

      /// <summary>
      /// Trans User
      /// </summary>
      [StringValidationAttribute]
      public string transUser { get; set; }

      /// <summary>
      /// Trans Date
      /// </summary>
      [StringValidationAttribute]
      public string transDate { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transProc { get; set; }

      /// <summary>
      /// WL Pick Type
      /// </summary>
      [StringValidationAttribute]
      public string wlpicktype { get; set; }

      /// <summary>
      /// Original VA Seq
      /// </summary>
      public int origvaseqno { get; set; }

      /// <summary>
      /// Original VA Line
      /// </summary>
      public int origvalineno { get; set; }

      /// <summary>
      /// Lost Business
      /// </summary>
      [StringValidationAttribute]
      public string lostbusty { get; set; }

      /// <summary>
      /// Alt Whse
      /// </summary>
      [StringValidationAttribute]
      public string altwhse { get; set; }

      /// <summary>
      /// Line Ship Complete
      /// </summary>
      public bool shipcompfl { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOrddtlBaseFromRow<T>(DataRow row) where T:OrddtlBase, new()
      {
         T entity = new T();
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.workCenter = row.IsNull("work_center") ? string.Empty : row.Field<string>("work_center");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.pickLine = row.Field<bool>("pick_line");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.sameLot = row.Field<bool>("same_lot");
         entity.serialNum = row.IsNull("serial_num") ? string.Empty : row.Field<string>("serial_num");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.flZone = row.IsNull("fl_zone") ? string.Empty : row.Field<string>("fl_zone");
         entity.orderedQty = row.IsNull("ordered_qty") ? decimal.Zero : row.Field<decimal>("ordered_qty");
         entity.origReqQty = row.IsNull("orig_req_qty") ? decimal.Zero : row.Field<decimal>("orig_req_qty");
         entity.reqQty = row.IsNull("req_qty") ? decimal.Zero : row.Field<decimal>("req_qty");
         entity.actQty = row.IsNull("act_qty") ? decimal.Zero : row.Field<decimal>("act_qty");
         entity.retQty = row.IsNull("ret_qty") ? decimal.Zero : row.Field<decimal>("ret_qty");
         entity.discount = row.IsNull("discount") ? decimal.Zero : row.Field<decimal>("discount");
         entity.tax = row.IsNull("tax") ? decimal.Zero : row.Field<decimal>("tax");
         entity.charges = row.IsNull("charges") ? decimal.Zero : row.Field<decimal>("charges");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.assigned = row.Field<bool>("assigned");
         entity.msdsRequired = row.Field<bool>("msds_required");
         entity.msdsPacked = row.Field<bool>("msds_packed");
         entity.msdsEmployee = row.IsNull("msds_employee") ? string.Empty : row.Field<string>("msds_employee");
         entity.msdsSheet = row.IsNull("msds_sheet") ? string.Empty : row.Field<string>("msds_sheet");
         entity.orderAltNum = row.IsNull("order_alt_num") ? 0 : row.Field<int>("order_alt_num");
         entity.orderAltSuf = row.IsNull("order_alt_suf") ? 0 : row.Field<int>("order_alt_suf");
         entity.lineAltNumber = row.IsNull("line_alt_number") ? 0 : row.Field<int>("line_alt_number");
         entity.origWeight = row.IsNull("orig_weight") ? decimal.Zero : row.Field<decimal>("orig_weight");
         entity.dropWeight = row.IsNull("drop_weight") ? decimal.Zero : row.Field<decimal>("drop_weight");
         entity.shipWeight = row.IsNull("ship_weight") ? decimal.Zero : row.Field<decimal>("ship_weight");
         entity.origCube = row.IsNull("orig_cube") ? decimal.Zero : row.Field<decimal>("orig_cube");
         entity.dropCube = row.IsNull("drop_cube") ? decimal.Zero : row.Field<decimal>("drop_cube");
         entity.shipCube = row.IsNull("ship_cube") ? decimal.Zero : row.Field<decimal>("ship_cube");
         entity.rtNum = row.IsNull("rt_num") ? string.Empty : row.Field<string>("rt_num");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.poNumber = row.IsNull("po_number") ? string.Empty : row.Field<string>("po_number");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.poLine = row.IsNull("po_line") ? 0 : row.Field<int>("po_line");
         entity.poLineSequence = row.IsNull("po_line_sequence") ? 0 : row.Field<int>("po_line_sequence");
         entity.packageCode = row.IsNull("package_code") ? string.Empty : row.Field<string>("package_code");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.lineStatus = row.IsNull("line_status") ? string.Empty : row.Field<string>("line_status");
         entity.saleUom = row.IsNull("sale_uom") ? string.Empty : row.Field<string>("sale_uom");
         entity.saleUomConv = row.IsNull("sale_uom_conv") ? decimal.Zero : row.Field<decimal>("sale_uom_conv");
         entity.kitRequired = row.Field<bool>("kit_required");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.wlpicktype = row.IsNull("wlpicktype") ? string.Empty : row.Field<string>("wlpicktype");
         entity.origvaseqno = row.IsNull("origvaseqno") ? 0 : row.Field<int>("origvaseqno");
         entity.origvalineno = row.IsNull("origvalineno") ? 0 : row.Field<int>("origvalineno");
         entity.lostbusty = row.IsNull("lostbusty") ? string.Empty : row.Field<string>("lostbusty");
         entity.altwhse = row.IsNull("altwhse") ? string.Empty : row.Field<string>("altwhse");
         entity.shipcompfl = row.Field<bool>("shipcompfl");
         entity.rowID = row.Field<byte[]>("orddtlRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOrddtlBase(ref DataRow row, OrddtlBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("work_center", entity.workCenter);
         row.SetField("line", entity.line);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("pick_line", entity.pickLine);
         row.SetField("abs_num", entity.absNum);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("lot", entity.lot);
         row.SetField("same_lot", entity.sameLot);
         row.SetField("serial_num", entity.serialNum);
         row.SetField("bin_num", entity.binNum);
         row.SetField("fl_zone", entity.flZone);
         row.SetField("ordered_qty", entity.orderedQty);
         row.SetField("orig_req_qty", entity.origReqQty);
         row.SetField("req_qty", entity.reqQty);
         row.SetField("act_qty", entity.actQty);
         row.SetField("ret_qty", entity.retQty);
         row.SetField("discount", entity.discount);
         row.SetField("tax", entity.tax);
         row.SetField("charges", entity.charges);
         row.SetField("comment", entity.comment);
         row.SetField("assigned", entity.assigned);
         row.SetField("msds_required", entity.msdsRequired);
         row.SetField("msds_packed", entity.msdsPacked);
         row.SetField("msds_employee", entity.msdsEmployee);
         row.SetField("msds_sheet", entity.msdsSheet);
         row.SetField("order_alt_num", entity.orderAltNum);
         row.SetField("order_alt_suf", entity.orderAltSuf);
         row.SetField("line_alt_number", entity.lineAltNumber);
         row.SetField("orig_weight", entity.origWeight);
         row.SetField("drop_weight", entity.dropWeight);
         row.SetField("ship_weight", entity.shipWeight);
         row.SetField("orig_cube", entity.origCube);
         row.SetField("drop_cube", entity.dropCube);
         row.SetField("ship_cube", entity.shipCube);
         row.SetField("rt_num", entity.rtNum);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("po_number", entity.poNumber);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("po_line", entity.poLine);
         row.SetField("po_line_sequence", entity.poLineSequence);
         row.SetField("package_code", entity.packageCode);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("line_status", entity.lineStatus);
         row.SetField("sale_uom", entity.saleUom);
         row.SetField("sale_uom_conv", entity.saleUomConv);
         row.SetField("kit_required", entity.kitRequired);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("wlpicktype", entity.wlpicktype);
         row.SetField("origvaseqno", entity.origvaseqno);
         row.SetField("origvalineno", entity.origvalineno);
         row.SetField("lostbusty", entity.lostbusty);
         row.SetField("altwhse", entity.altwhse);
         row.SetField("shipcompfl", entity.shipcompfl);
         row.SetField("orddtlRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OrddtlBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("line", entity.line);
         row.SetField("lineSequence", entity.lineSequence);
         row.SetField("orddtlRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	