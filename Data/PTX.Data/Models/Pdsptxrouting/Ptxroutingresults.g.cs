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

namespace Infor.Sxe.PTX.Data.Models.Pdsptxrouting
{
   [ModelName("Infor.Sxe.PTX.Data.Models.Pdsptxrouting.Ptxroutingresults")]
   public partial class Ptxroutingresults : ModelBase
   {
      [StringValidationAttribute]
      public string keytype { get; set; }
      [StringValidationAttribute]
      public string ptxrouteruleRowid { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendorname { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string shipfmname { get; set; }
      public int hierarchy { get; set; }
      [StringValidationAttribute]
      public string custrowpointer { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shiptorowpointer { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string srcrowpointer { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ptxroutingresults BuildPtxroutingresultsFromRow(DataRow row)
      {
         Ptxroutingresults entity = new Ptxroutingresults();
         entity.keytype = row.IsNull("keytype") ? string.Empty : row.Field<string>("keytype");
         entity.ptxrouteruleRowid = row.Field<byte[]>("ptxrouterule-rowid").ToStringEncoded();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendorname = row.IsNull("vendorname") ? string.Empty : row.Field<string>("vendorname");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.shipfmname = row.IsNull("shipfmname") ? string.Empty : row.Field<string>("shipfmname");
         entity.hierarchy = row.IsNull("hierarchy") ? 0 : row.Field<int>("hierarchy");
         entity.custrowpointer = row.IsNull("custrowpointer") ? string.Empty : row.Field<string>("custrowpointer");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shiptorowpointer = row.IsNull("shiptorowpointer") ? string.Empty : row.Field<string>("shiptorowpointer");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.srcrowpointer = row.IsNull("srcrowpointer") ? string.Empty : row.Field<string>("srcrowpointer");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPtxroutingresults(ref DataRow row, Ptxroutingresults entity)
      {
         row.SetField("keytype", entity.keytype);
         row.SetField("ptxrouterule-rowid", entity.ptxrouteruleRowid.ToByteArray());
         row.SetField("vendno", entity.vendno);
         row.SetField("vendorname", entity.vendorname);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("shipfmname", entity.shipfmname);
         row.SetField("hierarchy", entity.hierarchy);
         row.SetField("custrowpointer", entity.custrowpointer);
         row.SetField("custno", entity.custno);
         row.SetField("shiptorowpointer", entity.shiptorowpointer);
         row.SetField("shipto", entity.shipto);
         row.SetField("srcrowpointer", entity.srcrowpointer);
         row.SetField("prod", entity.prod);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
