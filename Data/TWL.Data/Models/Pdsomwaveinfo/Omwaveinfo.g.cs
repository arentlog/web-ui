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

namespace Infor.Sxe.TWL.Data.Models.Pdsomwaveinfo
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsomwaveinfo.Omwaveinfo")]
   public partial class Omwaveinfo : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      public int batch { get; set; }
      [StringValidationAttribute]
      public string activeDateTime { get; set; }
      [StringValidationAttribute]
      public string cart { get; set; }
      public decimal cube { get; set; }
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
      public string dropDateTime { get; set; }
      public decimal dropPrice { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      [StringValidationAttribute]
      public string hostBatch { get; set; }
      public int lineCount { get; set; }
      public int orderCount { get; set; }
      public decimal shipCube { get; set; }
      [StringValidationAttribute]
      public string shipDateTime { get; set; }
      public decimal shipPrice { get; set; }
      public decimal shipWeight { get; set; }
      public int singleLineOrders { get; set; }
      public int taskId { get; set; }
      [StringValidationAttribute]
      public string transDate { get; set; }
      [StringValidationAttribute]
      public string transProc { get; set; }
      [StringValidationAttribute]
      public string transUser { get; set; }
      [StringValidationAttribute]
      public string waveStatus { get; set; }
      public decimal weight { get; set; }
      public int openOrders { get; set; }
      public int inPickOrders { get; set; }
      public int pickedOrders { get; set; }
      public int packedOrders { get; set; }
      public int shippedOrders { get; set; }
      public int exceptionOrders { get; set; }
      public int totalOrders { get; set; }
      public decimal totalLineCube { get; set; }
      public decimal totalLineWeight { get; set; }
      public int totalLineCount { get; set; }
      public int openLines { get; set; }
      public int inPickLines { get; set; }
      public int pickedLines { get; set; }
      public int packedLines { get; set; }
      public int shippedLines { get; set; }
      public int exceptionLines { get; set; }
      public int totalLines { get; set; }
      [StringValidationAttribute]
      public string elapsedTime { get; set; }
      public int elapsedDayCount { get; set; }
      [StringValidationAttribute]
      public string elapsedHourCount { get; set; }
      public decimal avgValue { get; set; }
      public decimal avgWeight { get; set; }
      public int multiCount { get; set; }
      public int singleCount { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Omwaveinfo BuildOmwaveinfoFromRow(DataRow row)
      {
         Omwaveinfo entity = new Omwaveinfo();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.batch = row.IsNull("batch") ? 0 : row.Field<int>("batch");
         entity.activeDateTime = row.IsNull("active_date_time") ? string.Empty : row.Field<string>("active_date_time");
         entity.cart = row.IsNull("cart") ? string.Empty : row.Field<string>("cart");
         entity.cube = row.IsNull("cube") ? decimal.Zero : row.Field<decimal>("cube");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.dropDateTime = row.IsNull("drop_date_time") ? string.Empty : row.Field<string>("drop_date_time");
         entity.dropPrice = row.IsNull("drop_price") ? decimal.Zero : row.Field<decimal>("drop_price");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.hostBatch = row.IsNull("host_batch") ? string.Empty : row.Field<string>("host_batch");
         entity.lineCount = row.IsNull("line_count") ? 0 : row.Field<int>("line_count");
         entity.orderCount = row.IsNull("order_count") ? 0 : row.Field<int>("order_count");
         entity.shipCube = row.IsNull("ship_cube") ? decimal.Zero : row.Field<decimal>("ship_cube");
         entity.shipDateTime = row.IsNull("ship_date_time") ? string.Empty : row.Field<string>("ship_date_time");
         entity.shipPrice = row.IsNull("ship_price") ? decimal.Zero : row.Field<decimal>("ship_price");
         entity.shipWeight = row.IsNull("ship_weight") ? decimal.Zero : row.Field<decimal>("ship_weight");
         entity.singleLineOrders = row.IsNull("single_line_orders") ? 0 : row.Field<int>("single_line_orders");
         entity.taskId = row.IsNull("task_id") ? 0 : row.Field<int>("task_id");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.waveStatus = row.IsNull("wave_status") ? string.Empty : row.Field<string>("wave_status");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.openOrders = row.IsNull("open_orders") ? 0 : row.Field<int>("open_orders");
         entity.inPickOrders = row.IsNull("in_pick_orders") ? 0 : row.Field<int>("in_pick_orders");
         entity.pickedOrders = row.IsNull("picked_orders") ? 0 : row.Field<int>("picked_orders");
         entity.packedOrders = row.IsNull("packed_orders") ? 0 : row.Field<int>("packed_orders");
         entity.shippedOrders = row.IsNull("shipped_orders") ? 0 : row.Field<int>("shipped_orders");
         entity.exceptionOrders = row.IsNull("exception_orders") ? 0 : row.Field<int>("exception_orders");
         entity.totalOrders = row.IsNull("total_orders") ? 0 : row.Field<int>("total_orders");
         entity.totalLineCube = row.IsNull("total_line_cube") ? decimal.Zero : row.Field<decimal>("total_line_cube");
         entity.totalLineWeight = row.IsNull("total_line_weight") ? decimal.Zero : row.Field<decimal>("total_line_weight");
         entity.totalLineCount = row.IsNull("total_line_count") ? 0 : row.Field<int>("total_line_count");
         entity.openLines = row.IsNull("open_lines") ? 0 : row.Field<int>("open_lines");
         entity.inPickLines = row.IsNull("in_pick_lines") ? 0 : row.Field<int>("in_pick_lines");
         entity.pickedLines = row.IsNull("picked_lines") ? 0 : row.Field<int>("picked_lines");
         entity.packedLines = row.IsNull("packed_lines") ? 0 : row.Field<int>("packed_lines");
         entity.shippedLines = row.IsNull("shipped_lines") ? 0 : row.Field<int>("shipped_lines");
         entity.exceptionLines = row.IsNull("exception_lines") ? 0 : row.Field<int>("exception_lines");
         entity.totalLines = row.IsNull("total_lines") ? 0 : row.Field<int>("total_lines");
         entity.elapsedTime = row.IsNull("elapsed_time") ? string.Empty : row.Field<string>("elapsed_time");
         entity.elapsedDayCount = row.IsNull("elapsed_day_count") ? 0 : row.Field<int>("elapsed_day_count");
         entity.elapsedHourCount = row.IsNull("elapsed_hour_count") ? string.Empty : row.Field<string>("elapsed_hour_count");
         entity.avgValue = row.IsNull("avg_value") ? decimal.Zero : row.Field<decimal>("avg_value");
         entity.avgWeight = row.IsNull("avg_weight") ? decimal.Zero : row.Field<decimal>("avg_weight");
         entity.multiCount = row.IsNull("multi_count") ? 0 : row.Field<int>("multi_count");
         entity.singleCount = row.IsNull("single_count") ? 0 : row.Field<int>("single_count");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOmwaveinfo(ref DataRow row, Omwaveinfo entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("batch", entity.batch);
         row.SetField("active_date_time", entity.activeDateTime);
         row.SetField("cart", entity.cart);
         row.SetField("cube", entity.cube);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("drop_date_time", entity.dropDateTime);
         row.SetField("drop_price", entity.dropPrice);
         row.SetField("emp_num", entity.empNum);
         row.SetField("host_batch", entity.hostBatch);
         row.SetField("line_count", entity.lineCount);
         row.SetField("order_count", entity.orderCount);
         row.SetField("ship_cube", entity.shipCube);
         row.SetField("ship_date_time", entity.shipDateTime);
         row.SetField("ship_price", entity.shipPrice);
         row.SetField("ship_weight", entity.shipWeight);
         row.SetField("single_line_orders", entity.singleLineOrders);
         row.SetField("task_id", entity.taskId);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("trans_user", entity.transUser);
         row.SetField("wave_status", entity.waveStatus);
         row.SetField("weight", entity.weight);
         row.SetField("open_orders", entity.openOrders);
         row.SetField("in_pick_orders", entity.inPickOrders);
         row.SetField("picked_orders", entity.pickedOrders);
         row.SetField("packed_orders", entity.packedOrders);
         row.SetField("shipped_orders", entity.shippedOrders);
         row.SetField("exception_orders", entity.exceptionOrders);
         row.SetField("total_orders", entity.totalOrders);
         row.SetField("total_line_cube", entity.totalLineCube);
         row.SetField("total_line_weight", entity.totalLineWeight);
         row.SetField("total_line_count", entity.totalLineCount);
         row.SetField("open_lines", entity.openLines);
         row.SetField("in_pick_lines", entity.inPickLines);
         row.SetField("picked_lines", entity.pickedLines);
         row.SetField("packed_lines", entity.packedLines);
         row.SetField("shipped_lines", entity.shippedLines);
         row.SetField("exception_lines", entity.exceptionLines);
         row.SetField("total_lines", entity.totalLines);
         row.SetField("elapsed_time", entity.elapsedTime);
         row.SetField("elapsed_day_count", entity.elapsedDayCount);
         row.SetField("elapsed_hour_count", entity.elapsedHourCount);
         row.SetField("avg_value", entity.avgValue);
         row.SetField("avg_weight", entity.avgWeight);
         row.SetField("multi_count", entity.multiCount);
         row.SetField("single_count", entity.singleCount);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
