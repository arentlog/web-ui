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

namespace Infor.Sxe.IC.Data.Models.Pdsicicmasterlist
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicicmasterlist.Icicmasterlist")]
   public partial class Icicmasterlist : ModelBase
   {
      [StringValidationAttribute]
      public string transty { get; set; }
      [StringValidationAttribute]
      public string dspltransty { get; set; }
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ordernotesfl { get; set; }
      public int lineno { get; set; }
      public int implylineno { get; set; }
      [StringValidationAttribute]
      public string origprod { get; set; }
      [StringValidationAttribute]
      public string origprodnotesfl { get; set; }
      [StringValidationAttribute]
      public string implyprod { get; set; }
      [StringValidationAttribute]
      public string implyprodnotesfl { get; set; }
      [StringValidationAttribute]
      public string coreprod { get; set; }
      [StringValidationAttribute]
      public string coreprodnotesfl { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      public decimal qty { get; set; }
      public decimal qtyalloc { get; set; }
      public decimal qtywarr { get; set; }
      public int implyqty { get; set; }
      public bool statusfl { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendnotesfl { get; set; }
      public DateTime? coreduedt { get; set; }
      public decimal corevalue { get; set; }
      public decimal corechg { get; set; }
      public decimal price { get; set; }
      public int repairordno { get; set; }
      public int repairordsuf { get; set; }
      public int repairlineno { get; set; }
      public bool pfpfl { get; set; }
      public int intclaimno { get; set; }
      public DateTime? invoicedt { get; set; }
      public bool manadjfl { get; set; }
      public DateTime? mandt { get; set; }
      [StringValidationAttribute]
      public string manoper { get; set; }
      [StringValidationAttribute]
      public string mantm { get; set; }
      public int seqno { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icicmasterlist BuildIcicmasterlistFromRow(DataRow row)
      {
         Icicmasterlist entity = new Icicmasterlist();
         entity.transty = row.IsNull("transty") ? string.Empty : row.Field<string>("transty");
         entity.dspltransty = row.IsNull("dspltransty") ? string.Empty : row.Field<string>("dspltransty");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordernotesfl = row.IsNull("ordernotesfl") ? string.Empty : row.Field<string>("ordernotesfl");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.implylineno = row.IsNull("implylineno") ? 0 : row.Field<int>("implylineno");
         entity.origprod = row.IsNull("origprod") ? string.Empty : row.Field<string>("origprod");
         entity.origprodnotesfl = row.IsNull("origprodnotesfl") ? string.Empty : row.Field<string>("origprodnotesfl");
         entity.implyprod = row.IsNull("implyprod") ? string.Empty : row.Field<string>("implyprod");
         entity.implyprodnotesfl = row.IsNull("implyprodnotesfl") ? string.Empty : row.Field<string>("implyprodnotesfl");
         entity.coreprod = row.IsNull("coreprod") ? string.Empty : row.Field<string>("coreprod");
         entity.coreprodnotesfl = row.IsNull("coreprodnotesfl") ? string.Empty : row.Field<string>("coreprodnotesfl");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.qtyalloc = row.IsNull("qtyalloc") ? decimal.Zero : row.Field<decimal>("qtyalloc");
         entity.qtywarr = row.IsNull("qtywarr") ? decimal.Zero : row.Field<decimal>("qtywarr");
         entity.implyqty = row.IsNull("implyqty") ? 0 : row.Field<int>("implyqty");
         entity.statusfl = row.Field<bool>("statusfl");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnotesfl = row.IsNull("vendnotesfl") ? string.Empty : row.Field<string>("vendnotesfl");
         entity.coreduedt = row.Field<DateTime?>("coreduedt");
         entity.corevalue = row.IsNull("corevalue") ? decimal.Zero : row.Field<decimal>("corevalue");
         entity.corechg = row.IsNull("corechg") ? decimal.Zero : row.Field<decimal>("corechg");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.repairordno = row.IsNull("repairordno") ? 0 : row.Field<int>("repairordno");
         entity.repairordsuf = row.IsNull("repairordsuf") ? 0 : row.Field<int>("repairordsuf");
         entity.repairlineno = row.IsNull("repairlineno") ? 0 : row.Field<int>("repairlineno");
         entity.pfpfl = row.Field<bool>("pfpfl");
         entity.intclaimno = row.IsNull("intclaimno") ? 0 : row.Field<int>("intclaimno");
         entity.invoicedt = row.Field<DateTime?>("invoicedt");
         entity.manadjfl = row.Field<bool>("manadjfl");
         entity.mandt = row.Field<DateTime?>("mandt");
         entity.manoper = row.IsNull("manoper") ? string.Empty : row.Field<string>("manoper");
         entity.mantm = row.IsNull("mantm") ? string.Empty : row.Field<string>("mantm");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcicmasterlist(ref DataRow row, Icicmasterlist entity)
      {
         row.SetField("transty", entity.transty);
         row.SetField("dspltransty", entity.dspltransty);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordernotesfl", entity.ordernotesfl);
         row.SetField("lineno", entity.lineno);
         row.SetField("implylineno", entity.implylineno);
         row.SetField("origprod", entity.origprod);
         row.SetField("origprodnotesfl", entity.origprodnotesfl);
         row.SetField("implyprod", entity.implyprod);
         row.SetField("implyprodnotesfl", entity.implyprodnotesfl);
         row.SetField("coreprod", entity.coreprod);
         row.SetField("coreprodnotesfl", entity.coreprodnotesfl);
         row.SetField("whse", entity.whse);
         row.SetField("qty", entity.qty);
         row.SetField("qtyalloc", entity.qtyalloc);
         row.SetField("qtywarr", entity.qtywarr);
         row.SetField("implyqty", entity.implyqty);
         row.SetField("statusfl", entity.statusfl);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnotesfl", entity.vendnotesfl);
         row.SetField("coreduedt", entity.coreduedt);
         row.SetField("corevalue", entity.corevalue);
         row.SetField("corechg", entity.corechg);
         row.SetField("price", entity.price);
         row.SetField("repairordno", entity.repairordno);
         row.SetField("repairordsuf", entity.repairordsuf);
         row.SetField("repairlineno", entity.repairlineno);
         row.SetField("pfpfl", entity.pfpfl);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("invoicedt", entity.invoicedt);
         row.SetField("manadjfl", entity.manadjfl);
         row.SetField("mandt", entity.mandt);
         row.SetField("manoper", entity.manoper);
         row.SetField("mantm", entity.mantm);
         row.SetField("seqno", entity.seqno);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591