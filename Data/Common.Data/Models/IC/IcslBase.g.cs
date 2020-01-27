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
       
namespace Infor.Sxe.Common.Data.Models.IC
{
   /// <summary>
   /// IC Prod Line Master
   /// </summary>
   [EntityType("IC Prod Line Master","TBD","")]
   public partial class IcslBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [BusContext(BusPart.AcctEntity),Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      [Key,Order]
      public decimal vendno { get; set; }

      /// <summary>
      /// Product Line
      /// </summary>
      [BusContext(BusPart.Name),Key,Order,StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Default Whse
      /// </summary>
      [BusContext(BusPart.Location),Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [BusContext(BusPart.Descr),StringValidationAttribute]
      public string descrip { get; set; }

      /// <summary>
      /// From
      /// </summary>
      public int shipfmno { get; set; }

      /// <summary>
      /// Minimum Buy Amount
      /// </summary>
      public decimal minbuy { get; set; }

      /// <summary>
      /// Minimum Buy Type
      /// </summary>
      [StringValidationAttribute]
      public string minbuytype { get; set; }

      /// <summary>
      /// Target Type
      /// </summary>
      [StringValidationAttribute]
      public string tarbuytype { get; set; }

      /// <summary>
      /// Target Buy Level
      /// </summary>
      public int tarlevel { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

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
      /// Discount
      /// </summary>
      public decimal discmult1 { get; set; }
      public decimal discmult2 { get; set; }
      public decimal discmult3 { get; set; }
      public decimal discmult4 { get; set; }
      public decimal discmult5 { get; set; }
      public decimal discmult6 { get; set; }
      public decimal discmult7 { get; set; }
      public decimal discmult8 { get; set; }
      public decimal discmult9 { get; set; }

      /// <summary>
      /// Buyer
      /// </summary>
      [StringValidationAttribute]
      public string buyer { get; set; }

      /// <summary>
      /// Review Cycle Days
      /// </summary>
      public int revcyclin { get; set; }

      /// <summary>
      /// Review Days Out of Season
      /// </summary>
      public int revcyclout { get; set; }

      /// <summary>
      /// Frozen Review
      /// </summary>
      public bool frozenfl { get; set; }

      /// <summary>
      /// Last Review
      /// </summary>
      public DateTime? lastpowtdt { get; set; }

      /// <summary>
      /// Remaining Quantity on PO
      /// </summary>
      public decimal rcvtolpct { get; set; }

      /// <summary>
      /// Target Buy
      /// </summary>
      public decimal tarbuyamt1 { get; set; }
      public decimal tarbuyamt2 { get; set; }
      public decimal tarbuyamt3 { get; set; }
      public decimal tarbuyamt4 { get; set; }
      public decimal tarbuyamt5 { get; set; }
      public decimal tarbuyamt6 { get; set; }
      public decimal tarbuyamt7 { get; set; }
      public decimal tarbuyamt8 { get; set; }
      public decimal tarbuyamt9 { get; set; }

      /// <summary>
      /// Season Begin
      /// </summary>
      public int seasbegmm { get; set; }

      /// <summary>
      /// Season End
      /// </summary>
      public int seasendmm { get; set; }

      /// <summary>
      /// Product Class
      /// </summary>
      public int @class { get; set; }

      /// <summary>
      /// Frozen Months
      /// </summary>
      public int frozenmos { get; set; }

      /// <summary>
      /// Frozen Reason
      /// </summary>
      [StringValidationAttribute]
      public string frozentype { get; set; }

      /// <summary>
      /// Review Days
      /// </summary>
      public int nodaysseas { get; set; }

      /// <summary>
      /// PO Replenish Cost
      /// </summary>
      public decimal icrcost { get; set; }

      /// <summary>
      /// Order Method
      /// </summary>
      [StringValidationAttribute]
      public string ordcalcty { get; set; }

      /// <summary>
      /// Trend Percentage
      /// </summary>
      public decimal trendpct { get; set; }

      /// <summary>
      /// Order Point/Min
      /// </summary>
      public decimal orderpt { get; set; }

      /// <summary>
      /// Order Qty
      /// </summary>
      public decimal ordqtyin { get; set; }

      /// <summary>
      /// Order Qty
      /// </summary>
      public decimal ordqtyout { get; set; }

      /// <summary>
      /// Override Reason
      /// </summary>
      [StringValidationAttribute]
      public string overreasin { get; set; }

      /// <summary>
      /// Freight Consolidation Code
      /// </summary>
      [StringValidationAttribute]
      public string frtconsldtcd { get; set; }

      /// <summary>
      /// Override Reason
      /// </summary>
      [StringValidationAttribute]
      public string overreasout { get; set; }

      /// <summary>
      /// Transfer Unit
      /// </summary>
      [StringValidationAttribute]
      public string unitwt { get; set; }

      /// <summary>
      /// Safety Allowance
      /// </summary>
      public decimal safeallamt { get; set; }

      /// <summary>
      /// Update Source
      /// </summary>
      [StringValidationAttribute]
      public string updtsrc { get; set; }

      /// <summary>
      /// Transfer Recommended Ord Qty
      /// </summary>
      public bool troqfl { get; set; }

      /// <summary>
      /// Vendor Min Weeks
      /// </summary>
      public int vminwks { get; set; }

      /// <summary>
      /// Buying Unit
      /// </summary>
      [StringValidationAttribute]
      public string unitbuy { get; set; }

      /// <summary>
      /// Vendor Max Weeks
      /// </summary>
      public int vmaxwks { get; set; }

      /// <summary>
      /// Standard Pack
      /// </summary>
      [StringValidationAttribute]
      public string unitstnd { get; set; }

      /// <summary>
      /// Line Point/Max
      /// </summary>
      public decimal linept { get; set; }

      /// <summary>
      /// Avg Lead Time
      /// </summary>
      public int leadtmavg { get; set; }

      /// <summary>
      /// Usage Months
      /// </summary>
      public int usgmths { get; set; }

      /// <summary>
      /// Vendor Recommended Ord Qty
      /// </summary>
      public bool vroqfl { get; set; }

      /// <summary>
      /// Safety Allowance
      /// </summary>
      public decimal safeallpct { get; set; }

      /// <summary>
      /// Auto Merge Flag
      /// </summary>
      public bool automrgfl { get; set; }

      /// <summary>
      /// Terms Disc
      /// </summary>
      public bool termsdiscfl { get; set; }

      /// <summary>
      /// User 1
      /// </summary>
      [StringValidationAttribute]
      public string user1 { get; set; }

      /// <summary>
      /// Terms Discount %
      /// </summary>
      public decimal termspct { get; set; }

      /// <summary>
      /// User 2
      /// </summary>
      [StringValidationAttribute]
      public string user2 { get; set; }

      /// <summary>
      /// Length of Warranty
      /// </summary>
      public int warrlength { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// Warranty Period
      /// </summary>
      [StringValidationAttribute]
      public string warrtype { get; set; }

      /// <summary>
      /// User 4
      /// </summary>
      [StringValidationAttribute]
      public string user4 { get; set; }

      /// <summary>
      /// Authorized Replenishment Path
      /// </summary>
      [StringValidationAttribute]
      public string arptype { get; set; }

      /// <summary>
      /// User 5
      /// </summary>
      [StringValidationAttribute]
      public string user5 { get; set; }

      /// <summary>
      /// Push
      /// </summary>
      public bool arppushfl { get; set; }

      /// <summary>
      /// User 6
      /// </summary>
      public decimal? user6 { get; set; }

      /// <summary>
      /// Non Tax Reason
      /// </summary>
      [StringValidationAttribute]
      public string nontaxtype { get; set; }

      /// <summary>
      /// User 7
      /// </summary>
      public decimal? user7 { get; set; }

      /// <summary>
      /// HS Code
      /// </summary>
      [StringValidationAttribute]
      public string tariffcd { get; set; }

      /// <summary>
      /// User 8
      /// </summary>
      public DateTime? user8 { get; set; }

      /// <summary>
      /// Taxable Type
      /// </summary>
      [StringValidationAttribute]
      public string taxablety { get; set; }

      /// <summary>
      /// User 9
      /// </summary>
      public DateTime? user9 { get; set; }

      /// <summary>
      /// Tax Group
      /// </summary>
      public int taxgroup { get; set; }

      /// <summary>
      /// Tax Exempt Type
      /// </summary>
      [StringValidationAttribute]
      public string taxtype { get; set; }

      /// <summary>
      /// ARP Whse
      /// </summary>
      [StringValidationAttribute]
      public string arpwhse { get; set; }

      /// <summary>
      /// Consolidate Lines
      /// </summary>
      public bool conslinefl { get; set; }

      /// <summary>
      /// Consolidate Warehouses
      /// </summary>
      public bool conswhsefl { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Safety Type
      /// </summary>
      [StringValidationAttribute]
      public string safeallty { get; set; }

      /// <summary>
      /// Vendor Core Charge
      /// </summary>
      public bool vendcorechgfl { get; set; }

      /// <summary>
      /// Zero Cost Core
      /// </summary>
      public bool zerocstcorefl { get; set; }

      /// <summary>
      /// Zero Cost Core Div#
      /// </summary>
      public int zerocstgldivno { get; set; }

      /// <summary>
      /// Zero Cost Core Dept#
      /// </summary>
      public int zerocstgldeptno { get; set; }

      /// <summary>
      /// Zero Cost Core Acct#
      /// </summary>
      public int zerocstglacctno { get; set; }

      /// <summary>
      /// Zero Cost Core Sub#
      /// </summary>
      public int zerocstglsubno { get; set; }

      /// <summary>
      /// eSource
      /// </summary>
      [StringValidationAttribute]
      public string esourcety { get; set; }

      /// <summary>
      /// Spec/NS
      /// </summary>
      [StringValidationAttribute]
      public string esspecnsty { get; set; }

      /// <summary>
      /// RRAR < 1/2 Unit Rounding
      /// </summary>
      [StringValidationAttribute]
      public string rrarunitrnd { get; set; }

      /// <summary>
      /// PO Carry Cost
      /// </summary>
      public decimal ickcost { get; set; }

      /// <summary>
      /// WT Replenish Cost
      /// </summary>
      public decimal wtrcost { get; set; }

      /// <summary>
      /// WT Carry Cost
      /// </summary>
      public decimal wtkcost { get; set; }

      /// <summary>
      /// Roll OAN Usage
      /// </summary>
      public bool rolloanusagefl { get; set; }

      /// <summary>
      /// Transfer Min Weeks
      /// </summary>
      public int tminwks { get; set; }

      /// <summary>
      /// Transfer Max Weeks
      /// </summary>
      public int tmaxwks { get; set; }

      /// <summary>
      /// Transfer Review Days
      /// </summary>
      public int wtrevcycle { get; set; }

      /// <summary>
      /// Usage Rate
      /// </summary>
      public decimal usagerate { get; set; }

      /// <summary>
      /// Order Below LP
      /// </summary>
      public bool belowlpfl { get; set; }

      /// <summary>
      /// Freight Expected
      /// </summary>
      [StringValidationAttribute]
      public string freightexpectedty { get; set; }

      /// <summary>
      /// Surplus Type
      /// </summary>
      [StringValidationAttribute]
      public string surplusty { get; set; }

      /// <summary>
      /// Country of Origin
      /// </summary>
      [StringValidationAttribute]
      public string countryoforigin { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// Usage Calculation
      /// </summary>
      [StringValidationAttribute]
      public string usagectrl { get; set; }

      /// <summary>
      /// Product Preference
      /// </summary>
      [StringValidationAttribute]
      public string prodpreference { get; set; }

      /// <summary>
      /// transdttmz
      /// </summary>
      public DateTime? transdttmz { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildIcslBaseFromRow<T>(DataRow row) where T:IcslBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.minbuy = row.IsNull("minbuy") ? decimal.Zero : row.Field<decimal>("minbuy");
         entity.minbuytype = row.IsNull("minbuytype") ? string.Empty : row.Field<string>("minbuytype");
         entity.tarbuytype = row.IsNull("tarbuytype") ? string.Empty : row.Field<string>("tarbuytype");
         entity.tarlevel = row.IsNull("tarlevel") ? 0 : row.Field<int>("tarlevel");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.discmult1 = row.IsNull("discmult1") ? decimal.Zero : row.Field<decimal>("discmult1");
         entity.discmult2 = row.IsNull("discmult2") ? decimal.Zero : row.Field<decimal>("discmult2");
         entity.discmult3 = row.IsNull("discmult3") ? decimal.Zero : row.Field<decimal>("discmult3");
         entity.discmult4 = row.IsNull("discmult4") ? decimal.Zero : row.Field<decimal>("discmult4");
         entity.discmult5 = row.IsNull("discmult5") ? decimal.Zero : row.Field<decimal>("discmult5");
         entity.discmult6 = row.IsNull("discmult6") ? decimal.Zero : row.Field<decimal>("discmult6");
         entity.discmult7 = row.IsNull("discmult7") ? decimal.Zero : row.Field<decimal>("discmult7");
         entity.discmult8 = row.IsNull("discmult8") ? decimal.Zero : row.Field<decimal>("discmult8");
         entity.discmult9 = row.IsNull("discmult9") ? decimal.Zero : row.Field<decimal>("discmult9");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.revcyclin = row.IsNull("revcyclin") ? 0 : row.Field<int>("revcyclin");
         entity.revcyclout = row.IsNull("revcyclout") ? 0 : row.Field<int>("revcyclout");
         entity.frozenfl = row.Field<bool>("frozenfl");
         entity.lastpowtdt = row.Field<DateTime?>("lastpowtdt");
         entity.rcvtolpct = row.IsNull("rcvtolpct") ? decimal.Zero : row.Field<decimal>("rcvtolpct");
         entity.tarbuyamt1 = row.IsNull("tarbuyamt1") ? decimal.Zero : row.Field<decimal>("tarbuyamt1");
         entity.tarbuyamt2 = row.IsNull("tarbuyamt2") ? decimal.Zero : row.Field<decimal>("tarbuyamt2");
         entity.tarbuyamt3 = row.IsNull("tarbuyamt3") ? decimal.Zero : row.Field<decimal>("tarbuyamt3");
         entity.tarbuyamt4 = row.IsNull("tarbuyamt4") ? decimal.Zero : row.Field<decimal>("tarbuyamt4");
         entity.tarbuyamt5 = row.IsNull("tarbuyamt5") ? decimal.Zero : row.Field<decimal>("tarbuyamt5");
         entity.tarbuyamt6 = row.IsNull("tarbuyamt6") ? decimal.Zero : row.Field<decimal>("tarbuyamt6");
         entity.tarbuyamt7 = row.IsNull("tarbuyamt7") ? decimal.Zero : row.Field<decimal>("tarbuyamt7");
         entity.tarbuyamt8 = row.IsNull("tarbuyamt8") ? decimal.Zero : row.Field<decimal>("tarbuyamt8");
         entity.tarbuyamt9 = row.IsNull("tarbuyamt9") ? decimal.Zero : row.Field<decimal>("tarbuyamt9");
         entity.seasbegmm = row.IsNull("seasbegmm") ? 0 : row.Field<int>("seasbegmm");
         entity.seasendmm = row.IsNull("seasendmm") ? 0 : row.Field<int>("seasendmm");
         entity.@class = row.IsNull("class") ? 0 : row.Field<int>("class");
         entity.frozenmos = row.IsNull("frozenmos") ? 0 : row.Field<int>("frozenmos");
         entity.frozentype = row.IsNull("frozentype") ? string.Empty : row.Field<string>("frozentype");
         entity.nodaysseas = row.IsNull("nodaysseas") ? 0 : row.Field<int>("nodaysseas");
         entity.icrcost = row.IsNull("icrcost") ? decimal.Zero : row.Field<decimal>("icrcost");
         entity.ordcalcty = row.IsNull("ordcalcty") ? string.Empty : row.Field<string>("ordcalcty");
         entity.trendpct = row.IsNull("trendpct") ? decimal.Zero : row.Field<decimal>("trendpct");
         entity.orderpt = row.IsNull("orderpt") ? decimal.Zero : row.Field<decimal>("orderpt");
         entity.ordqtyin = row.IsNull("ordqtyin") ? decimal.Zero : row.Field<decimal>("ordqtyin");
         entity.ordqtyout = row.IsNull("ordqtyout") ? decimal.Zero : row.Field<decimal>("ordqtyout");
         entity.overreasin = row.IsNull("overreasin") ? string.Empty : row.Field<string>("overreasin");
         entity.frtconsldtcd = row.IsNull("frtconsldtcd") ? string.Empty : row.Field<string>("frtconsldtcd");
         entity.overreasout = row.IsNull("overreasout") ? string.Empty : row.Field<string>("overreasout");
         entity.unitwt = row.IsNull("unitwt") ? string.Empty : row.Field<string>("unitwt");
         entity.safeallamt = row.IsNull("safeallamt") ? decimal.Zero : row.Field<decimal>("safeallamt");
         entity.updtsrc = row.IsNull("updtsrc") ? string.Empty : row.Field<string>("updtsrc");
         entity.troqfl = row.Field<bool>("troqfl");
         entity.vminwks = row.IsNull("vminwks") ? 0 : row.Field<int>("vminwks");
         entity.unitbuy = row.IsNull("unitbuy") ? string.Empty : row.Field<string>("unitbuy");
         entity.vmaxwks = row.IsNull("vmaxwks") ? 0 : row.Field<int>("vmaxwks");
         entity.unitstnd = row.IsNull("unitstnd") ? string.Empty : row.Field<string>("unitstnd");
         entity.linept = row.IsNull("linept") ? decimal.Zero : row.Field<decimal>("linept");
         entity.leadtmavg = row.IsNull("leadtmavg") ? 0 : row.Field<int>("leadtmavg");
         entity.usgmths = row.IsNull("usgmths") ? 0 : row.Field<int>("usgmths");
         entity.vroqfl = row.Field<bool>("vroqfl");
         entity.safeallpct = row.IsNull("safeallpct") ? decimal.Zero : row.Field<decimal>("safeallpct");
         entity.automrgfl = row.Field<bool>("automrgfl");
         entity.termsdiscfl = row.Field<bool>("termsdiscfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.termspct = row.IsNull("termspct") ? decimal.Zero : row.Field<decimal>("termspct");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.warrlength = row.IsNull("warrlength") ? 0 : row.Field<int>("warrlength");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.warrtype = row.IsNull("warrtype") ? string.Empty : row.Field<string>("warrtype");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.arptype = row.IsNull("arptype") ? string.Empty : row.Field<string>("arptype");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.arppushfl = row.Field<bool>("arppushfl");
         entity.user6 = row.Field<decimal?>("user6");
         entity.nontaxtype = row.IsNull("nontaxtype") ? string.Empty : row.Field<string>("nontaxtype");
         entity.user7 = row.Field<decimal?>("user7");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.taxablety = row.IsNull("taxablety") ? string.Empty : row.Field<string>("taxablety");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.taxgroup = row.IsNull("taxgroup") ? 0 : row.Field<int>("taxgroup");
         entity.taxtype = row.IsNull("taxtype") ? string.Empty : row.Field<string>("taxtype");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.conslinefl = row.Field<bool>("conslinefl");
         entity.conswhsefl = row.Field<bool>("conswhsefl");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.safeallty = row.IsNull("safeallty") ? string.Empty : row.Field<string>("safeallty");
         entity.vendcorechgfl = row.Field<bool>("vendcorechgfl");
         entity.zerocstcorefl = row.Field<bool>("zerocstcorefl");
         entity.zerocstgldivno = row.IsNull("zerocstgldivno") ? 0 : row.Field<int>("zerocstgldivno");
         entity.zerocstgldeptno = row.IsNull("zerocstgldeptno") ? 0 : row.Field<int>("zerocstgldeptno");
         entity.zerocstglacctno = row.IsNull("zerocstglacctno") ? 0 : row.Field<int>("zerocstglacctno");
         entity.zerocstglsubno = row.IsNull("zerocstglsubno") ? 0 : row.Field<int>("zerocstglsubno");
         entity.esourcety = row.IsNull("esourcety") ? string.Empty : row.Field<string>("esourcety");
         entity.esspecnsty = row.IsNull("esspecnsty") ? string.Empty : row.Field<string>("esspecnsty");
         entity.rrarunitrnd = row.IsNull("rrarunitrnd") ? string.Empty : row.Field<string>("rrarunitrnd");
         entity.ickcost = row.IsNull("ickcost") ? decimal.Zero : row.Field<decimal>("ickcost");
         entity.wtrcost = row.IsNull("wtrcost") ? decimal.Zero : row.Field<decimal>("wtrcost");
         entity.wtkcost = row.IsNull("wtkcost") ? decimal.Zero : row.Field<decimal>("wtkcost");
         entity.rolloanusagefl = row.Field<bool>("rolloanusagefl");
         entity.tminwks = row.IsNull("tminwks") ? 0 : row.Field<int>("tminwks");
         entity.tmaxwks = row.IsNull("tmaxwks") ? 0 : row.Field<int>("tmaxwks");
         entity.wtrevcycle = row.IsNull("wtrevcycle") ? 0 : row.Field<int>("wtrevcycle");
         entity.usagerate = row.IsNull("usagerate") ? decimal.Zero : row.Field<decimal>("usagerate");
         entity.belowlpfl = row.Field<bool>("belowlpfl");
         entity.freightexpectedty = row.IsNull("freightexpectedty") ? string.Empty : row.Field<string>("freightexpectedty");
         entity.surplusty = row.IsNull("surplusty") ? string.Empty : row.Field<string>("surplusty");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.usagectrl = row.IsNull("usagectrl") ? string.Empty : row.Field<string>("usagectrl");
         entity.prodpreference = row.IsNull("prodpreference") ? string.Empty : row.Field<string>("prodpreference");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("icslRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcslBase(ref DataRow row, IcslBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("descrip", entity.descrip);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("minbuy", entity.minbuy);
         row.SetField("minbuytype", entity.minbuytype);
         row.SetField("tarbuytype", entity.tarbuytype);
         row.SetField("tarlevel", entity.tarlevel);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("discmult1", entity.discmult1);
         row.SetField("discmult2", entity.discmult2);
         row.SetField("discmult3", entity.discmult3);
         row.SetField("discmult4", entity.discmult4);
         row.SetField("discmult5", entity.discmult5);
         row.SetField("discmult6", entity.discmult6);
         row.SetField("discmult7", entity.discmult7);
         row.SetField("discmult8", entity.discmult8);
         row.SetField("discmult9", entity.discmult9);
         row.SetField("whse", entity.whse);
         row.SetField("buyer", entity.buyer);
         row.SetField("revcyclin", entity.revcyclin);
         row.SetField("revcyclout", entity.revcyclout);
         row.SetField("frozenfl", entity.frozenfl);
         row.SetField("lastpowtdt", entity.lastpowtdt);
         row.SetField("rcvtolpct", entity.rcvtolpct);
         row.SetField("tarbuyamt1", entity.tarbuyamt1);
         row.SetField("tarbuyamt2", entity.tarbuyamt2);
         row.SetField("tarbuyamt3", entity.tarbuyamt3);
         row.SetField("tarbuyamt4", entity.tarbuyamt4);
         row.SetField("tarbuyamt5", entity.tarbuyamt5);
         row.SetField("tarbuyamt6", entity.tarbuyamt6);
         row.SetField("tarbuyamt7", entity.tarbuyamt7);
         row.SetField("tarbuyamt8", entity.tarbuyamt8);
         row.SetField("tarbuyamt9", entity.tarbuyamt9);
         row.SetField("seasbegmm", entity.seasbegmm);
         row.SetField("seasendmm", entity.seasendmm);
         row.SetField("class", entity.@class);
         row.SetField("frozenmos", entity.frozenmos);
         row.SetField("frozentype", entity.frozentype);
         row.SetField("nodaysseas", entity.nodaysseas);
         row.SetField("icrcost", entity.icrcost);
         row.SetField("ordcalcty", entity.ordcalcty);
         row.SetField("trendpct", entity.trendpct);
         row.SetField("orderpt", entity.orderpt);
         row.SetField("ordqtyin", entity.ordqtyin);
         row.SetField("ordqtyout", entity.ordqtyout);
         row.SetField("overreasin", entity.overreasin);
         row.SetField("frtconsldtcd", entity.frtconsldtcd);
         row.SetField("overreasout", entity.overreasout);
         row.SetField("unitwt", entity.unitwt);
         row.SetField("safeallamt", entity.safeallamt);
         row.SetField("updtsrc", entity.updtsrc);
         row.SetField("troqfl", entity.troqfl);
         row.SetField("vminwks", entity.vminwks);
         row.SetField("unitbuy", entity.unitbuy);
         row.SetField("vmaxwks", entity.vmaxwks);
         row.SetField("unitstnd", entity.unitstnd);
         row.SetField("linept", entity.linept);
         row.SetField("leadtmavg", entity.leadtmavg);
         row.SetField("usgmths", entity.usgmths);
         row.SetField("vroqfl", entity.vroqfl);
         row.SetField("safeallpct", entity.safeallpct);
         row.SetField("automrgfl", entity.automrgfl);
         row.SetField("termsdiscfl", entity.termsdiscfl);
         row.SetField("user1", entity.user1);
         row.SetField("termspct", entity.termspct);
         row.SetField("user2", entity.user2);
         row.SetField("warrlength", entity.warrlength);
         row.SetField("user3", entity.user3);
         row.SetField("warrtype", entity.warrtype);
         row.SetField("user4", entity.user4);
         row.SetField("arptype", entity.arptype);
         row.SetField("user5", entity.user5);
         row.SetField("arppushfl", entity.arppushfl);
         row.SetField("user6", entity.user6);
         row.SetField("nontaxtype", entity.nontaxtype);
         row.SetField("user7", entity.user7);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("user8", entity.user8);
         row.SetField("taxablety", entity.taxablety);
         row.SetField("user9", entity.user9);
         row.SetField("taxgroup", entity.taxgroup);
         row.SetField("taxtype", entity.taxtype);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("conslinefl", entity.conslinefl);
         row.SetField("conswhsefl", entity.conswhsefl);
         row.SetField("transproc", entity.transproc);
         row.SetField("safeallty", entity.safeallty);
         row.SetField("vendcorechgfl", entity.vendcorechgfl);
         row.SetField("zerocstcorefl", entity.zerocstcorefl);
         row.SetField("zerocstgldivno", entity.zerocstgldivno);
         row.SetField("zerocstgldeptno", entity.zerocstgldeptno);
         row.SetField("zerocstglacctno", entity.zerocstglacctno);
         row.SetField("zerocstglsubno", entity.zerocstglsubno);
         row.SetField("esourcety", entity.esourcety);
         row.SetField("esspecnsty", entity.esspecnsty);
         row.SetField("rrarunitrnd", entity.rrarunitrnd);
         row.SetField("ickcost", entity.ickcost);
         row.SetField("wtrcost", entity.wtrcost);
         row.SetField("wtkcost", entity.wtkcost);
         row.SetField("rolloanusagefl", entity.rolloanusagefl);
         row.SetField("tminwks", entity.tminwks);
         row.SetField("tmaxwks", entity.tmaxwks);
         row.SetField("wtrevcycle", entity.wtrevcycle);
         row.SetField("usagerate", entity.usagerate);
         row.SetField("belowlpfl", entity.belowlpfl);
         row.SetField("freightexpectedty", entity.freightexpectedty);
         row.SetField("surplusty", entity.surplusty);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("usagectrl", entity.usagectrl);
         row.SetField("prodpreference", entity.prodpreference);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("icslRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcslBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("whse", entity.whse);
         row.SetField("icslRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	