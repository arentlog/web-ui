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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdetbanner
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdetbanner.Apeiinvdetbanner")]
   public partial class Apeiinvdetbanner : ModelBase
   {
      [StringValidationAttribute]
      public string apeiRowid { get; set; }
      [StringValidationAttribute]
      public string groupnm { get; set; }
      [StringValidationAttribute]
      public string groupdesc { get; set; }
      public DateTime? createddt { get; set; }
      public int groupseqno { get; set; }
      public int invseqno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendorname { get; set; }
      [StringValidationAttribute]
      public string apinvno { get; set; }
      public DateTime? invdt { get; set; }
      public decimal amount { get; set; }
      public int transcd { get; set; }
      [StringValidationAttribute]
      public string transcdword { get; set; }
      [StringValidationAttribute]
      public string proctype { get; set; }
      [StringValidationAttribute]
      public string proctypeword { get; set; }
      public int stagecd { get; set; }
      public bool addontabenabledfl { get; set; }
      public bool gldisttabenabledfl { get; set; }
      public bool poheadertabenabledfl { get; set; }
      public bool termstabenabledfl { get; set; }
      public bool additionalinfotabenabledfl { get; set; }
      public bool manualpaymentstabenabledfl { get; set; }
      public bool misccreditstabenabledfl { get; set; }
      public bool taxdetailenabledfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdetbanner BuildApeiinvdetbannerFromRow(DataRow row)
      {
         Apeiinvdetbanner entity = new Apeiinvdetbanner();
         entity.apeiRowid = row.Field<byte[]>("apei-rowid").ToStringEncoded();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.groupdesc = row.IsNull("groupdesc") ? string.Empty : row.Field<string>("groupdesc");
         entity.createddt = row.Field<DateTime?>("createddt");
         entity.groupseqno = row.IsNull("groupseqno") ? 0 : row.Field<int>("groupseqno");
         entity.invseqno = row.IsNull("invseqno") ? 0 : row.Field<int>("invseqno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendorname = row.IsNull("vendorname") ? string.Empty : row.Field<string>("vendorname");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.invdt = row.Field<DateTime?>("invdt");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.transcd = row.IsNull("transcd") ? 0 : row.Field<int>("transcd");
         entity.transcdword = row.IsNull("transcdword") ? string.Empty : row.Field<string>("transcdword");
         entity.proctype = row.IsNull("proctype") ? string.Empty : row.Field<string>("proctype");
         entity.proctypeword = row.IsNull("proctypeword") ? string.Empty : row.Field<string>("proctypeword");
         entity.stagecd = row.IsNull("stagecd") ? 0 : row.Field<int>("stagecd");
         entity.addontabenabledfl = row.Field<bool>("addontabenabledfl");
         entity.gldisttabenabledfl = row.Field<bool>("gldisttabenabledfl");
         entity.poheadertabenabledfl = row.Field<bool>("poheadertabenabledfl");
         entity.termstabenabledfl = row.Field<bool>("termstabenabledfl");
         entity.additionalinfotabenabledfl = row.Field<bool>("additionalinfotabenabledfl");
         entity.manualpaymentstabenabledfl = row.Field<bool>("manualpaymentstabenabledfl");
         entity.misccreditstabenabledfl = row.Field<bool>("misccreditstabenabledfl");
         entity.taxdetailenabledfl = row.Field<bool>("taxdetailenabledfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdetbanner(ref DataRow row, Apeiinvdetbanner entity)
      {
         row.SetField("apei-rowid", entity.apeiRowid.ToByteArray());
         row.SetField("groupnm", entity.groupnm);
         row.SetField("groupdesc", entity.groupdesc);
         row.SetField("createddt", entity.createddt);
         row.SetField("groupseqno", entity.groupseqno);
         row.SetField("invseqno", entity.invseqno);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendorname", entity.vendorname);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("invdt", entity.invdt);
         row.SetField("amount", entity.amount);
         row.SetField("transcd", entity.transcd);
         row.SetField("transcdword", entity.transcdword);
         row.SetField("proctype", entity.proctype);
         row.SetField("proctypeword", entity.proctypeword);
         row.SetField("stagecd", entity.stagecd);
         row.SetField("addontabenabledfl", entity.addontabenabledfl);
         row.SetField("gldisttabenabledfl", entity.gldisttabenabledfl);
         row.SetField("poheadertabenabledfl", entity.poheadertabenabledfl);
         row.SetField("termstabenabledfl", entity.termstabenabledfl);
         row.SetField("additionalinfotabenabledfl", entity.additionalinfotabenabledfl);
         row.SetField("manualpaymentstabenabledfl", entity.manualpaymentstabenabledfl);
         row.SetField("misccreditstabenabledfl", entity.misccreditstabenabledfl);
         row.SetField("taxdetailenabledfl", entity.taxdetailenabledfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
