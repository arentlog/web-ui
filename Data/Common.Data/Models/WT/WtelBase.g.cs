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
       
namespace Infor.Sxe.Common.Data.Models.WT
{
   /// <summary>
   /// WT Line Items
   /// </summary>
   [EntityType("WT Line Items","TBD","")]
   public partial class WtelBase: ModelBase, IUserFields
   {

      /// <summary>
      /// WT #
      /// </summary>
      [Key,Order]
      public int wtno { get; set; }

      /// <summary>
      /// WT Suffix
      /// </summary>
      [Key,Order]
      public int wtsuf { get; set; }

      /// <summary>
      /// Line#
      /// </summary>
      [Key,Order]
      public int lineno { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [BusContext(BusPart.Location),StringValidationAttribute]
      public string shipfmwhse { get; set; }

      /// <summary>
      /// Type
      /// </summary>
      [ID(5),StringValidationAttribute]
      public string transtype { get; set; }

      /// <summary>
      /// Ordered
      /// </summary>
      public decimal qtyord { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      [BusContext(BusPart.AcctEntity)]
      public int cono { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

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
      /// Product
      /// </summary>
      [ID(4),StringValidationAttribute]
      public string shipprod { get; set; }

      /// <summary>
      /// Last Change Time
      /// </summary>
      [StringValidationAttribute]
      public string transtm { get; set; }

      /// <summary>
      /// Ship Qty - Stocking
      /// </summary>
      public decimal stkqtyship { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Category In
      /// </summary>
      [StringValidationAttribute]
      public string prodcati { get; set; }

      /// <summary>
      /// Usage
      /// </summary>
      public bool usagefl { get; set; }

      /// <summary>
      /// PO/WT #
      /// </summary>
      [StringValidationAttribute]
      public string ordertype { get; set; }

      /// <summary>
      /// Weight
      /// </summary>
      public decimal weight { get; set; }

      /// <summary>
      /// Cube
      /// </summary>
      public decimal cubes { get; set; }

      /// <summary>
      /// Qty From Receivers
      /// </summary>
      public decimal qtyfmrcvs { get; set; }

      /// <summary>
      /// Old Stk Qty Ship
      /// </summary>
      public decimal ostkqtyship { get; set; }

      /// <summary>
      /// Actual Shipped
      /// </summary>
      public decimal qtyactship { get; set; }

      /// <summary>
      /// # Times Chg
      /// </summary>
      public int notimeschg { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Description 2
      /// </summary>
      [StringValidationAttribute]
      public string proddesc2 { get; set; }

      /// <summary>
      /// Lead Time Excpt
      /// </summary>
      [StringValidationAttribute]
      public string leadoverty { get; set; }

      /// <summary>
      /// Spec Rec Link
      /// </summary>
      public int icspecrecno { get; set; }

      /// <summary>
      /// Print
      /// </summary>
      public bool printfl { get; set; }

      /// <summary>
      /// Charge Qty In
      /// </summary>
      public decimal chrgqtyi { get; set; }

      /// <summary>
      /// BO #
      /// </summary>
      public int bono { get; set; }

      /// <summary>
      /// Cost Over
      /// </summary>
      public bool costoverfl { get; set; }

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
      /// # SN/Lots In
      /// </summary>
      public decimal nosnlotsi { get; set; }

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
      /// Prev Qty Ship
      /// </summary>
      public decimal prevqtyshp { get; set; }

      /// <summary>
      /// Comment
      /// </summary>
      public bool commentfl { get; set; }

      /// <summary>
      /// Catch Wt In
      /// </summary>
      public bool catwtfli { get; set; }

      /// <summary>
      /// B/O
      /// </summary>
      public bool bofl { get; set; }

      /// <summary>
      /// Qty Shipped
      /// </summary>
      public decimal qtyship { get; set; }

      /// <summary>
      /// Due
      /// </summary>
      public DateTime? duedt { get; set; }

      /// <summary>
      /// ARP Overridden
      /// </summary>
      public bool arpoverfl { get; set; }

      /// <summary>
      /// Co # To
      /// </summary>
      public int cono2 { get; set; }

      /// <summary>
      /// Ship To Whse
      /// </summary>
      [StringValidationAttribute]
      public string shiptowhse { get; set; }

      /// <summary>
      /// netamt
      /// </summary>
      public decimal netamt { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [ID(6),StringValidationAttribute]
      public string proddesc { get; set; }

      /// <summary>
      /// Stk Qty Ord
      /// </summary>
      public decimal stkqtyord { get; set; }

      /// <summary>
      /// Approve Type
      /// </summary>
      [StringValidationAttribute]
      public string approvety { get; set; }

      /// <summary>
      /// Approve Date
      /// </summary>
      public DateTime? approvedt { get; set; }

      /// <summary>
      /// Appr Init
      /// </summary>
      [StringValidationAttribute]
      public string approveinit { get; set; }

      /// <summary>
      /// Charge Qty Out
      /// </summary>
      public decimal chrgqtyo { get; set; }

      /// <summary>
      /// Net Rcv
      /// </summary>
      public decimal netrcv { get; set; }

      /// <summary>
      /// Category Out
      /// </summary>
      [StringValidationAttribute]
      public string prodcato { get; set; }

      /// <summary>
      /// Rcv Qty
      /// </summary>
      public decimal qtyrcv { get; set; }

      /// <summary>
      /// Stk Qty Rcv
      /// </summary>
      public decimal stkqtyrcv { get; set; }

      /// <summary>
      /// Catch Wt Out
      /// </summary>
      public bool catwtflo { get; set; }

      /// <summary>
      /// Line # Alternate
      /// </summary>
      public int linealtno { get; set; }

      /// <summary>
      /// Related Order #
      /// </summary>
      public int orderaltno { get; set; }

      /// <summary>
      /// # SN/Lots Out
      /// </summary>
      public decimal nosnlotso { get; set; }

      /// <summary>
      /// Non Stock
      /// </summary>
      [StringValidationAttribute]
      public string nonstockty { get; set; }

      /// <summary>
      /// Bin Loc
      /// </summary>
      [StringValidationAttribute]
      public string binloc { get; set; }

      /// <summary>
      /// Requested Prod
      /// </summary>
      [StringValidationAttribute]
      public string reqprod { get; set; }

      /// <summary>
      /// Cross Ref Type
      /// </summary>
      [StringValidationAttribute]
      public string xrefprodty { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Line
      /// </summary>
      [StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Prod in Rcv Whse
      /// </summary>
      public bool prodinrcvfl { get; set; }

      /// <summary>
      /// Net Ord
      /// </summary>
      public decimal netord { get; set; }

      /// <summary>
      /// Unavailable
      /// </summary>
      public decimal qtyunavail { get; set; }

      /// <summary>
      /// Reason
      /// </summary>
      [StringValidationAttribute]
      public string reasunavty { get; set; }

      /// <summary>
      /// Delay Reservation
      /// </summary>
      public bool delayresrvfl { get; set; }

      /// <summary>
      /// Gl Rcv Cost
      /// </summary>
      public decimal glcostrcv { get; set; }

      /// <summary>
      /// Last B/O
      /// </summary>
      public bool lastbofl { get; set; }

      /// <summary>
      /// GL Cost Exception
      /// </summary>
      public decimal glcostexc { get; set; }

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
      /// Addon Amt
      /// </summary>
      public decimal addonamt { get; set; }

      /// <summary>
      /// Whse Mgr Qty Ship
      /// </summary>
      public decimal wmqtyship { get; set; }

      /// <summary>
      /// Whse Mgr Qty Rcv
      /// </summary>
      public decimal wmqtyrcv { get; set; }

      /// <summary>
      /// # Stk Units
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

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
      /// Customer Stk Qty
      /// </summary>
      public decimal custstkqtyshp { get; set; }

      /// <summary>
      /// Customer Cost
      /// </summary>
      public decimal custprodcost { get; set; }

      /// <summary>
      /// Cut?
      /// </summary>
      public bool cutfl { get; set; }

      /// <summary>
      /// Cut Loss Amount
      /// </summary>
      public decimal cutlossamt { get; set; }

      /// <summary>
      /// Scrap Loss Amount
      /// </summary>
      public decimal scraplossamt { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

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
      public static T BuildWtelBaseFromRow<T>(DataRow row) where T:WtelBase, new()
      {
         T entity = new T();
         entity.wtno = row.IsNull("wtno") ? 0 : row.Field<int>("wtno");
         entity.wtsuf = row.IsNull("wtsuf") ? 0 : row.Field<int>("wtsuf");
         entity.shipfmwhse = row.IsNull("shipfmwhse") ? string.Empty : row.Field<string>("shipfmwhse");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.enterdt = row.Field<DateTime?>("enterdt");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.prodcati = row.IsNull("prodcati") ? string.Empty : row.Field<string>("prodcati");
         entity.usagefl = row.Field<bool>("usagefl");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.qtyfmrcvs = row.IsNull("qtyfmrcvs") ? decimal.Zero : row.Field<decimal>("qtyfmrcvs");
         entity.ostkqtyship = row.IsNull("ostkqtyship") ? decimal.Zero : row.Field<decimal>("ostkqtyship");
         entity.qtyactship = row.IsNull("qtyactship") ? decimal.Zero : row.Field<decimal>("qtyactship");
         entity.notimeschg = row.IsNull("notimeschg") ? 0 : row.Field<int>("notimeschg");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.leadoverty = row.IsNull("leadoverty") ? string.Empty : row.Field<string>("leadoverty");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.printfl = row.Field<bool>("printfl");
         entity.chrgqtyi = row.IsNull("chrgqtyi") ? decimal.Zero : row.Field<decimal>("chrgqtyi");
         entity.bono = row.IsNull("bono") ? 0 : row.Field<int>("bono");
         entity.costoverfl = row.Field<bool>("costoverfl");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.nosnlotsi = row.IsNull("nosnlotsi") ? decimal.Zero : row.Field<decimal>("nosnlotsi");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.prevqtyshp = row.IsNull("prevqtyshp") ? decimal.Zero : row.Field<decimal>("prevqtyshp");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.catwtfli = row.Field<bool>("catwtfli");
         entity.bofl = row.Field<bool>("bofl");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.arpoverfl = row.Field<bool>("arpoverfl");
         entity.cono2 = row.IsNull("cono2") ? 0 : row.Field<int>("cono2");
         entity.shiptowhse = row.IsNull("shiptowhse") ? string.Empty : row.Field<string>("shiptowhse");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.stkqtyord = row.IsNull("stkqtyord") ? decimal.Zero : row.Field<decimal>("stkqtyord");
         entity.approvety = row.IsNull("approvety") ? string.Empty : row.Field<string>("approvety");
         entity.approvedt = row.Field<DateTime?>("approvedt");
         entity.approveinit = row.IsNull("approveinit") ? string.Empty : row.Field<string>("approveinit");
         entity.chrgqtyo = row.IsNull("chrgqtyo") ? decimal.Zero : row.Field<decimal>("chrgqtyo");
         entity.netrcv = row.IsNull("netrcv") ? decimal.Zero : row.Field<decimal>("netrcv");
         entity.prodcato = row.IsNull("prodcato") ? string.Empty : row.Field<string>("prodcato");
         entity.qtyrcv = row.IsNull("qtyrcv") ? decimal.Zero : row.Field<decimal>("qtyrcv");
         entity.stkqtyrcv = row.IsNull("stkqtyrcv") ? decimal.Zero : row.Field<decimal>("stkqtyrcv");
         entity.catwtflo = row.Field<bool>("catwtflo");
         entity.linealtno = row.IsNull("linealtno") ? 0 : row.Field<int>("linealtno");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.nosnlotso = row.IsNull("nosnlotso") ? decimal.Zero : row.Field<decimal>("nosnlotso");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.reqprod = row.IsNull("reqprod") ? string.Empty : row.Field<string>("reqprod");
         entity.xrefprodty = row.IsNull("xrefprodty") ? string.Empty : row.Field<string>("xrefprodty");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodinrcvfl = row.Field<bool>("prodinrcvfl");
         entity.netord = row.IsNull("netord") ? decimal.Zero : row.Field<decimal>("netord");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.delayresrvfl = row.Field<bool>("delayresrvfl");
         entity.glcostrcv = row.IsNull("glcostrcv") ? decimal.Zero : row.Field<decimal>("glcostrcv");
         entity.lastbofl = row.Field<bool>("lastbofl");
         entity.glcostexc = row.IsNull("glcostexc") ? decimal.Zero : row.Field<decimal>("glcostexc");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.addonamt = row.IsNull("addonamt") ? decimal.Zero : row.Field<decimal>("addonamt");
         entity.wmqtyship = row.IsNull("wmqtyship") ? decimal.Zero : row.Field<decimal>("wmqtyship");
         entity.wmqtyrcv = row.IsNull("wmqtyrcv") ? decimal.Zero : row.Field<decimal>("wmqtyrcv");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
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
         entity.custstkqtyshp = row.IsNull("custstkqtyshp") ? decimal.Zero : row.Field<decimal>("custstkqtyshp");
         entity.custprodcost = row.IsNull("custprodcost") ? decimal.Zero : row.Field<decimal>("custprodcost");
         entity.cutfl = row.Field<bool>("cutfl");
         entity.cutlossamt = row.IsNull("cutlossamt") ? decimal.Zero : row.Field<decimal>("cutlossamt");
         entity.scraplossamt = row.IsNull("scraplossamt") ? decimal.Zero : row.Field<decimal>("scraplossamt");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("wtelRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWtelBase(ref DataRow row, WtelBase entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("shipfmwhse", entity.shipfmwhse);
         row.SetField("transtype", entity.transtype);
         row.SetField("lineno", entity.lineno);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("cono", entity.cono);
         row.SetField("unit", entity.unit);
         row.SetField("transdt", entity.transdt);
         row.SetField("enterdt", entity.enterdt);
         row.SetField("operinit", entity.operinit);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("transtm", entity.transtm);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("prodcati", entity.prodcati);
         row.SetField("usagefl", entity.usagefl);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("weight", entity.weight);
         row.SetField("cubes", entity.cubes);
         row.SetField("qtyfmrcvs", entity.qtyfmrcvs);
         row.SetField("ostkqtyship", entity.ostkqtyship);
         row.SetField("qtyactship", entity.qtyactship);
         row.SetField("notimeschg", entity.notimeschg);
         row.SetField("statustype", entity.statustype);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("leadoverty", entity.leadoverty);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("printfl", entity.printfl);
         row.SetField("chrgqtyi", entity.chrgqtyi);
         row.SetField("bono", entity.bono);
         row.SetField("costoverfl", entity.costoverfl);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("nosnlotsi", entity.nosnlotsi);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("prevqtyshp", entity.prevqtyshp);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("catwtfli", entity.catwtfli);
         row.SetField("bofl", entity.bofl);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("duedt", entity.duedt);
         row.SetField("arpoverfl", entity.arpoverfl);
         row.SetField("cono2", entity.cono2);
         row.SetField("shiptowhse", entity.shiptowhse);
         row.SetField("netamt", entity.netamt);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("stkqtyord", entity.stkqtyord);
         row.SetField("approvety", entity.approvety);
         row.SetField("approvedt", entity.approvedt);
         row.SetField("approveinit", entity.approveinit);
         row.SetField("chrgqtyo", entity.chrgqtyo);
         row.SetField("netrcv", entity.netrcv);
         row.SetField("prodcato", entity.prodcato);
         row.SetField("qtyrcv", entity.qtyrcv);
         row.SetField("stkqtyrcv", entity.stkqtyrcv);
         row.SetField("catwtflo", entity.catwtflo);
         row.SetField("linealtno", entity.linealtno);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("nosnlotso", entity.nosnlotso);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("binloc", entity.binloc);
         row.SetField("reqprod", entity.reqprod);
         row.SetField("xrefprodty", entity.xrefprodty);
         row.SetField("vendno", entity.vendno);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodinrcvfl", entity.prodinrcvfl);
         row.SetField("netord", entity.netord);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("delayresrvfl", entity.delayresrvfl);
         row.SetField("glcostrcv", entity.glcostrcv);
         row.SetField("lastbofl", entity.lastbofl);
         row.SetField("glcostexc", entity.glcostexc);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("addonamt", entity.addonamt);
         row.SetField("wmqtyship", entity.wmqtyship);
         row.SetField("wmqtyrcv", entity.wmqtyrcv);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("transproc", entity.transproc);
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
         row.SetField("custstkqtyshp", entity.custstkqtyshp);
         row.SetField("custprodcost", entity.custprodcost);
         row.SetField("cutfl", entity.cutfl);
         row.SetField("cutlossamt", entity.cutlossamt);
         row.SetField("scraplossamt", entity.scraplossamt);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("wtelRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, WtelBase entity)
      {
         row.SetField("wtno", entity.wtno);
         row.SetField("wtsuf", entity.wtsuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("wtelRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	