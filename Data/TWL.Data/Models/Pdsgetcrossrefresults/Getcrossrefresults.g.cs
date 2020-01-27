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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetcrossrefresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetcrossrefresults.Getcrossrefresults")]
   public partial class Getcrossrefresults : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string vendItem { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string uom { get; set; }
      [StringValidationAttribute]
      public string refType { get; set; }
      public int boxQty { get; set; }
      public decimal caseQuantity { get; set; }
      public decimal palletQuantity { get; set; }
      public int stackHeight { get; set; }
      [StringValidationAttribute]
      public string venddetailrowid { get; set; }
      [StringValidationAttribute]
      public string getcrossrefresultsuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getcrossrefresults BuildGetcrossrefresultsFromRow(DataRow row)
      {
         Getcrossrefresults entity = new Getcrossrefresults();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.vendItem = row.IsNull("vend_item") ? string.Empty : row.Field<string>("vend_item");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.uom = row.IsNull("uom") ? string.Empty : row.Field<string>("uom");
         entity.refType = row.IsNull("ref_type") ? string.Empty : row.Field<string>("ref_type");
         entity.boxQty = row.IsNull("box_qty") ? 0 : row.Field<int>("box_qty");
         entity.caseQuantity = row.IsNull("case_quantity") ? decimal.Zero : row.Field<decimal>("case_quantity");
         entity.palletQuantity = row.IsNull("pallet_quantity") ? decimal.Zero : row.Field<decimal>("pallet_quantity");
         entity.stackHeight = row.IsNull("stack_height") ? 0 : row.Field<int>("stack_height");
         entity.venddetailrowid = row.Field<byte[]>("venddetailrowid").ToStringEncoded();
         entity.getcrossrefresultsuserfield = row.IsNull("getcrossrefresultsuserfield") ? string.Empty : row.Field<string>("getcrossrefresultsuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetcrossrefresults(ref DataRow row, Getcrossrefresults entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("vend_item", entity.vendItem);
         row.SetField("abs_num", entity.absNum);
         row.SetField("uom", entity.uom);
         row.SetField("ref_type", entity.refType);
         row.SetField("box_qty", entity.boxQty);
         row.SetField("case_quantity", entity.caseQuantity);
         row.SetField("pallet_quantity", entity.palletQuantity);
         row.SetField("stack_height", entity.stackHeight);
         row.SetField("venddetailrowid", entity.venddetailrowid.ToByteArray());
         row.SetField("getcrossrefresultsuserfield", entity.getcrossrefresultsuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591