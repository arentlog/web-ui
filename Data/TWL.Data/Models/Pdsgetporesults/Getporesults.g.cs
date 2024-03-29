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

namespace Infor.Sxe.TWL.Data.Models.Pdsgetporesults
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsgetporesults.Getporesults")]
   public partial class Getporesults : ModelBase
   {
      [StringValidationAttribute]
      public string poNum { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      [StringValidationAttribute]
      public string poFull { get; set; }
      [StringValidationAttribute]
      public string vendorId { get; set; }
      [StringValidationAttribute]
      public string rowStatus { get; set; }
      public int istat { get; set; }
      public int rtId { get; set; }
      public int lineCount { get; set; }
      [StringValidationAttribute]
      public string rtdetrowid { get; set; }
      [StringValidationAttribute]
      public string getporesultsuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Getporesults BuildGetporesultsFromRow(DataRow row)
      {
         Getporesults entity = new Getporesults();
         entity.poNum = row.IsNull("po_num") ? string.Empty : row.Field<string>("po_num");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.poFull = row.IsNull("po_full") ? string.Empty : row.Field<string>("po_full");
         entity.vendorId = row.IsNull("vendor_id") ? string.Empty : row.Field<string>("vendor_id");
         entity.rowStatus = row.IsNull("row_status") ? string.Empty : row.Field<string>("row_status");
         entity.istat = row.IsNull("istat") ? 0 : row.Field<int>("istat");
         entity.rtId = row.IsNull("rt_id") ? 0 : row.Field<int>("rt_id");
         entity.lineCount = row.IsNull("line_count") ? 0 : row.Field<int>("line_count");
         entity.rtdetrowid = row.Field<byte[]>("rtdetrowid").ToStringEncoded();
         entity.getporesultsuserfield = row.IsNull("getporesultsuserfield") ? string.Empty : row.Field<string>("getporesultsuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromGetporesults(ref DataRow row, Getporesults entity)
      {
         row.SetField("po_num", entity.poNum);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("po_full", entity.poFull);
         row.SetField("vendor_id", entity.vendorId);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("istat", entity.istat);
         row.SetField("rt_id", entity.rtId);
         row.SetField("line_count", entity.lineCount);
         row.SetField("rtdetrowid", entity.rtdetrowid.ToByteArray());
         row.SetField("getporesultsuserfield", entity.getporesultsuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
