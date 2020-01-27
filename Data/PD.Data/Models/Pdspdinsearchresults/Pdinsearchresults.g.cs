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

namespace Infor.Sxe.PD.Data.Models.Pdspdinsearchresults
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdinsearchresults.Pdinsearchresults")]
   public partial class Pdinsearchresults : ModelBase
   {
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string orderno { get; set; }
      [StringValidationAttribute]
      public string claimno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string statusty { get; set; }
      public DateTime? invdt { get; set; }
      public DateTime? paiddt { get; set; }
      public decimal totclmamt { get; set; }
      public decimal totpaidamt { get; set; }
      public decimal varamt { get; set; }
      public decimal varpct { get; set; }
      public bool tolexpfl { get; set; }
      public bool tolexpflv { get; set; }
      [StringValidationAttribute]
      public string origordno { get; set; }
      public decimal origcustno { get; set; }
      [StringValidationAttribute]
      public string origshipto { get; set; }
      [StringValidationAttribute]
      public string origcustomer { get; set; }
      [StringValidationAttribute]
      public string pdenhrowid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdinsearchresults BuildPdinsearchresultsFromRow(DataRow row)
      {
         Pdinsearchresults entity = new Pdinsearchresults();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.orderno = row.IsNull("orderno") ? string.Empty : row.Field<string>("orderno");
         entity.claimno = row.IsNull("claimno") ? string.Empty : row.Field<string>("claimno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.statusty = row.IsNull("statusty") ? string.Empty : row.Field<string>("statusty");
         entity.invdt = row.Field<DateTime?>("invdt");
         entity.paiddt = row.Field<DateTime?>("paiddt");
         entity.totclmamt = row.IsNull("totclmamt") ? decimal.Zero : row.Field<decimal>("totclmamt");
         entity.totpaidamt = row.IsNull("totpaidamt") ? decimal.Zero : row.Field<decimal>("totpaidamt");
         entity.varamt = row.IsNull("varamt") ? decimal.Zero : row.Field<decimal>("varamt");
         entity.varpct = row.IsNull("varpct") ? decimal.Zero : row.Field<decimal>("varpct");
         entity.tolexpfl = row.Field<bool>("tolexpfl");
         entity.tolexpflv = row.Field<bool>("tolexpflv");
         entity.origordno = row.IsNull("origordno") ? string.Empty : row.Field<string>("origordno");
         entity.origcustno = row.IsNull("origcustno") ? decimal.Zero : row.Field<decimal>("origcustno");
         entity.origshipto = row.IsNull("origshipto") ? string.Empty : row.Field<string>("origshipto");
         entity.origcustomer = row.IsNull("origcustomer") ? string.Empty : row.Field<string>("origcustomer");
         entity.pdenhrowid = row.Field<byte[]>("pdenhrowid").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdinsearchresults(ref DataRow row, Pdinsearchresults entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("orderno", entity.orderno);
         row.SetField("claimno", entity.claimno);
         row.SetField("seqno", entity.seqno);
         row.SetField("statusty", entity.statusty);
         row.SetField("invdt", entity.invdt);
         row.SetField("paiddt", entity.paiddt);
         row.SetField("totclmamt", entity.totclmamt);
         row.SetField("totpaidamt", entity.totpaidamt);
         row.SetField("varamt", entity.varamt);
         row.SetField("varpct", entity.varpct);
         row.SetField("tolexpfl", entity.tolexpfl);
         row.SetField("tolexpflv", entity.tolexpflv);
         row.SetField("origordno", entity.origordno);
         row.SetField("origcustno", entity.origcustno);
         row.SetField("origshipto", entity.origshipto);
         row.SetField("origcustomer", entity.origcustomer);
         row.SetField("pdenhrowid", entity.pdenhrowid.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591