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

namespace Infor.Sxe.TWL.Data.Models.Pdswavesummary
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdswavesummary.Wavesummarypicks")]
   public partial class Wavesummarypicks : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      public int batchid { get; set; }
      [StringValidationAttribute]
      public string pickStatus { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public decimal qty { get; set; }
      [StringValidationAttribute]
      public string cartonId { get; set; }
      [StringValidationAttribute]
      public string altwhse { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      public int line { get; set; }
      public int lineSequence { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string serialNum { get; set; }
      [StringValidationAttribute]
      public string stockStat { get; set; }
      [StringValidationAttribute]
      public string rowId { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wavesummarypicks BuildWavesummarypicksFromRow(DataRow row)
      {
         Wavesummarypicks entity = new Wavesummarypicks();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.batchid = row.IsNull("batchid") ? 0 : row.Field<int>("batchid");
         entity.pickStatus = row.IsNull("pick_status") ? string.Empty : row.Field<string>("pick_status");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.cartonId = row.IsNull("carton_id") ? string.Empty : row.Field<string>("carton_id");
         entity.altwhse = row.IsNull("altwhse") ? string.Empty : row.Field<string>("altwhse");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.serialNum = row.IsNull("serial_num") ? string.Empty : row.Field<string>("serial_num");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.rowId = row.Field<byte[]>("row_id").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWavesummarypicks(ref DataRow row, Wavesummarypicks entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("batchid", entity.batchid);
         row.SetField("pick_status", entity.pickStatus);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("bin_num", entity.binNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("qty", entity.qty);
         row.SetField("carton_id", entity.cartonId);
         row.SetField("altwhse", entity.altwhse);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("line", entity.line);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("lot", entity.lot);
         row.SetField("serial_num", entity.serialNum);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("row_id", entity.rowId.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
