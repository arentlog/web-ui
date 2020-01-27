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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdettaxes
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdettaxes.Apeiinvdettaxes")]
   public partial class Apeiinvdettaxes : ModelBase
   {
      [StringValidationAttribute]
      public string groupnm { get; set; }
      public int groupseqno { get; set; }
      public DateTime? createddt { get; set; }
      public int invseqno { get; set; }
      public decimal settamt { get; set; }
      public decimal settpct { get; set; }
      public decimal twetax1 { get; set; }
      public decimal twetax2 { get; set; }
      public decimal twetax3 { get; set; }
      public decimal twetax4 { get; set; }
      public decimal vendtax1 { get; set; }
      public decimal vendtax2 { get; set; }
      public decimal vendtax3 { get; set; }
      public decimal vendtax4 { get; set; }
      public decimal distribtax1 { get; set; }
      public decimal distribtax2 { get; set; }
      public decimal distribtax3 { get; set; }
      public decimal distribtax4 { get; set; }
      public decimal twetaxttl { get; set; }
      public decimal vendortaxttl { get; set; }
      public decimal distribtaxttl { get; set; }
      [StringValidationAttribute]
      public string taxgroup1 { get; set; }
      [StringValidationAttribute]
      public string taxgroup2 { get; set; }
      [StringValidationAttribute]
      public string taxgroup3 { get; set; }
      [StringValidationAttribute]
      public string taxgroup4 { get; set; }
      public bool tax2hidden { get; set; }
      public bool tax3hidden { get; set; }
      public bool tax4hidden { get; set; }
      public bool vendtax1sensitive { get; set; }
      public bool vendtax2sensitive { get; set; }
      public bool vendtax3sensitive { get; set; }
      public bool vendtax4sensitive { get; set; }
      public bool disttax1sensitive { get; set; }
      public bool disttax2sensitive { get; set; }
      public bool disttax3sensitive { get; set; }
      public bool disttax4sensitive { get; set; }
      public bool settsensitive { get; set; }
      public bool setthidden { get; set; }
      public bool disputesensitive { get; set; }
      public bool disputefl { get; set; }
      public bool reversalfl { get; set; }
      [StringValidationAttribute]
      public string apeiRowid { get; set; }
      [StringValidationAttribute]
      public string apeiRowpointer { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdettaxes BuildApeiinvdettaxesFromRow(DataRow row)
      {
         Apeiinvdettaxes entity = new Apeiinvdettaxes();
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.groupseqno = row.IsNull("groupseqno") ? 0 : row.Field<int>("groupseqno");
         entity.createddt = row.Field<DateTime?>("createddt");
         entity.invseqno = row.IsNull("invseqno") ? 0 : row.Field<int>("invseqno");
         entity.settamt = row.IsNull("settamt") ? decimal.Zero : row.Field<decimal>("settamt");
         entity.settpct = row.IsNull("settpct") ? decimal.Zero : row.Field<decimal>("settpct");
         entity.twetax1 = row.IsNull("twetax1") ? decimal.Zero : row.Field<decimal>("twetax1");
         entity.twetax2 = row.IsNull("twetax2") ? decimal.Zero : row.Field<decimal>("twetax2");
         entity.twetax3 = row.IsNull("twetax3") ? decimal.Zero : row.Field<decimal>("twetax3");
         entity.twetax4 = row.IsNull("twetax4") ? decimal.Zero : row.Field<decimal>("twetax4");
         entity.vendtax1 = row.IsNull("vendtax1") ? decimal.Zero : row.Field<decimal>("vendtax1");
         entity.vendtax2 = row.IsNull("vendtax2") ? decimal.Zero : row.Field<decimal>("vendtax2");
         entity.vendtax3 = row.IsNull("vendtax3") ? decimal.Zero : row.Field<decimal>("vendtax3");
         entity.vendtax4 = row.IsNull("vendtax4") ? decimal.Zero : row.Field<decimal>("vendtax4");
         entity.distribtax1 = row.IsNull("distribtax1") ? decimal.Zero : row.Field<decimal>("distribtax1");
         entity.distribtax2 = row.IsNull("distribtax2") ? decimal.Zero : row.Field<decimal>("distribtax2");
         entity.distribtax3 = row.IsNull("distribtax3") ? decimal.Zero : row.Field<decimal>("distribtax3");
         entity.distribtax4 = row.IsNull("distribtax4") ? decimal.Zero : row.Field<decimal>("distribtax4");
         entity.twetaxttl = row.IsNull("twetaxttl") ? decimal.Zero : row.Field<decimal>("twetaxttl");
         entity.vendortaxttl = row.IsNull("vendortaxttl") ? decimal.Zero : row.Field<decimal>("vendortaxttl");
         entity.distribtaxttl = row.IsNull("distribtaxttl") ? decimal.Zero : row.Field<decimal>("distribtaxttl");
         entity.taxgroup1 = row.IsNull("taxgroup1") ? string.Empty : row.Field<string>("taxgroup1");
         entity.taxgroup2 = row.IsNull("taxgroup2") ? string.Empty : row.Field<string>("taxgroup2");
         entity.taxgroup3 = row.IsNull("taxgroup3") ? string.Empty : row.Field<string>("taxgroup3");
         entity.taxgroup4 = row.IsNull("taxgroup4") ? string.Empty : row.Field<string>("taxgroup4");
         entity.tax2hidden = row.Field<bool>("tax2hidden");
         entity.tax3hidden = row.Field<bool>("tax3hidden");
         entity.tax4hidden = row.Field<bool>("tax4hidden");
         entity.vendtax1sensitive = row.Field<bool>("vendtax1sensitive");
         entity.vendtax2sensitive = row.Field<bool>("vendtax2sensitive");
         entity.vendtax3sensitive = row.Field<bool>("vendtax3sensitive");
         entity.vendtax4sensitive = row.Field<bool>("vendtax4sensitive");
         entity.disttax1sensitive = row.Field<bool>("disttax1sensitive");
         entity.disttax2sensitive = row.Field<bool>("disttax2sensitive");
         entity.disttax3sensitive = row.Field<bool>("disttax3sensitive");
         entity.disttax4sensitive = row.Field<bool>("disttax4sensitive");
         entity.settsensitive = row.Field<bool>("settsensitive");
         entity.setthidden = row.Field<bool>("setthidden");
         entity.disputesensitive = row.Field<bool>("disputesensitive");
         entity.disputefl = row.Field<bool>("disputefl");
         entity.reversalfl = row.Field<bool>("reversalfl");
         entity.apeiRowid = row.Field<byte[]>("apei-rowid").ToStringEncoded();
         entity.apeiRowpointer = row.IsNull("apei-rowpointer") ? string.Empty : row.Field<string>("apei-rowpointer");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdettaxes(ref DataRow row, Apeiinvdettaxes entity)
      {
         row.SetField("groupnm", entity.groupnm);
         row.SetField("groupseqno", entity.groupseqno);
         row.SetField("createddt", entity.createddt);
         row.SetField("invseqno", entity.invseqno);
         row.SetField("settamt", entity.settamt);
         row.SetField("settpct", entity.settpct);
         row.SetField("twetax1", entity.twetax1);
         row.SetField("twetax2", entity.twetax2);
         row.SetField("twetax3", entity.twetax3);
         row.SetField("twetax4", entity.twetax4);
         row.SetField("vendtax1", entity.vendtax1);
         row.SetField("vendtax2", entity.vendtax2);
         row.SetField("vendtax3", entity.vendtax3);
         row.SetField("vendtax4", entity.vendtax4);
         row.SetField("distribtax1", entity.distribtax1);
         row.SetField("distribtax2", entity.distribtax2);
         row.SetField("distribtax3", entity.distribtax3);
         row.SetField("distribtax4", entity.distribtax4);
         row.SetField("twetaxttl", entity.twetaxttl);
         row.SetField("vendortaxttl", entity.vendortaxttl);
         row.SetField("distribtaxttl", entity.distribtaxttl);
         row.SetField("taxgroup1", entity.taxgroup1);
         row.SetField("taxgroup2", entity.taxgroup2);
         row.SetField("taxgroup3", entity.taxgroup3);
         row.SetField("taxgroup4", entity.taxgroup4);
         row.SetField("tax2hidden", entity.tax2hidden);
         row.SetField("tax3hidden", entity.tax3hidden);
         row.SetField("tax4hidden", entity.tax4hidden);
         row.SetField("vendtax1sensitive", entity.vendtax1sensitive);
         row.SetField("vendtax2sensitive", entity.vendtax2sensitive);
         row.SetField("vendtax3sensitive", entity.vendtax3sensitive);
         row.SetField("vendtax4sensitive", entity.vendtax4sensitive);
         row.SetField("disttax1sensitive", entity.disttax1sensitive);
         row.SetField("disttax2sensitive", entity.disttax2sensitive);
         row.SetField("disttax3sensitive", entity.disttax3sensitive);
         row.SetField("disttax4sensitive", entity.disttax4sensitive);
         row.SetField("settsensitive", entity.settsensitive);
         row.SetField("setthidden", entity.setthidden);
         row.SetField("disputesensitive", entity.disputesensitive);
         row.SetField("disputefl", entity.disputefl);
         row.SetField("reversalfl", entity.reversalfl);
         row.SetField("apei-rowid", entity.apeiRowid.ToByteArray());
         row.SetField("apei-rowpointer", entity.apeiRowpointer);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591