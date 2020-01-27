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

namespace Infor.Sxe.PD.Data.Models.Pdspderaddreceipt
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspderaddreceipt.Pderaddreceipt")]
   public partial class Pderaddreceipt : ModelBase
   {
      [StringValidationAttribute]
      public string recordtype { get; set; }
      public int claimno { get; set; }
      public int claimseqno { get; set; }
      [StringValidationAttribute]
      public string statustype { get; set; }
      public decimal vendno { get; set; }
      public int divno { get; set; }
      [StringValidationAttribute]
      public string apinvno { get; set; }
      public DateTime? receiptdt { get; set; }
      public decimal receiptamt { get; set; }
      [StringValidationAttribute]
      public string sourcepros { get; set; }
      [StringValidationAttribute]
      public string srcupdtty { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int secure { get; set; }
      public decimal vatamt { get; set; }
      public decimal nettamt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pderaddreceipt BuildPderaddreceiptFromRow(DataRow row)
      {
         Pderaddreceipt entity = new Pderaddreceipt();
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.claimno = row.IsNull("claimno") ? 0 : row.Field<int>("claimno");
         entity.claimseqno = row.IsNull("claimseqno") ? 0 : row.Field<int>("claimseqno");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.receiptdt = row.Field<DateTime?>("receiptdt");
         entity.receiptamt = row.IsNull("receiptamt") ? decimal.Zero : row.Field<decimal>("receiptamt");
         entity.sourcepros = row.IsNull("sourcepros") ? string.Empty : row.Field<string>("sourcepros");
         entity.srcupdtty = row.IsNull("srcupdtty") ? string.Empty : row.Field<string>("srcupdtty");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.secure = row.IsNull("secure") ? 0 : row.Field<int>("secure");
         entity.vatamt = row.IsNull("vatamt") ? decimal.Zero : row.Field<decimal>("vatamt");
         entity.nettamt = row.IsNull("nettamt") ? decimal.Zero : row.Field<decimal>("nettamt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderaddreceipt(ref DataRow row, Pderaddreceipt entity)
      {
         row.SetField("recordtype", entity.recordtype);
         row.SetField("claimno", entity.claimno);
         row.SetField("claimseqno", entity.claimseqno);
         row.SetField("statustype", entity.statustype);
         row.SetField("vendno", entity.vendno);
         row.SetField("divno", entity.divno);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("receiptdt", entity.receiptdt);
         row.SetField("receiptamt", entity.receiptamt);
         row.SetField("sourcepros", entity.sourcepros);
         row.SetField("srcupdtty", entity.srcupdtty);
         row.SetField("refer", entity.refer);
         row.SetField("secure", entity.secure);
         row.SetField("vatamt", entity.vatamt);
         row.SetField("nettamt", entity.nettamt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
