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

namespace Infor.Sxe.TWL.Data.Models.Pdsbarcodedetailresults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsbarcodedetailresults.Barcodedetailresults")]
   public partial class Barcodedetailresults : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string barcodeId { get; set; }
      [StringValidationAttribute]
      public string attributeName { get; set; }
      public int valueStart { get; set; }
      public int valueLength { get; set; }
      [StringValidationAttribute]
      public string barcodedtlrowid { get; set; }
      [StringValidationAttribute]
      public string barcodedetailresultsuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Barcodedetailresults BuildBarcodedetailresultsFromRow(DataRow row)
      {
         Barcodedetailresults entity = new Barcodedetailresults();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.barcodeId = row.IsNull("barcode_id") ? string.Empty : row.Field<string>("barcode_id");
         entity.attributeName = row.IsNull("attribute_name") ? string.Empty : row.Field<string>("attribute_name");
         entity.valueStart = row.IsNull("value_start") ? 0 : row.Field<int>("value_start");
         entity.valueLength = row.IsNull("value_length") ? 0 : row.Field<int>("value_length");
         entity.barcodedtlrowid = row.Field<byte[]>("barcodedtlrowid").ToStringEncoded();
         entity.barcodedetailresultsuserfield = row.IsNull("barcodedetailresultsuserfield") ? string.Empty : row.Field<string>("barcodedetailresultsuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromBarcodedetailresults(ref DataRow row, Barcodedetailresults entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("barcode_id", entity.barcodeId);
         row.SetField("attribute_name", entity.attributeName);
         row.SetField("value_start", entity.valueStart);
         row.SetField("value_length", entity.valueLength);
         row.SetField("barcodedtlrowid", entity.barcodedtlrowid.ToByteArray());
         row.SetField("barcodedetailresultsuserfield", entity.barcodedetailresultsuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
