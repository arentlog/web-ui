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

namespace Infor.Sxe.TWL.Data.Models.Pdsrectransactionresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsrectransactionresults.Rectransactionresults")]
   public partial class Rectransactionresults : ModelBase
   {
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string actionCode { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string cargoControl { get; set; }
      [StringValidationAttribute]
      public string dateTime { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      public decimal itemQty { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      public int poLine { get; set; }
      [StringValidationAttribute]
      public string poNumber { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      [StringValidationAttribute]
      public string resultCode { get; set; }
      [StringValidationAttribute]
      public string resultMsg { get; set; }
      [StringValidationAttribute]
      public string rowStatus { get; set; }
      [StringValidationAttribute]
      public string stockStat { get; set; }
      public int transNum { get; set; }
      [StringValidationAttribute]
      public string transType { get; set; }
      [StringValidationAttribute]
      public string truckId { get; set; }
      [StringValidationAttribute]
      public string transactionsRowID { get; set; }
      [StringValidationAttribute]
      public string transTypeName { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Rectransactionresults BuildRectransactionresultsFromRow(DataRow row)
      {
         Rectransactionresults entity = new Rectransactionresults();
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.actionCode = row.IsNull("action_code") ? string.Empty : row.Field<string>("action_code");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.cargoControl = row.IsNull("cargo_control") ? string.Empty : row.Field<string>("cargo_control");
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.itemQty = row.IsNull("item_qty") ? decimal.Zero : row.Field<decimal>("item_qty");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.poLine = row.IsNull("po_line") ? 0 : row.Field<int>("po_line");
         entity.poNumber = row.IsNull("po_number") ? string.Empty : row.Field<string>("po_number");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.resultCode = row.IsNull("result_code") ? string.Empty : row.Field<string>("result_code");
         entity.resultMsg = row.IsNull("result_msg") ? string.Empty : row.Field<string>("result_msg");
         entity.rowStatus = row.IsNull("row_status") ? string.Empty : row.Field<string>("row_status");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.transNum = row.IsNull("trans_num") ? 0 : row.Field<int>("trans_num");
         entity.transType = row.IsNull("trans_type") ? string.Empty : row.Field<string>("trans_type");
         entity.truckId = row.IsNull("truck_id") ? string.Empty : row.Field<string>("truck_id");
         entity.transactionsRowID = row.Field<byte[]>("transactionsRowID").ToStringEncoded();
         entity.transTypeName = row.IsNull("transTypeName") ? string.Empty : row.Field<string>("transTypeName");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRectransactionresults(ref DataRow row, Rectransactionresults entity)
      {
         row.SetField("abs_num", entity.absNum);
         row.SetField("action_code", entity.actionCode);
         row.SetField("bin_num", entity.binNum);
         row.SetField("cargo_control", entity.cargoControl);
         row.SetField("date_time", entity.dateTime);
         row.SetField("emp_num", entity.empNum);
         row.SetField("item_qty", entity.itemQty);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("po_line", entity.poLine);
         row.SetField("po_number", entity.poNumber);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("result_code", entity.resultCode);
         row.SetField("result_msg", entity.resultMsg);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("trans_num", entity.transNum);
         row.SetField("trans_type", entity.transType);
         row.SetField("truck_id", entity.truckId);
         row.SetField("transactionsRowID", entity.transactionsRowID.ToByteArray());
         row.SetField("transTypeName", entity.transTypeName);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591