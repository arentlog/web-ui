//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.OE
{
   /// <summary>
   /// OE Batch Line Items
   /// </summary>
   
   public partial class OeelbBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Batch
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string batchnm { get; set; }

      /// <summary>
      /// Seq #
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Ordered
      /// </summary>
      public decimal qtyord { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string proddesc { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal price { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Entered
      /// </summary>
      public DateTime? enterdt { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Requested
      /// </summary>
      public DateTime? reqshipdt { get; set; }

      /// <summary>
      /// Discount
      /// </summary>
      public decimal discamt { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string shipprod { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Line
      /// </summary>
      [StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Usage
      /// </summary>
      public bool usagefl { get; set; }

      /// <summary>
      /// PO/WT/WO #
      /// </summary>
      [StringValidationAttribute]
      public string ordertype { get; set; }

      /// <summary>
      /// B/O
      /// </summary>
      [StringValidationAttribute]
      public string botype { get; set; }

      /// <summary>
      /// Net Amt
      /// </summary>
      public decimal netamt { get; set; }

      /// <summary>
      /// Core Charge
      /// </summary>
      [StringValidationAttribute]
      public string corechgty { get; set; }

      /// <summary>
      /// Spec/NS
      /// </summary>
      [StringValidationAttribute]
      public string specnstype { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// Lead Time
      /// </summary>
      public int leadtm { get; set; }

      /// <summary>
      /// Description 2
      /// </summary>
      [StringValidationAttribute]
      public string proddesc2 { get; set; }

      /// <summary>
      /// Price Type
      /// </summary>
      [StringValidationAttribute]
      public string pricetype { get; set; }

      /// <summary>
      /// Price Over
      /// </summary>
      public bool priceoverfl { get; set; }

      /// <summary>
      /// Cross Ref Type
      /// </summary>
      [StringValidationAttribute]
      public string xrefprodty { get; set; }

      /// <summary>
      /// Requested Prod
      /// </summary>
      [StringValidationAttribute]
      public string reqprod { get; set; }

      /// <summary>
      /// BP Line #
      /// </summary>
      public int bplineno { get; set; }

      /// <summary>
      /// Comment
      /// </summary>
      public bool commentfl { get; set; }

      /// <summary>
      /// Rush
      /// </summary>
      public bool rushfl { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// Charge Qty
      /// </summary>
      public decimal chrgqty { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Return
      /// </summary>
      public bool returnfl { get; set; }

      /// <summary>
      /// Taxable
      /// </summary>
      public bool taxablefl { get; set; }

      /// <summary>
      /// Discount Type
      /// </summary>
      public bool disctype { get; set; }

      /// <summary>
      /// Core Charge
      /// </summary>
      public decimal corecharge { get; set; }

      /// <summary>
      /// Reason
      /// </summary>
      [StringValidationAttribute]
      public string reasunavty { get; set; }

      /// <summary>
      /// DATC
      /// </summary>
      public decimal datccost { get; set; }

      /// <summary>
      /// Stk Qty Ord
      /// </summary>
      public decimal stkqtyord { get; set; }

      /// <summary>
      /// Salesrep In
      /// </summary>
      [StringValidationAttribute]
      public string slsrepin { get; set; }

      /// <summary>
      /// Out
      /// </summary>
      [StringValidationAttribute]
      public string slsrepout { get; set; }

      /// <summary>
      /// Job #
      /// </summary>
      [StringValidationAttribute]
      public string jobno { get; set; }

      /// <summary>
      /// Commission
      /// </summary>
      [StringValidationAttribute]
      public string commtype { get; set; }

      /// <summary>
      /// Print Invoice Price
      /// </summary>
      public bool printpricefl { get; set; }

      /// <summary>
      /// Print Subtotal
      /// </summary>
      public bool subtotalfl { get; set; }

      /// <summary>
      /// Cost Over
      /// </summary>
      public bool costoverfl { get; set; }

      /// <summary>
      /// Credit Memo Reason
      /// </summary>
      [StringValidationAttribute]
      public string crreasonty { get; set; }

      /// <summary>
      /// Group
      /// </summary>
      public int taxgroup { get; set; }

      /// <summary>
      /// Non Tax Reason
      /// </summary>
      [StringValidationAttribute]
      public string nontaxtype { get; set; }

      /// <summary>
      /// Terms Discount %
      /// </summary>
      public decimal termspct { get; set; }

      /// <summary>
      /// G.S.T. Status
      /// </summary>
      public bool gststatus { get; set; }

      /// <summary>
      /// Unavailable
      /// </summary>
      public decimal qtyunavail { get; set; }

      /// <summary>
      /// Restock Charge
      /// </summary>
      public decimal restockamt { get; set; }

      /// <summary>
      /// Promise Date
      /// </summary>
      public DateTime? promisedt { get; set; }

      /// <summary>
      /// JIT Picked
      /// </summary>
      public bool jitpickfl { get; set; }

      /// <summary>
      /// Added From Catalog
      /// </summary>
      public bool cataddfl { get; set; }

      /// <summary>
      /// Ship From
      /// </summary>
      public int shipfmno { get; set; }

      /// <summary>
      /// ARP Line
      /// </summary>
      [StringValidationAttribute]
      public string arpprodline { get; set; }

      /// <summary>
      /// ARP Vendor #
      /// </summary>
      public decimal arpvendno { get; set; }

      /// <summary>
      /// Spec Rec Link
      /// </summary>
      public int icspecrecno { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Restock Tax Group
      /// </summary>
      public int restktaxgrp { get; set; }

      /// <summary>
      /// User 10
      /// </summary>
      [StringValidationAttribute]
      public string user10 { get; set; }

      /// <summary>
      /// User 11
      /// </summary>
      [StringValidationAttribute]
      public string user11 { get; set; }

      /// <summary>
      /// User 12
      /// </summary>
      [StringValidationAttribute]
      public string user12 { get; set; }

      /// <summary>
      /// User 13
      /// </summary>
      [StringValidationAttribute]
      public string user13 { get; set; }

      /// <summary>
      /// User 14
      /// </summary>
      [StringValidationAttribute]
      public string user14 { get; set; }

      /// <summary>
      /// User 15
      /// </summary>
      [StringValidationAttribute]
      public string user15 { get; set; }

      /// <summary>
      /// User 16
      /// </summary>
      [StringValidationAttribute]
      public string user16 { get; set; }

      /// <summary>
      /// User 17
      /// </summary>
      [StringValidationAttribute]
      public string user17 { get; set; }

      /// <summary>
      /// User 18
      /// </summary>
      [StringValidationAttribute]
      public string user18 { get; set; }

      /// <summary>
      /// User 19
      /// </summary>
      [StringValidationAttribute]
      public string user19 { get; set; }

      /// <summary>
      /// User 20
      /// </summary>
      [StringValidationAttribute]
      public string user20 { get; set; }

      /// <summary>
      /// User 21
      /// </summary>
      [StringValidationAttribute]
      public string user21 { get; set; }

      /// <summary>
      /// User 22
      /// </summary>
      [StringValidationAttribute]
      public string user22 { get; set; }

      /// <summary>
      /// User 23
      /// </summary>
      [StringValidationAttribute]
      public string user23 { get; set; }

      /// <summary>
      /// User 24
      /// </summary>
      [StringValidationAttribute]
      public string user24 { get; set; }

      /// <summary>
      /// ShipVia
      /// </summary>
      [StringValidationAttribute]
      public string quoteshipviaty { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOeelbBaseFromRow<T>(DataRow row) where T:OeelbBase, new()
      {
         T entity = new T();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.discamt = row.IsNull("discamt") ? decimal.Zero : row.Field<decimal>("discamt");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.usagefl = row.Field<bool>("usagefl");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.corechgty = row.IsNull("corechgty") ? string.Empty : row.Field<string>("corechgty");
         entity.specnstype = row.IsNull("specnstype") ? string.Empty : row.Field<string>("specnstype");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.priceoverfl = row.Field<bool>("priceoverfl");
         entity.xrefprodty = row.IsNull("xrefprodty") ? string.Empty : row.Field<string>("xrefprodty");
         entity.reqprod = row.IsNull("reqprod") ? string.Empty : row.Field<string>("reqprod");
         entity.bplineno = row.IsNull("bplineno") ? 0 : row.Field<int>("bplineno");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.chrgqty = row.IsNull("chrgqty") ? decimal.Zero : row.Field<decimal>("chrgqty");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.taxablefl = row.Field<bool>("taxablefl");
         entity.disctype = row.Field<bool>("disctype");
         entity.corecharge = row.IsNull("corecharge") ? decimal.Zero : row.Field<decimal>("corecharge");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.datccost = row.IsNull("datccost") ? decimal.Zero : row.Field<decimal>("datccost");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.jobno = row.IsNull("jobno") ? string.Empty : row.Field<string>("jobno");
         entity.commtype = row.IsNull("commtype") ? string.Empty : row.Field<string>("commtype");
         entity.printpricefl = row.Field<bool>("printpricefl");
         entity.subtotalfl = row.Field<bool>("subtotalfl");
         entity.costoverfl = row.Field<bool>("costoverfl");
         entity.crreasonty = row.IsNull("crreasonty") ? string.Empty : row.Field<string>("crreasonty");
         entity.taxgroup = row.IsNull("taxgroup") ? 0 : row.Field<int>("taxgroup");
         entity.nontaxtype = row.IsNull("nontaxtype") ? string.Empty : row.Field<string>("nontaxtype");
         entity.termspct = row.IsNull("termspct") ? decimal.Zero : row.Field<decimal>("termspct");
         entity.gststatus = row.Field<bool>("gststatus");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.batchnm = row.IsNull("batchnm") ? string.Empty : row.Field<string>("batchnm");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.restockamt = row.IsNull("restockamt") ? decimal.Zero : row.Field<decimal>("restockamt");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.jitpickfl = row.Field<bool>("jitpickfl");
         entity.cataddfl = row.Field<bool>("cataddfl");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.arpprodline = row.IsNull("arpprodline") ? string.Empty : row.Field<string>("arpprodline");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.restktaxgrp = row.IsNull("restktaxgrp") ? 0 : row.Field<int>("restktaxgrp");
         entity.user10 = row.IsNull("user10") ? string.Empty : row.Field<string>("user10");
         entity.user11 = row.IsNull("user11") ? string.Empty : row.Field<string>("user11");
         entity.user12 = row.IsNull("user12") ? string.Empty : row.Field<string>("user12");
         entity.user13 = row.IsNull("user13") ? string.Empty : row.Field<string>("user13");
         entity.user14 = row.IsNull("user14") ? string.Empty : row.Field<string>("user14");
         entity.user15 = row.IsNull("user15") ? string.Empty : row.Field<string>("user15");
         entity.user16 = row.IsNull("user16") ? string.Empty : row.Field<string>("user16");
         entity.user17 = row.IsNull("user17") ? string.Empty : row.Field<string>("user17");
         entity.user18 = row.IsNull("user18") ? string.Empty : row.Field<string>("user18");
         entity.user19 = row.IsNull("user19") ? string.Empty : row.Field<string>("user19");
         entity.user20 = row.IsNull("user20") ? string.Empty : row.Field<string>("user20");
         entity.user21 = row.IsNull("user21") ? string.Empty : row.Field<string>("user21");
         entity.user22 = row.IsNull("user22") ? string.Empty : row.Field<string>("user22");
         entity.user23 = row.IsNull("user23") ? string.Empty : row.Field<string>("user23");
         entity.user24 = row.IsNull("user24") ? string.Empty : row.Field<string>("user24");
         entity.quoteshipviaty = row.IsNull("quoteshipviaty") ? string.Empty : row.Field<string>("quoteshipviaty");
         entity.rowID = row.Field<byte[]>("oeelbRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeelbBase(ref DataRow row, OeelbBase entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("cono", entity.cono);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("unit", entity.unit);
         row.SetField("price", entity.price);
         row.SetField("transdt", entity.transdt);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("operinit", entity.operinit);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("discamt", entity.discamt);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("transtm", entity.transtm);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodline", entity.prodline);
         row.SetField("vendno", entity.vendno);
         row.SetField("usagefl", entity.usagefl);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("botype", entity.botype);
         row.SetField("netamt", entity.netamt);
         row.SetField("corechgty", entity.corechgty);
         row.SetField("specnstype", entity.specnstype);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("leadtm", entity.leadtm);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("priceoverfl", entity.priceoverfl);
         row.SetField("xrefprodty", entity.xrefprodty);
         row.SetField("reqprod", entity.reqprod);
         row.SetField("bplineno", entity.bplineno);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("chrgqty", entity.chrgqty);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("taxablefl", entity.taxablefl);
         row.SetField("disctype", entity.disctype);
         row.SetField("corecharge", entity.corecharge);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("datccost", entity.datccost);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("jobno", entity.jobno);
         row.SetField("commtype", entity.commtype);
         row.SetField("printpricefl", entity.printpricefl);
         row.SetField("subtotalfl", entity.subtotalfl);
         row.SetField("costoverfl", entity.costoverfl);
         row.SetField("crreasonty", entity.crreasonty);
         row.SetField("taxgroup", entity.taxgroup);
         row.SetField("nontaxtype", entity.nontaxtype);
         row.SetField("termspct", entity.termspct);
         row.SetField("gststatus", entity.gststatus);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("batchnm", entity.batchnm);
         row.SetField("seqno", entity.seqno);
         row.SetField("restockamt", entity.restockamt);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("jitpickfl", entity.jitpickfl);
         row.SetField("cataddfl", entity.cataddfl);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("arpprodline", entity.arpprodline);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("transproc", entity.transproc);
         row.SetField("restktaxgrp", entity.restktaxgrp);
         row.SetField("user10", entity.user10);
         row.SetField("user11", entity.user11);
         row.SetField("user12", entity.user12);
         row.SetField("user13", entity.user13);
         row.SetField("user14", entity.user14);
         row.SetField("user15", entity.user15);
         row.SetField("user16", entity.user16);
         row.SetField("user17", entity.user17);
         row.SetField("user18", entity.user18);
         row.SetField("user19", entity.user19);
         row.SetField("user20", entity.user20);
         row.SetField("user21", entity.user21);
         row.SetField("user22", entity.user22);
         row.SetField("user23", entity.user23);
         row.SetField("user24", entity.user24);
         row.SetField("quoteshipviaty", entity.quoteshipviaty);
         row.SetField("oeelbRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OeelbBase entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("cono", entity.cono);
         row.SetField("batchnm", entity.batchnm);
         row.SetField("seqno", entity.seqno);
         row.SetField("oeelbRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	