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

namespace Infor.Sxe.TWL.Data.Models.Pdsorderdetail
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsorderdetail.Orderlines")]
   public partial class Orderlines : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      public decimal actualFreight { get; set; }
      public int line { get; set; }
      public int lineAltNumber { get; set; }
      public int lineSequence { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string absNumDesc { get; set; }
      public decimal actQty { get; set; }
      [StringValidationAttribute]
      public string altwhse { get; set; }
      public bool assigned { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      public decimal charges { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
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
      public decimal discount { get; set; }
      public decimal dropCube { get; set; }
      public decimal dropWeight { get; set; }
      [StringValidationAttribute]
      public string flZone { get; set; }
      public int id { get; set; }
      public bool kitRequired { get; set; }
      [StringValidationAttribute]
      public string lineStatus { get; set; }
      [StringValidationAttribute]
      public string lineStatusDesc { get; set; }
      [StringValidationAttribute]
      public string lostbusty { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string msdsEmployee { get; set; }
      public bool msdsPacked { get; set; }
      public bool msdsRequired { get; set; }
      [StringValidationAttribute]
      public string msdsSheet { get; set; }
      public int orderAltNum { get; set; }
      public int orderAltSuf { get; set; }
      public decimal orderedQty { get; set; }
      public decimal origCube { get; set; }
      public decimal origReqQty { get; set; }
      public decimal origWeight { get; set; }
      public int origvalineno { get; set; }
      public int origvaseqno { get; set; }
      [StringValidationAttribute]
      public string packageCode { get; set; }
      public bool pickLine { get; set; }
      public int poLine { get; set; }
      public int poLineSequence { get; set; }
      [StringValidationAttribute]
      public string poNumber { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      public decimal reqQty { get; set; }
      public decimal retQty { get; set; }
      [StringValidationAttribute]
      public string rtNum { get; set; }
      [StringValidationAttribute]
      public string saleUom { get; set; }
      public decimal saleUomConv { get; set; }
      public bool sameLot { get; set; }
      [StringValidationAttribute]
      public string serialNum { get; set; }
      public decimal shipCube { get; set; }
      public decimal shipWeight { get; set; }
      public bool shipcompfl { get; set; }
      [StringValidationAttribute]
      public string stockStat { get; set; }
      public decimal tax { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string wlpicktype { get; set; }
      [StringValidationAttribute]
      public string workCenter { get; set; }
      public bool isComments { get; set; }
      public bool itemSerialFlag { get; set; }
      [StringValidationAttribute]
      public string rowID { get; set; }
      [StringValidationAttribute]
      public string transDate { get; set; }
      [StringValidationAttribute]
      public string transProc { get; set; }
      [StringValidationAttribute]
      public string transUser { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Orderlines BuildOrderlinesFromRow(DataRow row)
      {
         Orderlines entity = new Orderlines();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.actualFreight = row.IsNull("actual_freight") ? decimal.Zero : row.Field<decimal>("actual_freight");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineAltNumber = row.IsNull("line_alt_number") ? 0 : row.Field<int>("line_alt_number");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.absNumDesc = row.IsNull("abs_num_desc") ? string.Empty : row.Field<string>("abs_num_desc");
         entity.actQty = row.IsNull("act_qty") ? decimal.Zero : row.Field<decimal>("act_qty");
         entity.altwhse = row.IsNull("altwhse") ? string.Empty : row.Field<string>("altwhse");
         entity.assigned = row.Field<bool>("assigned");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.charges = row.IsNull("charges") ? decimal.Zero : row.Field<decimal>("charges");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.discount = row.IsNull("discount") ? decimal.Zero : row.Field<decimal>("discount");
         entity.dropCube = row.IsNull("drop_cube") ? decimal.Zero : row.Field<decimal>("drop_cube");
         entity.dropWeight = row.IsNull("drop_weight") ? decimal.Zero : row.Field<decimal>("drop_weight");
         entity.flZone = row.IsNull("fl_zone") ? string.Empty : row.Field<string>("fl_zone");
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.kitRequired = row.Field<bool>("kit_required");
         entity.lineStatus = row.IsNull("line_status") ? string.Empty : row.Field<string>("line_status");
         entity.lineStatusDesc = row.IsNull("line_status_desc") ? string.Empty : row.Field<string>("line_status_desc");
         entity.lostbusty = row.IsNull("lostbusty") ? string.Empty : row.Field<string>("lostbusty");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.msdsEmployee = row.IsNull("msds_employee") ? string.Empty : row.Field<string>("msds_employee");
         entity.msdsPacked = row.Field<bool>("msds_packed");
         entity.msdsRequired = row.Field<bool>("msds_required");
         entity.msdsSheet = row.IsNull("msds_sheet") ? string.Empty : row.Field<string>("msds_sheet");
         entity.orderAltNum = row.IsNull("order_alt_num") ? 0 : row.Field<int>("order_alt_num");
         entity.orderAltSuf = row.IsNull("order_alt_suf") ? 0 : row.Field<int>("order_alt_suf");
         entity.orderedQty = row.IsNull("ordered_qty") ? decimal.Zero : row.Field<decimal>("ordered_qty");
         entity.origCube = row.IsNull("orig_cube") ? decimal.Zero : row.Field<decimal>("orig_cube");
         entity.origReqQty = row.IsNull("orig_req_qty") ? decimal.Zero : row.Field<decimal>("orig_req_qty");
         entity.origWeight = row.IsNull("orig_weight") ? decimal.Zero : row.Field<decimal>("orig_weight");
         entity.origvalineno = row.IsNull("origvalineno") ? 0 : row.Field<int>("origvalineno");
         entity.origvaseqno = row.IsNull("origvaseqno") ? 0 : row.Field<int>("origvaseqno");
         entity.packageCode = row.IsNull("package_code") ? string.Empty : row.Field<string>("package_code");
         entity.pickLine = row.Field<bool>("pick_line");
         entity.poLine = row.IsNull("po_line") ? 0 : row.Field<int>("po_line");
         entity.poLineSequence = row.IsNull("po_line_sequence") ? 0 : row.Field<int>("po_line_sequence");
         entity.poNumber = row.IsNull("po_number") ? string.Empty : row.Field<string>("po_number");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.reqQty = row.IsNull("req_qty") ? decimal.Zero : row.Field<decimal>("req_qty");
         entity.retQty = row.IsNull("ret_qty") ? decimal.Zero : row.Field<decimal>("ret_qty");
         entity.rtNum = row.IsNull("rt_num") ? string.Empty : row.Field<string>("rt_num");
         entity.saleUom = row.IsNull("sale_uom") ? string.Empty : row.Field<string>("sale_uom");
         entity.saleUomConv = row.IsNull("sale_uom_conv") ? decimal.Zero : row.Field<decimal>("sale_uom_conv");
         entity.sameLot = row.Field<bool>("same_lot");
         entity.serialNum = row.IsNull("serial_num") ? string.Empty : row.Field<string>("serial_num");
         entity.shipCube = row.IsNull("ship_cube") ? decimal.Zero : row.Field<decimal>("ship_cube");
         entity.shipWeight = row.IsNull("ship_weight") ? decimal.Zero : row.Field<decimal>("ship_weight");
         entity.shipcompfl = row.Field<bool>("shipcompfl");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.tax = row.IsNull("tax") ? decimal.Zero : row.Field<decimal>("tax");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.wlpicktype = row.IsNull("wlpicktype") ? string.Empty : row.Field<string>("wlpicktype");
         entity.workCenter = row.IsNull("work_center") ? string.Empty : row.Field<string>("work_center");
         entity.isComments = row.Field<bool>("isComments");
         entity.itemSerialFlag = row.Field<bool>("item_serial_flag");
         entity.rowID = row.Field<byte[]>("rowID").ToStringEncoded();
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOrderlines(ref DataRow row, Orderlines entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("actual_freight", entity.actualFreight);
         row.SetField("line", entity.line);
         row.SetField("line_alt_number", entity.lineAltNumber);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("abs_num", entity.absNum);
         row.SetField("abs_num_desc", entity.absNumDesc);
         row.SetField("act_qty", entity.actQty);
         row.SetField("altwhse", entity.altwhse);
         row.SetField("assigned", entity.assigned);
         row.SetField("bin_num", entity.binNum);
         row.SetField("charges", entity.charges);
         row.SetField("comment", entity.comment);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("discount", entity.discount);
         row.SetField("drop_cube", entity.dropCube);
         row.SetField("drop_weight", entity.dropWeight);
         row.SetField("fl_zone", entity.flZone);
         row.SetField("id", entity.id);
         row.SetField("kit_required", entity.kitRequired);
         row.SetField("line_status", entity.lineStatus);
         row.SetField("line_status_desc", entity.lineStatusDesc);
         row.SetField("lostbusty", entity.lostbusty);
         row.SetField("lot", entity.lot);
         row.SetField("msds_employee", entity.msdsEmployee);
         row.SetField("msds_packed", entity.msdsPacked);
         row.SetField("msds_required", entity.msdsRequired);
         row.SetField("msds_sheet", entity.msdsSheet);
         row.SetField("order_alt_num", entity.orderAltNum);
         row.SetField("order_alt_suf", entity.orderAltSuf);
         row.SetField("ordered_qty", entity.orderedQty);
         row.SetField("orig_cube", entity.origCube);
         row.SetField("orig_req_qty", entity.origReqQty);
         row.SetField("orig_weight", entity.origWeight);
         row.SetField("origvalineno", entity.origvalineno);
         row.SetField("origvaseqno", entity.origvaseqno);
         row.SetField("package_code", entity.packageCode);
         row.SetField("pick_line", entity.pickLine);
         row.SetField("po_line", entity.poLine);
         row.SetField("po_line_sequence", entity.poLineSequence);
         row.SetField("po_number", entity.poNumber);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("req_qty", entity.reqQty);
         row.SetField("ret_qty", entity.retQty);
         row.SetField("rt_num", entity.rtNum);
         row.SetField("sale_uom", entity.saleUom);
         row.SetField("sale_uom_conv", entity.saleUomConv);
         row.SetField("same_lot", entity.sameLot);
         row.SetField("serial_num", entity.serialNum);
         row.SetField("ship_cube", entity.shipCube);
         row.SetField("ship_weight", entity.shipWeight);
         row.SetField("shipcompfl", entity.shipcompfl);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("tax", entity.tax);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("wlpicktype", entity.wlpicktype);
         row.SetField("work_center", entity.workCenter);
         row.SetField("isComments", entity.isComments);
         row.SetField("item_serial_flag", entity.itemSerialFlag);
         row.SetField("rowID", entity.rowID.ToByteArray());
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("trans_user", entity.transUser);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
