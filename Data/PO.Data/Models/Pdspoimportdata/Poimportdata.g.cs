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

namespace Infor.Sxe.PO.Data.Models.Pdspoimportdata
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspoimportdata.Poimportdata")]
   public partial class Poimportdata : ModelBase
   {
      public int lineno { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string orderbreak { get; set; }
      public int worksheetno { get; set; }
      public decimal addonamt1 { get; set; }
      [StringValidationAttribute]
      public string addondesc1 { get; set; }
      [StringValidationAttribute]
      public string apinvno { get; set; }
      [StringValidationAttribute]
      public string buyer { get; set; }
      [StringValidationAttribute]
      public string crreasonty { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      public int orderaltno { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public bool processfl { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string termstype { get; set; }
      public decimal totamt { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal wodiscamt { get; set; }
      public bool wodisctype { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public decimal qtyord { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal price { get; set; }
      public decimal netamt { get; set; }
      public bool printfl { get; set; }
      public bool requirefl { get; set; }
      public DateTime? expshipdt { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      [StringValidationAttribute]
      public string commentfl { get; set; }
      public int addonno1 { get; set; }
      public bool addontype1 { get; set; }
      [StringValidationAttribute]
      public string currsymbol { get; set; }
      public bool catalogfl { get; set; }
      public int origseqno { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      public bool manpricefl { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }
      public bool subfl { get; set; }
      public bool superfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Poimportdata BuildPoimportdataFromRow(DataRow row)
      {
         Poimportdata entity = new Poimportdata();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.orderbreak = row.IsNull("orderbreak") ? string.Empty : row.Field<string>("orderbreak");
         entity.worksheetno = row.IsNull("worksheetno") ? 0 : row.Field<int>("worksheetno");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addondesc1 = row.IsNull("addondesc1") ? string.Empty : row.Field<string>("addondesc1");
         entity.apinvno = row.IsNull("apinvno") ? string.Empty : row.Field<string>("apinvno");
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.crreasonty = row.IsNull("crreasonty") ? string.Empty : row.Field<string>("crreasonty");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.processfl = row.Field<bool>("processfl");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.termstype = row.IsNull("termstype") ? string.Empty : row.Field<string>("termstype");
         entity.totamt = row.IsNull("totamt") ? decimal.Zero : row.Field<decimal>("totamt");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.wodiscamt = row.IsNull("wodiscamt") ? decimal.Zero : row.Field<decimal>("wodiscamt");
         entity.wodisctype = row.Field<bool>("wodisctype");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.printfl = row.Field<bool>("printfl");
         entity.requirefl = row.Field<bool>("requirefl");
         entity.expshipdt = row.Field<DateTime?>("expshipdt");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.commentfl = row.IsNull("commentfl") ? string.Empty : row.Field<string>("commentfl");
         entity.addonno1 = row.IsNull("addonno1") ? 0 : row.Field<int>("addonno1");
         entity.addontype1 = row.Field<bool>("addontype1");
         entity.currsymbol = row.IsNull("currsymbol") ? string.Empty : row.Field<string>("currsymbol");
         entity.catalogfl = row.Field<bool>("catalogfl");
         entity.origseqno = row.IsNull("origseqno") ? 0 : row.Field<int>("origseqno");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.manpricefl = row.Field<bool>("manpricefl");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.subfl = row.Field<bool>("subfl");
         entity.superfl = row.Field<bool>("superfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPoimportdata(ref DataRow row, Poimportdata entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("orderbreak", entity.orderbreak);
         row.SetField("worksheetno", entity.worksheetno);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addondesc1", entity.addondesc1);
         row.SetField("apinvno", entity.apinvno);
         row.SetField("buyer", entity.buyer);
         row.SetField("crreasonty", entity.crreasonty);
         row.SetField("duedt", entity.duedt);
         row.SetField("name", entity.name);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("processfl", entity.processfl);
         row.SetField("refer", entity.refer);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("termstype", entity.termstype);
         row.SetField("totamt", entity.totamt);
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("wodiscamt", entity.wodiscamt);
         row.SetField("wodisctype", entity.wodisctype);
         row.SetField("prod", entity.prod);
         row.SetField("descrip", entity.descrip);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("unit", entity.unit);
         row.SetField("price", entity.price);
         row.SetField("netamt", entity.netamt);
         row.SetField("printfl", entity.printfl);
         row.SetField("requirefl", entity.requirefl);
         row.SetField("expshipdt", entity.expshipdt);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodline", entity.prodline);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("addonno1", entity.addonno1);
         row.SetField("addontype1", entity.addontype1);
         row.SetField("currsymbol", entity.currsymbol);
         row.SetField("catalogfl", entity.catalogfl);
         row.SetField("origseqno", entity.origseqno);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("manpricefl", entity.manpricefl);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("subfl", entity.subfl);
         row.SetField("superfl", entity.superfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
