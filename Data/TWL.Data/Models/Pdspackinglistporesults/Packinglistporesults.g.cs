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

namespace Infor.Sxe.TWL.Data.Models.Pdspackinglistporesults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdspackinglistporesults.Packinglistporesults")]
   public partial class Packinglistporesults : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string rtNum { get; set; }
      public int rtId { get; set; }
      [StringValidationAttribute]
      public string rowStatus { get; set; }
      [StringValidationAttribute]
      public string poNumber { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      public DateTime? delivery { get; set; }
      public decimal actLines { get; set; }
      public decimal actQuantity { get; set; }
      public decimal expLines { get; set; }
      public decimal expQuantity { get; set; }
      [StringValidationAttribute]
      public string rtdetRowid { get; set; }
      [StringValidationAttribute]
      public string packinglistporesultsuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Packinglistporesults BuildPackinglistporesultsFromRow(DataRow row)
      {
         Packinglistporesults entity = new Packinglistporesults();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.rtNum = row.IsNull("rt_num") ? string.Empty : row.Field<string>("rt_num");
         entity.rtId = row.IsNull("rt_id") ? 0 : row.Field<int>("rt_id");
         entity.rowStatus = row.IsNull("row_status") ? string.Empty : row.Field<string>("row_status");
         entity.poNumber = row.IsNull("po_number") ? string.Empty : row.Field<string>("po_number");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.delivery = row.Field<DateTime?>("delivery");
         entity.actLines = row.IsNull("act_lines") ? decimal.Zero : row.Field<decimal>("act_lines");
         entity.actQuantity = row.IsNull("act_quantity") ? decimal.Zero : row.Field<decimal>("act_quantity");
         entity.expLines = row.IsNull("exp_lines") ? decimal.Zero : row.Field<decimal>("exp_lines");
         entity.expQuantity = row.IsNull("exp_quantity") ? decimal.Zero : row.Field<decimal>("exp_quantity");
         entity.rtdetRowid = row.Field<byte[]>("rtdetRowid").ToStringEncoded();
         entity.packinglistporesultsuserfield = row.IsNull("packinglistporesultsuserfield") ? string.Empty : row.Field<string>("packinglistporesultsuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPackinglistporesults(ref DataRow row, Packinglistporesults entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("rt_num", entity.rtNum);
         row.SetField("rt_id", entity.rtId);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("po_number", entity.poNumber);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("delivery", entity.delivery);
         row.SetField("act_lines", entity.actLines);
         row.SetField("act_quantity", entity.actQuantity);
         row.SetField("exp_lines", entity.expLines);
         row.SetField("exp_quantity", entity.expQuantity);
         row.SetField("rtdetRowid", entity.rtdetRowid.ToByteArray());
         row.SetField("packinglistporesultsuserfield", entity.packinglistporesultsuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591