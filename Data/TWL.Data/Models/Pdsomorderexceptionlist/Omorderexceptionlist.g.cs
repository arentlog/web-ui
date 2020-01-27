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

namespace Infor.Sxe.TWL.Data.Models.Pdsomorderexceptionlist
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsomorderexceptionlist.Omorderexceptionlist")]
   public partial class Omorderexceptionlist : ModelBase
   {
      [StringValidationAttribute]
      public string exceptionType { get; set; }
      public decimal actualFreight { get; set; }
      public bool assigned { get; set; }
      public int batchid { get; set; }
      [StringValidationAttribute]
      public string billAddr1 { get; set; }
      [StringValidationAttribute]
      public string billAddr2 { get; set; }
      [StringValidationAttribute]
      public string billAddrExt1 { get; set; }
      [StringValidationAttribute]
      public string billAddrExt2 { get; set; }
      [StringValidationAttribute]
      public string billAddrExt3 { get; set; }
      [StringValidationAttribute]
      public string billCity { get; set; }
      [StringValidationAttribute]
      public string billCountry { get; set; }
      [StringValidationAttribute]
      public string billName { get; set; }
      [StringValidationAttribute]
      public string billState { get; set; }
      [StringValidationAttribute]
      public string billZip { get; set; }
      [StringValidationAttribute]
      public string branchId { get; set; }
      public bool cancelFlag { get; set; }
      [StringValidationAttribute]
      public string carrier { get; set; }
      public decimal charges { get; set; }
      [StringValidationAttribute]
      public string @class { get; set; }
      [StringValidationAttribute]
      public string clearanceCode { get; set; }
      public bool clearanceRequired { get; set; }
      [StringValidationAttribute]
      public string codAddr1 { get; set; }
      [StringValidationAttribute]
      public string codAddr2 { get; set; }
      [StringValidationAttribute]
      public string codAddr3 { get; set; }
      [StringValidationAttribute]
      public string codAddr4 { get; set; }
      [StringValidationAttribute]
      public string codAddr5 { get; set; }
      public decimal codAmount { get; set; }
      [StringValidationAttribute]
      public string codCharge { get; set; }
      [StringValidationAttribute]
      public string codCity { get; set; }
      [StringValidationAttribute]
      public string codCountry { get; set; }
      public bool codFlag { get; set; }
      [StringValidationAttribute]
      public string codName { get; set; }
      [StringValidationAttribute]
      public string codState { get; set; }
      [StringValidationAttribute]
      public string codZip { get; set; }
      [StringValidationAttribute]
      public string comment { get; set; }
      [StringValidationAttribute]
      public string coNum { get; set; }
      public decimal customerFreight { get; set; }
      [StringValidationAttribute]
      public string customerPo { get; set; }
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
      public string customSelector { get; set; }
      [StringValidationAttribute]
      public string custCode { get; set; }
      [StringValidationAttribute]
      public string delRoute { get; set; }
      public decimal discount { get; set; }
      public decimal dropCube { get; set; }
      [StringValidationAttribute]
      public string dropType { get; set; }
      public decimal dropWeight { get; set; }
      public DateTime? expShipDate { get; set; }
      [StringValidationAttribute]
      public string freightTerms { get; set; }
      [StringValidationAttribute]
      public string guaranteedDelTime { get; set; }
      [StringValidationAttribute]
      public string holdReason { get; set; }
      [StringValidationAttribute]
      public string hostBatch { get; set; }
      [StringValidationAttribute]
      public string hostSelector { get; set; }
      public int hostSequence { get; set; }
      public int id { get; set; }
      public bool international { get; set; }
      [StringValidationAttribute]
      public string kitBuildType { get; set; }
      public int lineCount { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      public int maxDays { get; set; }
      [StringValidationAttribute]
      public string memo { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      public DateTime? orderDate { get; set; }
      [StringValidationAttribute]
      public string orderStatus { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      public decimal origCube { get; set; }
      public DateTime? origOrderDate { get; set; }
      public decimal origWeight { get; set; }
      public bool palletDropFl { get; set; }
      public bool partial { get; set; }
      [StringValidationAttribute]
      public string payMethod { get; set; }
      public bool printed { get; set; }
      public int priority { get; set; }
      [StringValidationAttribute]
      public string product { get; set; }
      public decimal productQty { get; set; }
      [StringValidationAttribute]
      public string proNumber { get; set; }
      [StringValidationAttribute]
      public string rateType { get; set; }
      [StringValidationAttribute]
      public string route { get; set; }
      public bool rowStatus { get; set; }
      [StringValidationAttribute]
      public string service { get; set; }
      [StringValidationAttribute]
      public string shipAddr1 { get; set; }
      [StringValidationAttribute]
      public string shipAddr2 { get; set; }
      [StringValidationAttribute]
      public string shipAddrExt1 { get; set; }
      [StringValidationAttribute]
      public string shipAddrExt2 { get; set; }
      [StringValidationAttribute]
      public string shipAddrExt3 { get; set; }
      [StringValidationAttribute]
      public string shipCity { get; set; }
      [StringValidationAttribute]
      public string shipCountry { get; set; }
      public decimal shipCube { get; set; }
      [StringValidationAttribute]
      public string shipCustCode { get; set; }
      public DateTime? shipDate { get; set; }
      [StringValidationAttribute]
      public string shipName { get; set; }
      [StringValidationAttribute]
      public string shipState { get; set; }
      [StringValidationAttribute]
      public string shipToCode { get; set; }
      public decimal shipWeight { get; set; }
      [StringValidationAttribute]
      public string shipZip { get; set; }
      public bool shpByIrms { get; set; }
      [StringValidationAttribute]
      public string slsrepin { get; set; }
      [StringValidationAttribute]
      public string slsrepout { get; set; }
      [StringValidationAttribute]
      public string takenby { get; set; }
      public decimal tax { get; set; }
      public int totalLineCnt { get; set; }
      public decimal totalLineQty { get; set; }
      [StringValidationAttribute]
      public string transDate { get; set; }
      [StringValidationAttribute]
      public string transProc { get; set; }
      [StringValidationAttribute]
      public string transUser { get; set; }
      [StringValidationAttribute]
      public string type { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string rowid { get; set; }
      [StringValidationAttribute]
      public string calcStatus { get; set; }
      [StringValidationAttribute]
      public string iWave { get; set; }
      [StringValidationAttribute]
      public string notes { get; set; }
      public long ordId { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      public bool isComments { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Omorderexceptionlist BuildOmorderexceptionlistFromRow(DataRow row)
      {
         Omorderexceptionlist entity = new Omorderexceptionlist();
         entity.exceptionType = row.IsNull("exception_type") ? string.Empty : row.Field<string>("exception_type");
         entity.actualFreight = row.IsNull("actual_freight") ? decimal.Zero : row.Field<decimal>("actual_freight");
         entity.assigned = row.Field<bool>("assigned");
         entity.batchid = row.IsNull("batchid") ? 0 : row.Field<int>("batchid");
         entity.billAddr1 = row.IsNull("bill_addr1") ? string.Empty : row.Field<string>("bill_addr1");
         entity.billAddr2 = row.IsNull("bill_addr2") ? string.Empty : row.Field<string>("bill_addr2");
         entity.billAddrExt1 = row.IsNull("bill_addr_ext1") ? string.Empty : row.Field<string>("bill_addr_ext1");
         entity.billAddrExt2 = row.IsNull("bill_addr_ext2") ? string.Empty : row.Field<string>("bill_addr_ext2");
         entity.billAddrExt3 = row.IsNull("bill_addr_ext3") ? string.Empty : row.Field<string>("bill_addr_ext3");
         entity.billCity = row.IsNull("bill_city") ? string.Empty : row.Field<string>("bill_city");
         entity.billCountry = row.IsNull("bill_country") ? string.Empty : row.Field<string>("bill_country");
         entity.billName = row.IsNull("bill_name") ? string.Empty : row.Field<string>("bill_name");
         entity.billState = row.IsNull("bill_state") ? string.Empty : row.Field<string>("bill_state");
         entity.billZip = row.IsNull("bill_zip") ? string.Empty : row.Field<string>("bill_zip");
         entity.branchId = row.IsNull("branch_id") ? string.Empty : row.Field<string>("branch_id");
         entity.cancelFlag = row.Field<bool>("cancel_flag");
         entity.carrier = row.IsNull("carrier") ? string.Empty : row.Field<string>("carrier");
         entity.charges = row.IsNull("charges") ? decimal.Zero : row.Field<decimal>("charges");
         entity.@class = row.IsNull("class") ? string.Empty : row.Field<string>("class");
         entity.clearanceCode = row.IsNull("clearance_code") ? string.Empty : row.Field<string>("clearance_code");
         entity.clearanceRequired = row.Field<bool>("clearance_required");
         entity.codAddr1 = row.IsNull("cod_addr1") ? string.Empty : row.Field<string>("cod_addr1");
         entity.codAddr2 = row.IsNull("cod_addr2") ? string.Empty : row.Field<string>("cod_addr2");
         entity.codAddr3 = row.IsNull("cod_addr3") ? string.Empty : row.Field<string>("cod_addr3");
         entity.codAddr4 = row.IsNull("cod_addr4") ? string.Empty : row.Field<string>("cod_addr4");
         entity.codAddr5 = row.IsNull("cod_addr5") ? string.Empty : row.Field<string>("cod_addr5");
         entity.codAmount = row.IsNull("cod_amount") ? decimal.Zero : row.Field<decimal>("cod_amount");
         entity.codCharge = row.IsNull("cod_charge") ? string.Empty : row.Field<string>("cod_charge");
         entity.codCity = row.IsNull("cod_city") ? string.Empty : row.Field<string>("cod_city");
         entity.codCountry = row.IsNull("cod_country") ? string.Empty : row.Field<string>("cod_country");
         entity.codFlag = row.Field<bool>("cod_flag");
         entity.codName = row.IsNull("cod_name") ? string.Empty : row.Field<string>("cod_name");
         entity.codState = row.IsNull("cod_state") ? string.Empty : row.Field<string>("cod_state");
         entity.codZip = row.IsNull("cod_zip") ? string.Empty : row.Field<string>("cod_zip");
         entity.comment = row.IsNull("comment") ? string.Empty : row.Field<string>("comment");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.customerFreight = row.IsNull("customer_freight") ? decimal.Zero : row.Field<decimal>("customer_freight");
         entity.customerPo = row.IsNull("customer_po") ? string.Empty : row.Field<string>("customer_po");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.customSelector = row.IsNull("custom_selector") ? string.Empty : row.Field<string>("custom_selector");
         entity.custCode = row.IsNull("cust_code") ? string.Empty : row.Field<string>("cust_code");
         entity.delRoute = row.IsNull("del_route") ? string.Empty : row.Field<string>("del_route");
         entity.discount = row.IsNull("discount") ? decimal.Zero : row.Field<decimal>("discount");
         entity.dropCube = row.IsNull("drop_cube") ? decimal.Zero : row.Field<decimal>("drop_cube");
         entity.dropType = row.IsNull("drop_type") ? string.Empty : row.Field<string>("drop_type");
         entity.dropWeight = row.IsNull("drop_weight") ? decimal.Zero : row.Field<decimal>("drop_weight");
         entity.expShipDate = row.Field<DateTime?>("exp_ship_date");
         entity.freightTerms = row.IsNull("freight_terms") ? string.Empty : row.Field<string>("freight_terms");
         entity.guaranteedDelTime = row.IsNull("guaranteed_del_time") ? string.Empty : row.Field<string>("guaranteed_del_time");
         entity.holdReason = row.IsNull("hold_reason") ? string.Empty : row.Field<string>("hold_reason");
         entity.hostBatch = row.IsNull("host_batch") ? string.Empty : row.Field<string>("host_batch");
         entity.hostSelector = row.IsNull("host_selector") ? string.Empty : row.Field<string>("host_selector");
         entity.hostSequence = row.IsNull("host_sequence") ? 0 : row.Field<int>("host_sequence");
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.international = row.Field<bool>("international");
         entity.kitBuildType = row.IsNull("kit_build_type") ? string.Empty : row.Field<string>("kit_build_type");
         entity.lineCount = row.IsNull("line_count") ? 0 : row.Field<int>("line_count");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.maxDays = row.IsNull("max_days") ? 0 : row.Field<int>("max_days");
         entity.memo = row.IsNull("memo") ? string.Empty : row.Field<string>("memo");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderDate = row.Field<DateTime?>("order_date");
         entity.orderStatus = row.IsNull("order_status") ? string.Empty : row.Field<string>("order_status");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.origCube = row.IsNull("orig_cube") ? decimal.Zero : row.Field<decimal>("orig_cube");
         entity.origOrderDate = row.Field<DateTime?>("orig_order_date");
         entity.origWeight = row.IsNull("orig_weight") ? decimal.Zero : row.Field<decimal>("orig_weight");
         entity.palletDropFl = row.Field<bool>("pallet_drop_fl");
         entity.partial = row.Field<bool>("partial");
         entity.payMethod = row.IsNull("pay_method") ? string.Empty : row.Field<string>("pay_method");
         entity.printed = row.Field<bool>("printed");
         entity.priority = row.IsNull("priority") ? 0 : row.Field<int>("priority");
         entity.product = row.IsNull("product") ? string.Empty : row.Field<string>("product");
         entity.productQty = row.IsNull("product_qty") ? decimal.Zero : row.Field<decimal>("product_qty");
         entity.proNumber = row.IsNull("pro_number") ? string.Empty : row.Field<string>("pro_number");
         entity.rateType = row.IsNull("rate_type") ? string.Empty : row.Field<string>("rate_type");
         entity.route = row.IsNull("route") ? string.Empty : row.Field<string>("route");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.service = row.IsNull("service") ? string.Empty : row.Field<string>("service");
         entity.shipAddr1 = row.IsNull("ship_addr1") ? string.Empty : row.Field<string>("ship_addr1");
         entity.shipAddr2 = row.IsNull("ship_addr2") ? string.Empty : row.Field<string>("ship_addr2");
         entity.shipAddrExt1 = row.IsNull("ship_addr_ext1") ? string.Empty : row.Field<string>("ship_addr_ext1");
         entity.shipAddrExt2 = row.IsNull("ship_addr_ext2") ? string.Empty : row.Field<string>("ship_addr_ext2");
         entity.shipAddrExt3 = row.IsNull("ship_addr_ext3") ? string.Empty : row.Field<string>("ship_addr_ext3");
         entity.shipCity = row.IsNull("ship_city") ? string.Empty : row.Field<string>("ship_city");
         entity.shipCountry = row.IsNull("ship_country") ? string.Empty : row.Field<string>("ship_country");
         entity.shipCube = row.IsNull("ship_cube") ? decimal.Zero : row.Field<decimal>("ship_cube");
         entity.shipCustCode = row.IsNull("ship_cust_code") ? string.Empty : row.Field<string>("ship_cust_code");
         entity.shipDate = row.Field<DateTime?>("ship_date");
         entity.shipName = row.IsNull("ship_name") ? string.Empty : row.Field<string>("ship_name");
         entity.shipState = row.IsNull("ship_state") ? string.Empty : row.Field<string>("ship_state");
         entity.shipToCode = row.IsNull("ship_to_code") ? string.Empty : row.Field<string>("ship_to_code");
         entity.shipWeight = row.IsNull("ship_weight") ? decimal.Zero : row.Field<decimal>("ship_weight");
         entity.shipZip = row.IsNull("ship_zip") ? string.Empty : row.Field<string>("ship_zip");
         entity.shpByIrms = row.Field<bool>("shp_by_irms");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.takenby = row.IsNull("takenby") ? string.Empty : row.Field<string>("takenby");
         entity.tax = row.IsNull("tax") ? decimal.Zero : row.Field<decimal>("tax");
         entity.totalLineCnt = row.IsNull("total_line_cnt") ? 0 : row.Field<int>("total_line_cnt");
         entity.totalLineQty = row.IsNull("total_line_qty") ? decimal.Zero : row.Field<decimal>("total_line_qty");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.rowid = row.Field<byte[]>("rowid").ToStringEncoded();
         entity.calcStatus = row.IsNull("calc_status") ? string.Empty : row.Field<string>("calc_status");
         entity.iWave = row.IsNull("IWave") ? string.Empty : row.Field<string>("IWave");
         entity.notes = row.IsNull("Notes") ? string.Empty : row.Field<string>("Notes");
         entity.ordId = row.IsNull("ord_id") ? 0 : row.Field<long>("ord_id");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.isComments = row.Field<bool>("is_comments");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOmorderexceptionlist(ref DataRow row, Omorderexceptionlist entity)
      {
         row.SetField("exception_type", entity.exceptionType);
         row.SetField("actual_freight", entity.actualFreight);
         row.SetField("assigned", entity.assigned);
         row.SetField("batchid", entity.batchid);
         row.SetField("bill_addr1", entity.billAddr1);
         row.SetField("bill_addr2", entity.billAddr2);
         row.SetField("bill_addr_ext1", entity.billAddrExt1);
         row.SetField("bill_addr_ext2", entity.billAddrExt2);
         row.SetField("bill_addr_ext3", entity.billAddrExt3);
         row.SetField("bill_city", entity.billCity);
         row.SetField("bill_country", entity.billCountry);
         row.SetField("bill_name", entity.billName);
         row.SetField("bill_state", entity.billState);
         row.SetField("bill_zip", entity.billZip);
         row.SetField("branch_id", entity.branchId);
         row.SetField("cancel_flag", entity.cancelFlag);
         row.SetField("carrier", entity.carrier);
         row.SetField("charges", entity.charges);
         row.SetField("class", entity.@class);
         row.SetField("clearance_code", entity.clearanceCode);
         row.SetField("clearance_required", entity.clearanceRequired);
         row.SetField("cod_addr1", entity.codAddr1);
         row.SetField("cod_addr2", entity.codAddr2);
         row.SetField("cod_addr3", entity.codAddr3);
         row.SetField("cod_addr4", entity.codAddr4);
         row.SetField("cod_addr5", entity.codAddr5);
         row.SetField("cod_amount", entity.codAmount);
         row.SetField("cod_charge", entity.codCharge);
         row.SetField("cod_city", entity.codCity);
         row.SetField("cod_country", entity.codCountry);
         row.SetField("cod_flag", entity.codFlag);
         row.SetField("cod_name", entity.codName);
         row.SetField("cod_state", entity.codState);
         row.SetField("cod_zip", entity.codZip);
         row.SetField("comment", entity.comment);
         row.SetField("co_num", entity.coNum);
         row.SetField("customer_freight", entity.customerFreight);
         row.SetField("customer_po", entity.customerPo);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("custom_selector", entity.customSelector);
         row.SetField("cust_code", entity.custCode);
         row.SetField("del_route", entity.delRoute);
         row.SetField("discount", entity.discount);
         row.SetField("drop_cube", entity.dropCube);
         row.SetField("drop_type", entity.dropType);
         row.SetField("drop_weight", entity.dropWeight);
         row.SetField("exp_ship_date", entity.expShipDate);
         row.SetField("freight_terms", entity.freightTerms);
         row.SetField("guaranteed_del_time", entity.guaranteedDelTime);
         row.SetField("hold_reason", entity.holdReason);
         row.SetField("host_batch", entity.hostBatch);
         row.SetField("host_selector", entity.hostSelector);
         row.SetField("host_sequence", entity.hostSequence);
         row.SetField("id", entity.id);
         row.SetField("international", entity.international);
         row.SetField("kit_build_type", entity.kitBuildType);
         row.SetField("line_count", entity.lineCount);
         row.SetField("lot", entity.lot);
         row.SetField("max_days", entity.maxDays);
         row.SetField("memo", entity.memo);
         row.SetField("order", entity.order);
         row.SetField("order_date", entity.orderDate);
         row.SetField("order_status", entity.orderStatus);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("orig_cube", entity.origCube);
         row.SetField("orig_order_date", entity.origOrderDate);
         row.SetField("orig_weight", entity.origWeight);
         row.SetField("pallet_drop_fl", entity.palletDropFl);
         row.SetField("partial", entity.partial);
         row.SetField("pay_method", entity.payMethod);
         row.SetField("printed", entity.printed);
         row.SetField("priority", entity.priority);
         row.SetField("product", entity.product);
         row.SetField("product_qty", entity.productQty);
         row.SetField("pro_number", entity.proNumber);
         row.SetField("rate_type", entity.rateType);
         row.SetField("route", entity.route);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("service", entity.service);
         row.SetField("ship_addr1", entity.shipAddr1);
         row.SetField("ship_addr2", entity.shipAddr2);
         row.SetField("ship_addr_ext1", entity.shipAddrExt1);
         row.SetField("ship_addr_ext2", entity.shipAddrExt2);
         row.SetField("ship_addr_ext3", entity.shipAddrExt3);
         row.SetField("ship_city", entity.shipCity);
         row.SetField("ship_country", entity.shipCountry);
         row.SetField("ship_cube", entity.shipCube);
         row.SetField("ship_cust_code", entity.shipCustCode);
         row.SetField("ship_date", entity.shipDate);
         row.SetField("ship_name", entity.shipName);
         row.SetField("ship_state", entity.shipState);
         row.SetField("ship_to_code", entity.shipToCode);
         row.SetField("ship_weight", entity.shipWeight);
         row.SetField("ship_zip", entity.shipZip);
         row.SetField("shp_by_irms", entity.shpByIrms);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("takenby", entity.takenby);
         row.SetField("tax", entity.tax);
         row.SetField("total_line_cnt", entity.totalLineCnt);
         row.SetField("total_line_qty", entity.totalLineQty);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("trans_user", entity.transUser);
         row.SetField("type", entity.type);
         row.SetField("wh_num", entity.whNum);
         row.SetField("rowid", entity.rowid.ToByteArray());
         row.SetField("calc_status", entity.calcStatus);
         row.SetField("IWave", entity.iWave);
         row.SetField("Notes", entity.notes);
         row.SetField("ord_id", entity.ordId);
         row.SetField("emp_num", entity.empNum);
         row.SetField("is_comments", entity.isComments);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
