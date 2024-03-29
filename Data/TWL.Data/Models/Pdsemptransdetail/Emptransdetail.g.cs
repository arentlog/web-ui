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

namespace Infor.Sxe.TWL.Data.Models.Pdsemptransdetail
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsemptransdetail.Emptransdetail")]
   public partial class Emptransdetail : ModelBase
   {
      [StringValidationAttribute]
      public string dateTime { get; set; }
      [StringValidationAttribute]
      public string empNum { get; set; }
      [StringValidationAttribute]
      public string transType { get; set; }
      [StringValidationAttribute]
      public string transName { get; set; }
      public decimal expQty { get; set; }
      public decimal actQty { get; set; }
      [StringValidationAttribute]
      public string uom { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string binFrom { get; set; }
      [StringValidationAttribute]
      public string binTo { get; set; }
      [StringValidationAttribute]
      public string palletIdFrom { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string poNumber { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      [StringValidationAttribute]
      public string adjCode { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string serialNum { get; set; }
      [StringValidationAttribute]
      public string stockStat { get; set; }
      [StringValidationAttribute]
      public string oldStockStat { get; set; }
      [StringValidationAttribute]
      public string comments { get; set; }
      [StringValidationAttribute]
      public string procCreated { get; set; }
      [StringValidationAttribute]
      public string transactionsRowID { get; set; }
      [StringValidationAttribute]
      public string emptransdetailuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Emptransdetail BuildEmptransdetailFromRow(DataRow row)
      {
         Emptransdetail entity = new Emptransdetail();
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.transType = row.IsNull("trans_type") ? string.Empty : row.Field<string>("trans_type");
         entity.transName = row.IsNull("trans_name") ? string.Empty : row.Field<string>("trans_name");
         entity.expQty = row.IsNull("exp_qty") ? decimal.Zero : row.Field<decimal>("exp_qty");
         entity.actQty = row.IsNull("act_qty") ? decimal.Zero : row.Field<decimal>("act_qty");
         entity.uom = row.IsNull("uom") ? string.Empty : row.Field<string>("uom");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.binFrom = row.IsNull("bin_from") ? string.Empty : row.Field<string>("bin_from");
         entity.binTo = row.IsNull("bin_to") ? string.Empty : row.Field<string>("bin_to");
         entity.palletIdFrom = row.IsNull("pallet_id_from") ? string.Empty : row.Field<string>("pallet_id_from");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.poNumber = row.IsNull("po_number") ? string.Empty : row.Field<string>("po_number");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.adjCode = row.IsNull("adj_code") ? string.Empty : row.Field<string>("adj_code");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.serialNum = row.IsNull("serial_num") ? string.Empty : row.Field<string>("serial_num");
         entity.stockStat = row.IsNull("stock_stat") ? string.Empty : row.Field<string>("stock_stat");
         entity.oldStockStat = row.IsNull("old_stock_stat") ? string.Empty : row.Field<string>("old_stock_stat");
         entity.comments = row.IsNull("comments") ? string.Empty : row.Field<string>("comments");
         entity.procCreated = row.IsNull("proc_created") ? string.Empty : row.Field<string>("proc_created");
         entity.transactionsRowID = row.Field<byte[]>("transactionsRowID").ToStringEncoded();
         entity.emptransdetailuserfield = row.IsNull("emptransdetailuserfield") ? string.Empty : row.Field<string>("emptransdetailuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromEmptransdetail(ref DataRow row, Emptransdetail entity)
      {
         row.SetField("date_time", entity.dateTime);
         row.SetField("emp_num", entity.empNum);
         row.SetField("trans_type", entity.transType);
         row.SetField("trans_name", entity.transName);
         row.SetField("exp_qty", entity.expQty);
         row.SetField("act_qty", entity.actQty);
         row.SetField("uom", entity.uom);
         row.SetField("bin_num", entity.binNum);
         row.SetField("bin_from", entity.binFrom);
         row.SetField("bin_to", entity.binTo);
         row.SetField("pallet_id_from", entity.palletIdFrom);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("po_number", entity.poNumber);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("adj_code", entity.adjCode);
         row.SetField("abs_num", entity.absNum);
         row.SetField("lot", entity.lot);
         row.SetField("serial_num", entity.serialNum);
         row.SetField("stock_stat", entity.stockStat);
         row.SetField("old_stock_stat", entity.oldStockStat);
         row.SetField("comments", entity.comments);
         row.SetField("proc_created", entity.procCreated);
         row.SetField("transactionsRowID", entity.transactionsRowID.ToByteArray());
         row.SetField("emptransdetailuserfield", entity.emptransdetailuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
