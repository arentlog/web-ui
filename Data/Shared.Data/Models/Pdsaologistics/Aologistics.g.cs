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

namespace Infor.Sxe.Shared.Data.Models.Pdsaologistics
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaologistics.Aologistics")]
   public partial class Aologistics : ModelBase
   {
      public int cono { get; set; }
      public decimal iBCutToleranceQty { get; set; }
      public bool shiplabelfl { get; set; }
      public bool iBDfltForceCutQtyFl { get; set; }
      public bool screenposfl { get; set; }
      public bool iBCutScrapOverFl { get; set; }
      [StringValidationAttribute]
      public string unibardir { get; set; }
      [StringValidationAttribute]
      public string unibarcfg { get; set; }
      [StringValidationAttribute]
      public string unibarexec { get; set; }
      [StringValidationAttribute]
      public string unibardelim { get; set; }
      public bool unibardebug { get; set; }
      [StringValidationAttribute]
      public string unibarlog { get; set; }
      [StringValidationAttribute]
      public string unibarMsg { get; set; }
      [StringValidationAttribute]
      public string version { get; set; }
      [StringValidationAttribute]
      public string jrnloperinit { get; set; }
      [StringValidationAttribute]
      public string whzone { get; set; }
      public bool zeroqtyfl { get; set; }
      public bool custnotesfl { get; set; }
      public bool icspnotesfl { get; set; }
      public bool icsp2notesfl { get; set; }
      public bool twlAddrLine3Fl { get; set; }
      [StringValidationAttribute]
      public string twlAddrLine3FlLabel { get; set; }
      [StringValidationAttribute]
      public string holdoerm { get; set; }
      public bool holdporm { get; set; }
      [StringValidationAttribute]
      public string holdoeapprty { get; set; }
      [StringValidationAttribute]
      public string zeroapprty { get; set; }
      public bool delinactfl { get; set; }
      [StringValidationAttribute]
      public string vastex { get; set; }
      [StringValidationAttribute]
      public string vastit { get; set; }
      [StringValidationAttribute]
      public string ibaoRowid { get; set; }
      [StringValidationAttribute]
      public string wlaoRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aologistics BuildAologisticsFromRow(DataRow row)
      {
         Aologistics entity = new Aologistics();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.iBCutToleranceQty = row.IsNull("IBCutToleranceQty") ? decimal.Zero : row.Field<decimal>("IBCutToleranceQty");
         entity.shiplabelfl = row.Field<bool>("shiplabelfl");
         entity.iBDfltForceCutQtyFl = row.Field<bool>("IBDfltForceCutQtyFl");
         entity.screenposfl = row.Field<bool>("screenposfl");
         entity.iBCutScrapOverFl = row.Field<bool>("IBCutScrapOverFl");
         entity.unibardir = row.IsNull("unibardir") ? string.Empty : row.Field<string>("unibardir");
         entity.unibarcfg = row.IsNull("unibarcfg") ? string.Empty : row.Field<string>("unibarcfg");
         entity.unibarexec = row.IsNull("unibarexec") ? string.Empty : row.Field<string>("unibarexec");
         entity.unibardelim = row.IsNull("unibardelim") ? string.Empty : row.Field<string>("unibardelim");
         entity.unibardebug = row.Field<bool>("unibardebug");
         entity.unibarlog = row.IsNull("unibarlog") ? string.Empty : row.Field<string>("unibarlog");
         entity.unibarMsg = row.IsNull("unibarMsg") ? string.Empty : row.Field<string>("unibarMsg");
         entity.version = row.IsNull("version") ? string.Empty : row.Field<string>("version");
         entity.jrnloperinit = row.IsNull("jrnloperinit") ? string.Empty : row.Field<string>("jrnloperinit");
         entity.whzone = row.IsNull("whzone") ? string.Empty : row.Field<string>("whzone");
         entity.zeroqtyfl = row.Field<bool>("zeroqtyfl");
         entity.custnotesfl = row.Field<bool>("custnotesfl");
         entity.icspnotesfl = row.Field<bool>("icspnotesfl");
         entity.icsp2notesfl = row.Field<bool>("icsp2notesfl");
         entity.twlAddrLine3Fl = row.Field<bool>("TwlAddrLine3Fl");
         entity.twlAddrLine3FlLabel = row.IsNull("TwlAddrLine3Fl-label") ? string.Empty : row.Field<string>("TwlAddrLine3Fl-label");
         entity.holdoerm = row.IsNull("holdoerm") ? string.Empty : row.Field<string>("holdoerm");
         entity.holdporm = row.Field<bool>("holdporm");
         entity.holdoeapprty = row.IsNull("holdoeapprty") ? string.Empty : row.Field<string>("holdoeapprty");
         entity.zeroapprty = row.IsNull("zeroapprty") ? string.Empty : row.Field<string>("zeroapprty");
         entity.delinactfl = row.Field<bool>("delinactfl");
         entity.vastex = row.IsNull("vastex") ? string.Empty : row.Field<string>("vastex");
         entity.vastit = row.IsNull("vastit") ? string.Empty : row.Field<string>("vastit");
         entity.ibaoRowid = row.Field<byte[]>("ibao-rowid").ToStringEncoded();
         entity.wlaoRowid = row.Field<byte[]>("wlao-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAologistics(ref DataRow row, Aologistics entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("IBCutToleranceQty", entity.iBCutToleranceQty);
         row.SetField("shiplabelfl", entity.shiplabelfl);
         row.SetField("IBDfltForceCutQtyFl", entity.iBDfltForceCutQtyFl);
         row.SetField("screenposfl", entity.screenposfl);
         row.SetField("IBCutScrapOverFl", entity.iBCutScrapOverFl);
         row.SetField("unibardir", entity.unibardir);
         row.SetField("unibarcfg", entity.unibarcfg);
         row.SetField("unibarexec", entity.unibarexec);
         row.SetField("unibardelim", entity.unibardelim);
         row.SetField("unibardebug", entity.unibardebug);
         row.SetField("unibarlog", entity.unibarlog);
         row.SetField("unibarMsg", entity.unibarMsg);
         row.SetField("version", entity.version);
         row.SetField("jrnloperinit", entity.jrnloperinit);
         row.SetField("whzone", entity.whzone);
         row.SetField("zeroqtyfl", entity.zeroqtyfl);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("icspnotesfl", entity.icspnotesfl);
         row.SetField("icsp2notesfl", entity.icsp2notesfl);
         row.SetField("TwlAddrLine3Fl", entity.twlAddrLine3Fl);
         row.SetField("TwlAddrLine3Fl-label", entity.twlAddrLine3FlLabel);
         row.SetField("holdoerm", entity.holdoerm);
         row.SetField("holdporm", entity.holdporm);
         row.SetField("holdoeapprty", entity.holdoeapprty);
         row.SetField("zeroapprty", entity.zeroapprty);
         row.SetField("delinactfl", entity.delinactfl);
         row.SetField("vastex", entity.vastex);
         row.SetField("vastit", entity.vastit);
         row.SetField("ibao-rowid", entity.ibaoRowid.ToByteArray());
         row.SetField("wlao-rowid", entity.wlaoRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591