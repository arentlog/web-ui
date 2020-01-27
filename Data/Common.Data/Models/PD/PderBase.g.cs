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
       
namespace Infor.Sxe.Common.Data.Models.PD
{
   /// <summary>
   /// Transaction File for Rebates
   /// </summary>
   
   public partial class PderBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Rebate For
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string rebatecd { get; set; }

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
      /// PDER Suffix
      /// </summary>
      [Key,Order]
      public int pdersuf { get; set; }

      /// <summary>
      /// Status Type
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

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
      /// Spec Rec Link
      /// </summary>
      public int icspecrecno { get; set; }

      /// <summary>
      /// Record #
      /// </summary>
      public decimal rebrecno { get; set; }

      /// <summary>
      /// Rebate Unit Cost
      /// </summary>
      public decimal rebcost { get; set; }

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
      /// Stock Quantity Shipped
      /// </summary>
      public decimal stkqtyship { get; set; }

      /// <summary>
      /// Actual Cost
      /// </summary>
      public decimal actcost { get; set; }

      /// <summary>
      /// Act Stk Qty Pd
      /// </summary>
      public decimal actstkqty { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// Contract #
      /// </summary>
      [StringValidationAttribute]
      public string contractno { get; set; }

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
      /// Ship Type
      /// </summary>
      [StringValidationAttribute]
      public string dropshipty { get; set; }

      /// <summary>
      /// Freeze Rebate Type
      /// </summary>
      [StringValidationAttribute]
      public string frzrebty { get; set; }

      /// <summary>
      /// Report Exchange Rate
      /// </summary>
      public decimal rptexrate { get; set; }

      /// <summary>
      /// Recon Exchange Rate
      /// </summary>
      public decimal reconexrate { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string shipprod { get; set; }

      /// <summary>
      /// # Stk Units
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// Quantity Shipped
      /// </summary>
      public decimal qtyship { get; set; }

      /// <summary>
      /// Invoice Costed Date
      /// </summary>
      public DateTime? invpodt { get; set; }

      /// <summary>
      /// Special Price/Cost
      /// </summary>
      [StringValidationAttribute]
      public string speccostty { get; set; }

      /// <summary>
      /// Price/Cost Units Per Stk Unit
      /// </summary>
      public decimal csunperstk { get; set; }

      /// <summary>
      /// Special Conversion
      /// </summary>
      public int specconv { get; set; }

      /// <summary>
      /// Spec Price/Cost Unit
      /// </summary>
      [StringValidationAttribute]
      public string prccostper { get; set; }

      /// <summary>
      /// Rebate Amount
      /// </summary>
      public decimal rebateamt { get; set; }

      /// <summary>
      /// Reported Rebate Amount
      /// </summary>
      public decimal rptrebamt { get; set; }

      /// <summary>
      /// Entered
      /// </summary>
      public DateTime? postdt { get; set; }

      /// <summary>
      /// Ref
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

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
      /// Actual Cost Down To
      /// </summary>
      public decimal actcostto { get; set; }

      /// <summary>
      /// Reb To Unit Cost
      /// </summary>
      public decimal rebcostto { get; set; }

      /// <summary>
      /// Rebate Calc Type
      /// </summary>
      [StringValidationAttribute]
      public string rebcalcty { get; set; }

      /// <summary>
      /// Rebate Percent
      /// </summary>
      public decimal rebatepct { get; set; }

      /// <summary>
      /// Return
      /// </summary>
      public bool returnfl { get; set; }

      /// <summary>
      /// Commission Exception Type
      /// </summary>
      [StringValidationAttribute]
      public string commexcpty { get; set; }

      /// <summary>
      /// Claim #
      /// </summary>
      public int intclaimno { get; set; }

      /// <summary>
      /// Update Type
      /// </summary>
      [StringValidationAttribute]
      public string srcupdtty { get; set; }

      /// <summary>
      /// Units
      /// </summary>
      [StringValidationAttribute]
      public string unit { get; set; }

      /// <summary>
      /// PO/OE Net Amt
      /// </summary>
      public decimal netamt { get; set; }

      /// <summary>
      /// Journal #
      /// </summary>
      public int jrnlno { get; set; }

      /// <summary>
      /// Set #
      /// </summary>
      public int setno { get; set; }

      /// <summary>
      /// Division #
      /// </summary>
      public int divno { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Alternate Rebate Record #
      /// </summary>
      public int altrebrecno { get; set; }

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
      public static T BuildPderBaseFromRow<T>(DataRow row) where T:PderBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.rebatecd = row.IsNull("rebatecd") ? string.Empty : row.Field<string>("rebatecd");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.rebrecno = row.IsNull("rebrecno") ? decimal.Zero : row.Field<decimal>("rebrecno");
         entity.rebcost = row.IsNull("rebcost") ? decimal.Zero : row.Field<decimal>("rebcost");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.actcost = row.IsNull("actcost") ? decimal.Zero : row.Field<decimal>("actcost");
         entity.actstkqty = row.IsNull("actstkqty") ? decimal.Zero : row.Field<decimal>("actstkqty");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.dropshipty = row.IsNull("dropshipty") ? string.Empty : row.Field<string>("dropshipty");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.frzrebty = row.IsNull("frzrebty") ? string.Empty : row.Field<string>("frzrebty");
         entity.rptexrate = row.IsNull("rptexrate") ? decimal.Zero : row.Field<decimal>("rptexrate");
         entity.reconexrate = row.IsNull("reconexrate") ? decimal.Zero : row.Field<decimal>("reconexrate");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.invpodt = row.Field<DateTime?>("invpodt");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.specconv = row.IsNull("specconv") ? 0 : row.Field<int>("specconv");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.rebateamt = row.IsNull("rebateamt") ? decimal.Zero : row.Field<decimal>("rebateamt");
         entity.rptrebamt = row.IsNull("rptrebamt") ? decimal.Zero : row.Field<decimal>("rptrebamt");
         entity.postdt = row.Field<DateTime?>("postdt");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.slsrepin = row.IsNull("slsrepin") ? string.Empty : row.Field<string>("slsrepin");
         entity.slsrepout = row.IsNull("slsrepout") ? string.Empty : row.Field<string>("slsrepout");
         entity.actcostto = row.IsNull("actcostto") ? decimal.Zero : row.Field<decimal>("actcostto");
         entity.rebcostto = row.IsNull("rebcostto") ? decimal.Zero : row.Field<decimal>("rebcostto");
         entity.rebcalcty = row.IsNull("rebcalcty") ? string.Empty : row.Field<string>("rebcalcty");
         entity.rebatepct = row.IsNull("rebatepct") ? decimal.Zero : row.Field<decimal>("rebatepct");
         entity.returnfl = row.Field<bool>("returnfl");
         entity.commexcpty = row.IsNull("commexcpty") ? string.Empty : row.Field<string>("commexcpty");
         entity.intclaimno = row.IsNull("intclaimno") ? 0 : row.Field<int>("intclaimno");
         entity.srcupdtty = row.IsNull("srcupdtty") ? string.Empty : row.Field<string>("srcupdtty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.jrnlno = row.IsNull("jrnlno") ? 0 : row.Field<int>("jrnlno");
         entity.setno = row.IsNull("setno") ? 0 : row.Field<int>("setno");
         entity.pdersuf = row.IsNull("pdersuf") ? 0 : row.Field<int>("pdersuf");
         entity.divno = row.IsNull("divno") ? 0 : row.Field<int>("divno");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.altrebrecno = row.IsNull("altrebrecno") ? 0 : row.Field<int>("altrebrecno");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("pderRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPderBase(ref DataRow row, PderBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("statustype", entity.statustype);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("rebrecno", entity.rebrecno);
         row.SetField("rebcost", entity.rebcost);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("actcost", entity.actcost);
         row.SetField("actstkqty", entity.actstkqty);
         row.SetField("whse", entity.whse);
         row.SetField("vendno", entity.vendno);
         row.SetField("contractno", entity.contractno);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("dropshipty", entity.dropshipty);
         row.SetField("seqno", entity.seqno);
         row.SetField("frzrebty", entity.frzrebty);
         row.SetField("rptexrate", entity.rptexrate);
         row.SetField("reconexrate", entity.reconexrate);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("invpodt", entity.invpodt);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("specconv", entity.specconv);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("rebateamt", entity.rebateamt);
         row.SetField("rptrebamt", entity.rptrebamt);
         row.SetField("postdt", entity.postdt);
         row.SetField("refer", entity.refer);
         row.SetField("slsrepin", entity.slsrepin);
         row.SetField("slsrepout", entity.slsrepout);
         row.SetField("actcostto", entity.actcostto);
         row.SetField("rebcostto", entity.rebcostto);
         row.SetField("rebcalcty", entity.rebcalcty);
         row.SetField("rebatepct", entity.rebatepct);
         row.SetField("returnfl", entity.returnfl);
         row.SetField("commexcpty", entity.commexcpty);
         row.SetField("intclaimno", entity.intclaimno);
         row.SetField("srcupdtty", entity.srcupdtty);
         row.SetField("unit", entity.unit);
         row.SetField("netamt", entity.netamt);
         row.SetField("jrnlno", entity.jrnlno);
         row.SetField("setno", entity.setno);
         row.SetField("pdersuf", entity.pdersuf);
         row.SetField("divno", entity.divno);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("transproc", entity.transproc);
         row.SetField("altrebrecno", entity.altrebrecno);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("pderRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PderBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("lineno", entity.lineno);
         row.SetField("seqno", entity.seqno);
         row.SetField("pdersuf", entity.pdersuf);
         row.SetField("pderRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	