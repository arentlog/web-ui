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
   /// Order Entry Tally Kit Components
   /// </summary>
   
   public partial class OeelmBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Order Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string ordertype { get; set; }

      /// <summary>
      /// Order #
      /// </summary>
      [Key,Order]
      public int orderno { get; set; }

      /// <summary>
      /// Order Suffix
      /// </summary>
      [Key,Order]
      public int ordersuf { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Seq#
      /// </summary>
      [Key,Order]
      public int seqno { get; set; }

      /// <summary>
      /// Bundle ID
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string bundleid { get; set; }

      /// <summary>
      /// Comp Seq#
      /// </summary>
      [Key,Order]
      public int compseqno { get; set; }

      /// <summary>
      /// Product #
      /// </summary>
      [StringValidationAttribute]
      public string shipprod { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// Ordered
      /// </summary>
      public decimal qtyord { get; set; }

      /// <summary>
      /// PO Mix Percent
      /// </summary>
      public int pomixpct { get; set; }

      /// <summary>
      /// OE Mix Percent
      /// </summary>
      public int oemixpct { get; set; }

      /// <summary>
      /// Qty Ship
      /// </summary>
      public decimal qtyship { get; set; }

      /// <summary>
      /// Stk Qty Ord
      /// </summary>
      public decimal stkqtyord { get; set; }

      /// <summary>
      /// Ship Qty
      /// </summary>
      public decimal stkqtyship { get; set; }

      /// <summary>
      /// Net Ord
      /// </summary>
      public decimal netord { get; set; }

      /// <summary>
      /// Net Amt
      /// </summary>
      public decimal netamt { get; set; }

      /// <summary>
      /// Net Cost Ord
      /// </summary>
      public decimal netcostord { get; set; }

      /// <summary>
      /// Net Cost Amt
      /// </summary>
      public decimal netcostamt { get; set; }

      /// <summary>
      /// Length
      /// </summary>
      public int length { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      public decimal custno { get; set; }

      /// <summary>
      /// Ship To
      /// </summary>
      [StringValidationAttribute]
      public string shipto { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [StringValidationAttribute]
      public string transtype { get; set; }

      /// <summary>
      /// Default Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Invoice Cost
      /// </summary>
      public decimal invcost { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal price { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Comm Cost
      /// </summary>
      public decimal commcost { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public bool pricefl { get; set; }

      /// <summary>
      /// GL Cost
      /// </summary>
      public decimal glcost { get; set; }

      /// <summary>
      /// Requested Prod
      /// </summary>
      [StringValidationAttribute]
      public string reqprod { get; set; }

      /// <summary>
      /// Conversion Factor
      /// </summary>
      public decimal conv { get; set; }

      /// <summary>
      /// PD Rec #
      /// </summary>
      public int pdrecno { get; set; }

      /// <summary>
      /// Spec Rec Link
      /// </summary>
      public int icspecrecno { get; set; }

      /// <summary>
      /// Prev Product
      /// </summary>
      [StringValidationAttribute]
      public string prevprod { get; set; }

      /// <summary>
      /// Prev Qty
      /// </summary>
      public decimal prevqtyship { get; set; }

      /// <summary>
      /// Prev Qty Shp
      /// </summary>
      public decimal prevqtyshp { get; set; }

      /// <summary>
      /// Prev Qty Ord
      /// </summary>
      public decimal prevqtyord { get; set; }

      /// <summary>
      /// Prev Unit
      /// </summary>
      [StringValidationAttribute]
      public string prevunit { get; set; }

      /// <summary>
      /// Prev Conv
      /// </summary>
      public decimal prevconv { get; set; }

      /// <summary>
      /// Ship Qty Over
      /// </summary>
      public bool shpqtyoverfl { get; set; }

      /// <summary>
      /// Qty Costed
      /// </summary>
      public decimal qtycosted { get; set; }

      /// <summary>
      /// Stk Qty Costed
      /// </summary>
      public decimal stkqtycosted { get; set; }

      /// <summary>
      /// Net Costed
      /// </summary>
      public decimal netcostedamt { get; set; }

      /// <summary>
      /// Addon Amt
      /// </summary>
      public decimal compaddonamt { get; set; }

      /// <summary>
      /// Discount Amt
      /// </summary>
      public decimal compdiscount { get; set; }

      /// <summary>
      /// Adj Factor
      /// </summary>
      public decimal adjfactor { get; set; }

      /// <summary>
      /// Adj Cost
      /// </summary>
      public decimal adjcost { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Delay Reservation
      /// </summary>
      public bool delayresrvfl { get; set; }

      /// <summary>
      /// Qty Bundle
      /// </summary>
      public decimal qtybundle { get; set; }

      /// <summary>
      /// Prev Qty Bundle
      /// </summary>
      public decimal qtyprevbundle { get; set; }

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
      /// GL Cost Rcv
      /// </summary>
      public decimal glcostrcv { get; set; }

      /// <summary>
      /// Addon amt
      /// </summary>
      public decimal addonamt1 { get; set; }
      public decimal addonamt2 { get; set; }
      public decimal addonamt3 { get; set; }
      public decimal addonamt4 { get; set; }

      /// <summary>
      /// Length
      /// </summary>
      public decimal dlength { get; set; }

      /// <summary>
      /// Country of Origin
      /// </summary>
      [StringValidationAttribute]
      public string countryoforigin { get; set; }

      /// <summary>
      /// HS Code
      /// </summary>
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildOeelmBaseFromRow<T>(DataRow row) where T:OeelmBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.bundleid = row.IsNull("bundleid") ? string.Empty : row.Field<string>("bundleid");
         entity.compseqno = row.IsNull("compseqno") ? 0 : row.Field<int>("compseqno");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.pomixpct = row.IsNull("pomixpct") ? 0 : row.Field<int>("pomixpct");
         entity.oemixpct = row.IsNull("oemixpct") ? 0 : row.Field<int>("oemixpct");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.netord = row.IsNull("netord") ? decimal.Zero : row.Field<decimal>("netord");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.netcostord = row.IsNull("netcostord") ? decimal.Zero : row.Field<decimal>("netcostord");
         entity.netcostamt = row.IsNull("netcostamt") ? decimal.Zero : row.Field<decimal>("netcostamt");
         entity.length = row.IsNull("length") ? 0 : row.Field<int>("length");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.invcost = row.IsNull("invcost") ? decimal.Zero : row.Field<decimal>("invcost");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.commcost = row.IsNull("commcost") ? decimal.Zero : row.Field<decimal>("commcost");
         entity.pricefl = row.Field<bool>("pricefl");
         entity.glcost = row.IsNull("glcost") ? decimal.Zero : row.Field<decimal>("glcost");
         entity.reqprod = row.IsNull("reqprod") ? string.Empty : row.Field<string>("reqprod");
         entity.conv = row.IsNull("conv") ? decimal.Zero : row.Field<decimal>("conv");
         entity.pdrecno = row.IsNull("pdrecno") ? 0 : row.Field<int>("pdrecno");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.prevprod = row.IsNull("prevprod") ? string.Empty : row.Field<string>("prevprod");
         entity.prevqtyship = row.IsNull("prevqtyship") ? decimal.Zero : row.Field<decimal>("prevqtyship");
         entity.prevqtyshp = row.IsNull("prevqtyshp") ? decimal.Zero : row.Field<decimal>("prevqtyshp");
         entity.prevqtyord = row.IsNull("prevqtyord") ? decimal.Zero : row.Field<decimal>("prevqtyord");
         entity.prevunit = row.IsNull("prevunit") ? string.Empty : row.Field<string>("prevunit");
         entity.prevconv = row.IsNull("prevconv") ? decimal.Zero : row.Field<decimal>("prevconv");
         entity.shpqtyoverfl = row.Field<bool>("shpqtyoverfl");
         entity.qtycosted = row.IsNull("qtycosted") ? decimal.Zero : row.Field<decimal>("qtycosted");
         entity.stkqtycosted = row.IsNull("stkqtycosted") ? decimal.Zero : row.Field<decimal>("stkqtycosted");
         entity.netcostedamt = row.IsNull("netcostedamt") ? decimal.Zero : row.Field<decimal>("netcostedamt");
         entity.compaddonamt = row.IsNull("compaddonamt") ? decimal.Zero : row.Field<decimal>("compaddonamt");
         entity.compdiscount = row.IsNull("compdiscount") ? decimal.Zero : row.Field<decimal>("compdiscount");
         entity.adjfactor = row.IsNull("adjfactor") ? decimal.Zero : row.Field<decimal>("adjfactor");
         entity.adjcost = row.IsNull("adjcost") ? decimal.Zero : row.Field<decimal>("adjcost");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.delayresrvfl = row.Field<bool>("delayresrvfl");
         entity.qtybundle = row.IsNull("qtybundle") ? decimal.Zero : row.Field<decimal>("qtybundle");
         entity.qtyprevbundle = row.IsNull("qtyprevbundle") ? decimal.Zero : row.Field<decimal>("qtyprevbundle");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.glcostrcv = row.IsNull("glcostrcv") ? decimal.Zero : row.Field<decimal>("glcostrcv");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addonamt3 = row.IsNull("addonamt3") ? decimal.Zero : row.Field<decimal>("addonamt3");
         entity.addonamt4 = row.IsNull("addonamt4") ? decimal.Zero : row.Field<decimal>("addonamt4");
         entity.dlength = row.IsNull("dlength") ? decimal.Zero : row.Field<decimal>("dlength");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.rowID = row.Field<byte[]>("oeelmRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeelmBase(ref DataRow row, OeelmBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("compseqno", entity.compseqno);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("unit", entity.unit);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("pomixpct", entity.pomixpct);
         row.SetField("oemixpct", entity.oemixpct);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("netord", entity.netord);
         row.SetField("netamt", entity.netamt);
         row.SetField("netcostord", entity.netcostord);
         row.SetField("netcostamt", entity.netcostamt);
         row.SetField("length", entity.length);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("transtype", entity.transtype);
         row.SetField("whse", entity.whse);
         row.SetField("invcost", entity.invcost);
         row.SetField("price", entity.price);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("statustype", entity.statustype);
         row.SetField("commcost", entity.commcost);
         row.SetField("pricefl", entity.pricefl);
         row.SetField("glcost", entity.glcost);
         row.SetField("reqprod", entity.reqprod);
         row.SetField("conv", entity.conv);
         row.SetField("pdrecno", entity.pdrecno);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("prevprod", entity.prevprod);
         row.SetField("prevqtyship", entity.prevqtyship);
         row.SetField("prevqtyshp", entity.prevqtyshp);
         row.SetField("prevqtyord", entity.prevqtyord);
         row.SetField("prevunit", entity.prevunit);
         row.SetField("prevconv", entity.prevconv);
         row.SetField("shpqtyoverfl", entity.shpqtyoverfl);
         row.SetField("qtycosted", entity.qtycosted);
         row.SetField("stkqtycosted", entity.stkqtycosted);
         row.SetField("netcostedamt", entity.netcostedamt);
         row.SetField("compaddonamt", entity.compaddonamt);
         row.SetField("compdiscount", entity.compdiscount);
         row.SetField("adjfactor", entity.adjfactor);
         row.SetField("adjcost", entity.adjcost);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("transproc", entity.transproc);
         row.SetField("delayresrvfl", entity.delayresrvfl);
         row.SetField("qtybundle", entity.qtybundle);
         row.SetField("qtyprevbundle", entity.qtyprevbundle);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("glcostrcv", entity.glcostrcv);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addonamt3", entity.addonamt3);
         row.SetField("addonamt4", entity.addonamt4);
         row.SetField("dlength", entity.dlength);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("oeelmRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, OeelmBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("bundleid", entity.bundleid);
         row.SetField("compseqno", entity.compseqno);
         row.SetField("oeelmRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	