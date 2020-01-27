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

namespace Infor.Sxe.Shared.Data.Models.Pdsaosystemmenuitem
{
   [ModelName("Infor.Sxe.Shared.Data.Models.Pdsaosystemmenuitem.Aosystemmenuitem")]
   public partial class Aosystemmenuitem : ModelBase
   {
      [StringValidationAttribute]
      public string menuset { get; set; }
      [StringValidationAttribute]
      public string functionname { get; set; }
      [StringValidationAttribute]
      public string trmgrlang { get; set; }
      [StringValidationAttribute]
      public string windowtitle { get; set; }
      public int minSecurityLevel { get; set; }
      [StringValidationAttribute]
      public string menutitle { get; set; }
      [StringValidationAttribute]
      public string buttontitle { get; set; }
      [StringValidationAttribute]
      public string tiptext { get; set; }
      [StringValidationAttribute]
      public string parentmenu { get; set; }
      public int parentpos { get; set; }
      [StringValidationAttribute]
      public string recordtype { get; set; }
      [StringValidationAttribute]
      public string keyviewer { get; set; }
      [StringValidationAttribute]
      public string nxtrendOurproc { get; set; }
      [StringValidationAttribute]
      public string browsename { get; set; }
      [StringValidationAttribute]
      public string website { get; set; }
      [StringValidationAttribute]
      public string standardty { get; set; }
      [StringValidationAttribute]
      public string crmsubject { get; set; }
      [StringValidationAttribute]
      public string functionprocedure { get; set; }
      [StringValidationAttribute]
      public string pvSassmRowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Aosystemmenuitem BuildAosystemmenuitemFromRow(DataRow row)
      {
         Aosystemmenuitem entity = new Aosystemmenuitem();
         entity.menuset = row.IsNull("menuset") ? string.Empty : row.Field<string>("menuset");
         entity.functionname = row.IsNull("functionname") ? string.Empty : row.Field<string>("functionname");
         entity.trmgrlang = row.IsNull("trmgrlang") ? string.Empty : row.Field<string>("trmgrlang");
         entity.windowtitle = row.IsNull("windowtitle") ? string.Empty : row.Field<string>("windowtitle");
         entity.minSecurityLevel = row.IsNull("min_security_level") ? 0 : row.Field<int>("min_security_level");
         entity.menutitle = row.IsNull("menutitle") ? string.Empty : row.Field<string>("menutitle");
         entity.buttontitle = row.IsNull("buttontitle") ? string.Empty : row.Field<string>("buttontitle");
         entity.tiptext = row.IsNull("tiptext") ? string.Empty : row.Field<string>("tiptext");
         entity.parentmenu = row.IsNull("parentmenu") ? string.Empty : row.Field<string>("parentmenu");
         entity.parentpos = row.IsNull("parentpos") ? 0 : row.Field<int>("parentpos");
         entity.recordtype = row.IsNull("recordtype") ? string.Empty : row.Field<string>("recordtype");
         entity.keyviewer = row.IsNull("keyviewer") ? string.Empty : row.Field<string>("keyviewer");
         entity.nxtrendOurproc = row.IsNull("nxtrend_ourproc") ? string.Empty : row.Field<string>("nxtrend_ourproc");
         entity.browsename = row.IsNull("browsename") ? string.Empty : row.Field<string>("browsename");
         entity.website = row.IsNull("website") ? string.Empty : row.Field<string>("website");
         entity.standardty = row.IsNull("standardty") ? string.Empty : row.Field<string>("standardty");
         entity.crmsubject = row.IsNull("crmsubject") ? string.Empty : row.Field<string>("crmsubject");
         entity.functionprocedure = row.IsNull("functionprocedure") ? string.Empty : row.Field<string>("functionprocedure");
         entity.pvSassmRowid = row.Field<byte[]>("pv_sassm-rowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAosystemmenuitem(ref DataRow row, Aosystemmenuitem entity)
      {
         row.SetField("menuset", entity.menuset);
         row.SetField("functionname", entity.functionname);
         row.SetField("trmgrlang", entity.trmgrlang);
         row.SetField("windowtitle", entity.windowtitle);
         row.SetField("min_security_level", entity.minSecurityLevel);
         row.SetField("menutitle", entity.menutitle);
         row.SetField("buttontitle", entity.buttontitle);
         row.SetField("tiptext", entity.tiptext);
         row.SetField("parentmenu", entity.parentmenu);
         row.SetField("parentpos", entity.parentpos);
         row.SetField("recordtype", entity.recordtype);
         row.SetField("keyviewer", entity.keyviewer);
         row.SetField("nxtrend_ourproc", entity.nxtrendOurproc);
         row.SetField("browsename", entity.browsename);
         row.SetField("website", entity.website);
         row.SetField("standardty", entity.standardty);
         row.SetField("crmsubject", entity.crmsubject);
         row.SetField("functionprocedure", entity.functionprocedure);
         row.SetField("pv_sassm-rowid", entity.pvSassmRowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
