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

namespace Infor.Sxe.AP.Data.Models.Pdsapeiinvdetpolnmanadd
{
   [ModelName("Infor.Sxe.AP.Data.Models.Pdsapeiinvdetpolnmanadd.Apeiinvdetpolnmanadd")]
   public partial class Apeiinvdetpolnmanadd : ModelBase
   {
      public int addonno { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public decimal origamt { get; set; }
      public decimal polnaddonamt { get; set; }
      public decimal allocthisln { get; set; }
      public decimal addonproof { get; set; }
      public decimal totallocamt { get; set; }
      public int addonseqno { get; set; }
      public int cono { get; set; }
      public int pono { get; set; }
      public int posuf { get; set; }
      public int lineno { get; set; }
      public int detailseqno { get; set; }
      [StringValidationAttribute]
      public string groupnm { get; set; }
      public DateTime? createddt { get; set; }
      public int groupseqno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string apinvno { get; set; }
      [StringValidationAttribute]
      public string operinit { get; set; }
      public int oldpono { get; set; }
      public int oldposuf { get; set; }
      public int oldlineno { get; set; }
      public decimal origlnaddamt { get; set; }
      [StringValidationAttribute]
      public string detailty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Apeiinvdetpolnmanadd BuildApeiinvdetpolnmanaddFromRow(DataRow row)
      {
         Apeiinvdetpolnmanadd entity = new Apeiinvdetpolnmanadd();
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.origamt = row.IsNull("origamt") ? decimal.Zero : row.Field<decimal>("origamt");
         entity.polnaddonamt = row.IsNull("polnaddonamt") ? decimal.Zero : row.Field<decimal>("polnaddonamt");
         entity.allocthisln = row.IsNull("allocthisln") ? decimal.Zero : row.Field<decimal>("allocthisln");
         entity.addonproof = row.IsNull("addonproof") ? decimal.Zero : row.Field<decimal>("addonproof");
         entity.totallocamt = row.IsNull("totallocamt") ? decimal.Zero : row.Field<decimal>("totallocamt");
         entity.addonseqno = row.IsNull("addonseqno") ? 0 : row.Field<int>("addonseqno");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.pono = row.IsNull("pono") ? 0 : row.Field<int>("pono");
         entity.posuf = row.IsNull("posuf") ? 0 : row.Field<int>("posuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.detailseqno = row.IsNull("detailseqno") ? 0 : row.Field<int>("detailseqno");
         entity.groupnm = row.IsNull("groupnm") ? string.Empty : row.Field<string>("groupnm");
         entity.createddt = row.Field<DateTime?>("createddt");
         entity.groupseqno = row.IsNull("groupseqno") ? 0 : row.Field<int>("groupseqno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.oldpono = row.IsNull("oldpono") ? 0 : row.Field<int>("oldpono");
         entity.oldposuf = row.IsNull("oldposuf") ? 0 : row.Field<int>("oldposuf");
         entity.oldlineno = row.IsNull("oldlineno") ? 0 : row.Field<int>("oldlineno");
         entity.origlnaddamt = row.IsNull("origlnaddamt") ? decimal.Zero : row.Field<decimal>("origlnaddamt");
         entity.detailty = row.IsNull("detailty") ? string.Empty : row.Field<string>("detailty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromApeiinvdetpolnmanadd(ref DataRow row, Apeiinvdetpolnmanadd entity)
      {
         row.SetField("addonno", entity.addonno);
         row.SetField("descrip", entity.descrip);
         row.SetField("origamt", entity.origamt);
         row.SetField("polnaddonamt", entity.polnaddonamt);
         row.SetField("allocthisln", entity.allocthisln);
         row.SetField("addonproof", entity.addonproof);
         row.SetField("totallocamt", entity.totallocamt);
         row.SetField("addonseqno", entity.addonseqno);
         row.SetField("cono", entity.cono);
         row.SetField("pono", entity.pono);
         row.SetField("posuf", entity.posuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("detailseqno", entity.detailseqno);
         row.SetField("groupnm", entity.groupnm);
         row.SetField("createddt", entity.createddt);
         row.SetField("groupseqno", entity.groupseqno);
         row.SetField("vendno", entity.vendno);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("operinit", entity.operinit);
         row.SetField("oldpono", entity.oldpono);
         row.SetField("oldposuf", entity.oldposuf);
         row.SetField("oldlineno", entity.oldlineno);
         row.SetField("origlnaddamt", entity.origlnaddamt);
         row.SetField("detailty", entity.detailty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591