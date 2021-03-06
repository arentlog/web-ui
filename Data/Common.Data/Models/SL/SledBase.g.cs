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
       
namespace Infor.Sxe.Common.Data.Models.SL
{
   /// <summary>
   /// Supplier Link Edit/Detail History
   /// </summary>
   
   public partial class SledBase: ModelBase
   {

      /// <summary>
      /// Base Price
      /// </summary>
      public decimal baseprice { get; set; }

      /// <summary>
      /// Company #
      /// </summary>
      public int cono { get; set; }

      /// <summary>
      /// Cube
      /// </summary>
      public decimal cubes { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }

      /// <summary>
      /// ICSC Create
      /// </summary>
      public bool icscfl { get; set; }

      /// <summary>
      /// ICSP Create
      /// </summary>
      public bool icspfl { get; set; }

      /// <summary>
      /// ICSW Create
      /// </summary>
      public bool icswfl { get; set; }

      /// <summary>
      /// Import Type
      /// </summary>
      [StringValidationAttribute]
      public string imptype { get; set; }

      /// <summary>
      /// List Price
      /// </summary>
      public decimal listprice { get; set; }

      /// <summary>
      /// Lookup Name
      /// </summary>
      [StringValidationAttribute]
      public string lookupnm { get; set; }

      /// <summary>
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// Last Change By
      /// </summary>
      [StringValidationAttribute]
      public string operinit { get; set; }

      /// <summary>
      /// Multiplier
      /// </summary>
      [StringValidationAttribute]
      public string priceonty { get; set; }

      /// <summary>
      /// Price Type
      /// </summary>
      [StringValidationAttribute]
      public string pricetype { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Category
      /// </summary>
      [StringValidationAttribute]
      public string prodcat { get; set; }

      /// <summary>
      /// Product Line
      /// </summary>
      [StringValidationAttribute]
      public string prodline { get; set; }

      /// <summary>
      /// Replacement
      /// </summary>
      public decimal replcost { get; set; }

      /// <summary>
      /// Lookup Name Sequence #
      /// </summary>
      public int seqno { get; set; }

      /// <summary>
      /// Superseded Part #
      /// </summary>
      [StringValidationAttribute]
      public string slaltprod { get; set; }

      /// <summary>
      /// Catalog #
      /// </summary>
      [StringValidationAttribute]
      public string slcat { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal slcost { get; set; }

      /// <summary>
      /// Price/Cost Units Per Stk Unit
      /// </summary>
      public decimal slcsunperstk { get; set; }

      /// <summary>
      /// Currency
      /// </summary>
      [StringValidationAttribute]
      public string slcurrencyty { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [StringValidationAttribute]
      public string sldescrip1 { get; set; }
      [StringValidationAttribute]
      public string sldescrip2 { get; set; }

      /// <summary>
      /// Edited
      /// </summary>
      public bool sleditfl { get; set; }

      /// <summary>
      /// Exchange Rate
      /// </summary>
      public decimal slexchgrate1 { get; set; }
      public decimal slexchgrate2 { get; set; }

      /// <summary>
      /// Supplier Group
      /// </summary>
      [StringValidationAttribute]
      public string slgroup { get; set; }

      /// <summary>
      /// Line Code
      /// </summary>
      [StringValidationAttribute]
      public string sllinecd { get; set; }

      /// <summary>
      /// List Price
      /// </summary>
      public decimal sllist { get; set; }

      /// <summary>
      /// MSDS Product
      /// </summary>
      public bool slmsdsfl { get; set; }

      /// <summary>
      /// MSDS Sheet #
      /// </summary>
      [StringValidationAttribute]
      public string slmsdssheetno { get; set; }

      /// <summary>
      /// Origin
      /// </summary>
      [StringValidationAttribute]
      public string sloriginty { get; set; }

      /// <summary>
      /// Price Book Sequence #
      /// </summary>
      public int slpbseqno { get; set; }

      /// <summary>
      /// Special Price/Cost Unit
      /// </summary>
      [StringValidationAttribute]
      public string slprccostper { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [StringValidationAttribute]
      public string slproduct { get; set; }

      /// <summary>
      /// Special Price/Cost
      /// </summary>
      [StringValidationAttribute]
      public string slspeccostty { get; set; }

      /// <summary>
      /// Unit of Measure
      /// </summary>
      [StringValidationAttribute]
      public string slunit { get; set; }

      /// <summary>
      /// Update #
      /// </summary>
      [StringValidationAttribute]
      public string slupdtno { get; set; }

      /// <summary>
      /// Update Type
      /// </summary>
      [StringValidationAttribute]
      public string slupdttype { get; set; }

      /// <summary>
      /// Vendor Code
      /// </summary>
      [StringValidationAttribute]
      public string slvendcd { get; set; }

      /// <summary>
      /// X-Ref 1
      /// </summary>
      [StringValidationAttribute]
      public string slxref1 { get; set; }

      /// <summary>
      /// X-Ref 2
      /// </summary>
      [StringValidationAttribute]
      public string slxref2 { get; set; }

      /// <summary>
      /// Action
      /// </summary>
      [StringValidationAttribute]
      public string statuscd { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public bool statustype { get; set; }

      /// <summary>
      /// Standard
      /// </summary>
      public decimal stndcost { get; set; }

      /// <summary>
      /// Terms Discount %
      /// </summary>
      public decimal termspct { get; set; }

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
      /// Stocking Units
      /// </summary>
      [StringValidationAttribute]
      public string unitstock { get; set; }

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
      /// Whse
      /// </summary>
      [StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Weight
      /// </summary>
      public decimal weight { get; set; }

      /// <summary>
      /// Supersede
      /// </summary>
      [StringValidationAttribute]
      public string slsupersede { get; set; }

      /// <summary>
      /// Effective
      /// </summary>
      public DateTime? effectdt { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal slcostbrk1 { get; set; }
      public decimal slcostbrk2 { get; set; }
      public decimal slcostbrk3 { get; set; }
      public decimal slcostbrk4 { get; set; }
      public decimal slcostbrk5 { get; set; }
      public decimal slcostbrk6 { get; set; }
      public decimal slcostbrk7 { get; set; }
      public decimal slcostbrk8 { get; set; }
      public decimal slcostbrk9 { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal slpricebrk1 { get; set; }
      public decimal slpricebrk2 { get; set; }
      public decimal slpricebrk3 { get; set; }
      public decimal slpricebrk4 { get; set; }
      public decimal slpricebrk5 { get; set; }
      public decimal slpricebrk6 { get; set; }
      public decimal slpricebrk7 { get; set; }
      public decimal slpricebrk8 { get; set; }
      public decimal slpricebrk9 { get; set; }

      /// <summary>
      /// Qty Break
      /// </summary>
      public int slqtybrk1 { get; set; }
      public int slqtybrk2 { get; set; }
      public int slqtybrk3 { get; set; }
      public int slqtybrk4 { get; set; }
      public int slqtybrk5 { get; set; }
      public int slqtybrk6 { get; set; }
      public int slqtybrk7 { get; set; }
      public int slqtybrk8 { get; set; }

      /// <summary>
      /// Xref 3
      /// </summary>
      [StringValidationAttribute]
      public string slxref3 { get; set; }

      /// <summary>
      /// Xref 4
      /// </summary>
      [StringValidationAttribute]
      public string slxref4 { get; set; }

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
      /// Vendor #
      /// </summary>
      public decimal vendno { get; set; }

      /// <summary>
      /// IDW Data
      /// </summary>
      [StringValidationAttribute]
      public string idwdatapos { get; set; }

      /// <summary>
      /// UN/SPSC Cd
      /// </summary>
      [StringValidationAttribute]
      public string slunspsc { get; set; }

      /// <summary>
      /// Rebate Sub Type
      /// </summary>
      [StringValidationAttribute]
      public string rebsubty { get; set; }

      /// <summary>
      /// Rebate Type
      /// </summary>
      [StringValidationAttribute]
      public string rebatety { get; set; }

      /// <summary>
      /// Error Code
      /// </summary>
      [StringValidationAttribute]
      public string errorcd { get; set; }

      /// <summary>
      /// Hold Code
      /// </summary>
      [StringValidationAttribute]
      public string holdcd { get; set; }

      /// <summary>
      /// Price Effective Dt
      /// </summary>
      public DateTime? slprceffdt { get; set; }

      /// <summary>
      /// Price Expire Dt
      /// </summary>
      public DateTime? slprcexpdt { get; set; }

      /// <summary>
      /// Last Foreign Cost
      /// </summary>
      public decimal lastcostfor { get; set; }

      /// <summary>
      /// Rebate Cost
      /// </summary>
      public decimal rebatecost { get; set; }

      /// <summary>
      /// Product Price
      /// </summary>
      public bool pdscfl { get; set; }

      /// <summary>
      /// Vendor Price
      /// </summary>
      public bool pdsvfl { get; set; }

      /// <summary>
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// Standard Pack
      /// </summary>
      [StringValidationAttribute]
      public string unitstnd { get; set; }

      /// <summary>
      /// # Stk Units
      /// </summary>
      public decimal unitconv { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// Extended Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip3 { get; set; }

      /// <summary>
      /// Extended Description
      /// </summary>
      [StringValidationAttribute]
      public string sldescrip3 { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [Key,StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildSledBaseFromRow<T>(DataRow row) where T:SledBase, new()
      {
         T entity = new T();
         entity.baseprice = row.IsNull("baseprice") ? decimal.Zero : row.Field<decimal>("baseprice");
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.icscfl = row.Field<bool>("icscfl");
         entity.icspfl = row.Field<bool>("icspfl");
         entity.icswfl = row.Field<bool>("icswfl");
         entity.imptype = row.IsNull("imptype") ? string.Empty : row.Field<string>("imptype");
         entity.listprice = row.IsNull("listprice") ? decimal.Zero : row.Field<decimal>("listprice");
         entity.lookupnm = row.IsNull("lookupnm") ? string.Empty : row.Field<string>("lookupnm");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.priceonty = row.IsNull("priceonty") ? string.Empty : row.Field<string>("priceonty");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.replcost = row.IsNull("replcost") ? decimal.Zero : row.Field<decimal>("replcost");
         entity.seqno = row.IsNull("seqno") ? 0 : row.Field<int>("seqno");
         entity.slaltprod = row.IsNull("slaltprod") ? string.Empty : row.Field<string>("slaltprod");
         entity.slcat = row.IsNull("slcat") ? string.Empty : row.Field<string>("slcat");
         entity.slcost = row.IsNull("slcost") ? decimal.Zero : row.Field<decimal>("slcost");
         entity.slcsunperstk = row.IsNull("slcsunperstk") ? decimal.Zero : row.Field<decimal>("slcsunperstk");
         entity.slcurrencyty = row.IsNull("slcurrencyty") ? string.Empty : row.Field<string>("slcurrencyty");
         entity.sldescrip1 = row.IsNull("sldescrip1") ? string.Empty : row.Field<string>("sldescrip1");
         entity.sldescrip2 = row.IsNull("sldescrip2") ? string.Empty : row.Field<string>("sldescrip2");
         entity.sleditfl = row.Field<bool>("sleditfl");
         entity.slexchgrate1 = row.IsNull("slexchgrate1") ? decimal.Zero : row.Field<decimal>("slexchgrate1");
         entity.slexchgrate2 = row.IsNull("slexchgrate2") ? decimal.Zero : row.Field<decimal>("slexchgrate2");
         entity.slgroup = row.IsNull("slgroup") ? string.Empty : row.Field<string>("slgroup");
         entity.sllinecd = row.IsNull("sllinecd") ? string.Empty : row.Field<string>("sllinecd");
         entity.sllist = row.IsNull("sllist") ? decimal.Zero : row.Field<decimal>("sllist");
         entity.slmsdsfl = row.Field<bool>("slmsdsfl");
         entity.slmsdssheetno = row.IsNull("slmsdssheetno") ? string.Empty : row.Field<string>("slmsdssheetno");
         entity.sloriginty = row.IsNull("sloriginty") ? string.Empty : row.Field<string>("sloriginty");
         entity.slpbseqno = row.IsNull("slpbseqno") ? 0 : row.Field<int>("slpbseqno");
         entity.slprccostper = row.IsNull("slprccostper") ? string.Empty : row.Field<string>("slprccostper");
         entity.slproduct = row.IsNull("slproduct") ? string.Empty : row.Field<string>("slproduct");
         entity.slspeccostty = row.IsNull("slspeccostty") ? string.Empty : row.Field<string>("slspeccostty");
         entity.slunit = row.IsNull("slunit") ? string.Empty : row.Field<string>("slunit");
         entity.slupdtno = row.IsNull("slupdtno") ? string.Empty : row.Field<string>("slupdtno");
         entity.slupdttype = row.IsNull("slupdttype") ? string.Empty : row.Field<string>("slupdttype");
         entity.slvendcd = row.IsNull("slvendcd") ? string.Empty : row.Field<string>("slvendcd");
         entity.slxref1 = row.IsNull("slxref1") ? string.Empty : row.Field<string>("slxref1");
         entity.slxref2 = row.IsNull("slxref2") ? string.Empty : row.Field<string>("slxref2");
         entity.statuscd = row.IsNull("statuscd") ? string.Empty : row.Field<string>("statuscd");
         entity.statustype = row.Field<bool>("statustype");
         entity.stndcost = row.IsNull("stndcost") ? decimal.Zero : row.Field<decimal>("stndcost");
         entity.termspct = row.IsNull("termspct") ? decimal.Zero : row.Field<decimal>("termspct");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.unitstock = row.IsNull("unitstock") ? string.Empty : row.Field<string>("unitstock");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.slsupersede = row.IsNull("slsupersede") ? string.Empty : row.Field<string>("slsupersede");
         entity.effectdt = row.Field<DateTime?>("effectdt");
         entity.slcostbrk1 = row.IsNull("slcostbrk1") ? decimal.Zero : row.Field<decimal>("slcostbrk1");
         entity.slcostbrk2 = row.IsNull("slcostbrk2") ? decimal.Zero : row.Field<decimal>("slcostbrk2");
         entity.slcostbrk3 = row.IsNull("slcostbrk3") ? decimal.Zero : row.Field<decimal>("slcostbrk3");
         entity.slcostbrk4 = row.IsNull("slcostbrk4") ? decimal.Zero : row.Field<decimal>("slcostbrk4");
         entity.slcostbrk5 = row.IsNull("slcostbrk5") ? decimal.Zero : row.Field<decimal>("slcostbrk5");
         entity.slcostbrk6 = row.IsNull("slcostbrk6") ? decimal.Zero : row.Field<decimal>("slcostbrk6");
         entity.slcostbrk7 = row.IsNull("slcostbrk7") ? decimal.Zero : row.Field<decimal>("slcostbrk7");
         entity.slcostbrk8 = row.IsNull("slcostbrk8") ? decimal.Zero : row.Field<decimal>("slcostbrk8");
         entity.slcostbrk9 = row.IsNull("slcostbrk9") ? decimal.Zero : row.Field<decimal>("slcostbrk9");
         entity.slpricebrk1 = row.IsNull("slpricebrk1") ? decimal.Zero : row.Field<decimal>("slpricebrk1");
         entity.slpricebrk2 = row.IsNull("slpricebrk2") ? decimal.Zero : row.Field<decimal>("slpricebrk2");
         entity.slpricebrk3 = row.IsNull("slpricebrk3") ? decimal.Zero : row.Field<decimal>("slpricebrk3");
         entity.slpricebrk4 = row.IsNull("slpricebrk4") ? decimal.Zero : row.Field<decimal>("slpricebrk4");
         entity.slpricebrk5 = row.IsNull("slpricebrk5") ? decimal.Zero : row.Field<decimal>("slpricebrk5");
         entity.slpricebrk6 = row.IsNull("slpricebrk6") ? decimal.Zero : row.Field<decimal>("slpricebrk6");
         entity.slpricebrk7 = row.IsNull("slpricebrk7") ? decimal.Zero : row.Field<decimal>("slpricebrk7");
         entity.slpricebrk8 = row.IsNull("slpricebrk8") ? decimal.Zero : row.Field<decimal>("slpricebrk8");
         entity.slpricebrk9 = row.IsNull("slpricebrk9") ? decimal.Zero : row.Field<decimal>("slpricebrk9");
         entity.slqtybrk1 = row.IsNull("slqtybrk1") ? 0 : row.Field<int>("slqtybrk1");
         entity.slqtybrk2 = row.IsNull("slqtybrk2") ? 0 : row.Field<int>("slqtybrk2");
         entity.slqtybrk3 = row.IsNull("slqtybrk3") ? 0 : row.Field<int>("slqtybrk3");
         entity.slqtybrk4 = row.IsNull("slqtybrk4") ? 0 : row.Field<int>("slqtybrk4");
         entity.slqtybrk5 = row.IsNull("slqtybrk5") ? 0 : row.Field<int>("slqtybrk5");
         entity.slqtybrk6 = row.IsNull("slqtybrk6") ? 0 : row.Field<int>("slqtybrk6");
         entity.slqtybrk7 = row.IsNull("slqtybrk7") ? 0 : row.Field<int>("slqtybrk7");
         entity.slqtybrk8 = row.IsNull("slqtybrk8") ? 0 : row.Field<int>("slqtybrk8");
         entity.slxref3 = row.IsNull("slxref3") ? string.Empty : row.Field<string>("slxref3");
         entity.slxref4 = row.IsNull("slxref4") ? string.Empty : row.Field<string>("slxref4");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.idwdatapos = row.IsNull("idwdatapos") ? string.Empty : row.Field<string>("idwdatapos");
         entity.slunspsc = row.IsNull("slunspsc") ? string.Empty : row.Field<string>("slunspsc");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.rebatety = row.IsNull("rebatety") ? string.Empty : row.Field<string>("rebatety");
         entity.errorcd = row.IsNull("errorcd") ? string.Empty : row.Field<string>("errorcd");
         entity.holdcd = row.IsNull("holdcd") ? string.Empty : row.Field<string>("holdcd");
         entity.slprceffdt = row.Field<DateTime?>("slprceffdt");
         entity.slprcexpdt = row.Field<DateTime?>("slprcexpdt");
         entity.lastcostfor = row.IsNull("lastcostfor") ? decimal.Zero : row.Field<decimal>("lastcostfor");
         entity.rebatecost = row.IsNull("rebatecost") ? decimal.Zero : row.Field<decimal>("rebatecost");
         entity.pdscfl = row.Field<bool>("pdscfl");
         entity.pdsvfl = row.Field<bool>("pdsvfl");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.unitstnd = row.IsNull("unitstnd") ? string.Empty : row.Field<string>("unitstnd");
         entity.unitconv = row.IsNull("unitconv") ? decimal.Zero : row.Field<decimal>("unitconv");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.descrip3 = row.IsNull("descrip3") ? string.Empty : row.Field<string>("descrip3");
         entity.sldescrip3 = row.IsNull("sldescrip3") ? string.Empty : row.Field<string>("sldescrip3");
         entity.rowID = row.Field<byte[]>("sledRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSledBase(ref DataRow row, SledBase entity)
      {
         row.SetField("baseprice", entity.baseprice);
         row.SetField("cono", entity.cono);
         row.SetField("cubes", entity.cubes);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("icscfl", entity.icscfl);
         row.SetField("icspfl", entity.icspfl);
         row.SetField("icswfl", entity.icswfl);
         row.SetField("imptype", entity.imptype);
         row.SetField("listprice", entity.listprice);
         row.SetField("lookupnm", entity.lookupnm);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("operinit", entity.operinit);
         row.SetField("priceonty", entity.priceonty);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("prod", entity.prod);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodline", entity.prodline);
         row.SetField("replcost", entity.replcost);
         row.SetField("seqno", entity.seqno);
         row.SetField("slaltprod", entity.slaltprod);
         row.SetField("slcat", entity.slcat);
         row.SetField("slcost", entity.slcost);
         row.SetField("slcsunperstk", entity.slcsunperstk);
         row.SetField("slcurrencyty", entity.slcurrencyty);
         row.SetField("sldescrip1", entity.sldescrip1);
         row.SetField("sldescrip2", entity.sldescrip2);
         row.SetField("sleditfl", entity.sleditfl);
         row.SetField("slexchgrate1", entity.slexchgrate1);
         row.SetField("slexchgrate2", entity.slexchgrate2);
         row.SetField("slgroup", entity.slgroup);
         row.SetField("sllinecd", entity.sllinecd);
         row.SetField("sllist", entity.sllist);
         row.SetField("slmsdsfl", entity.slmsdsfl);
         row.SetField("slmsdssheetno", entity.slmsdssheetno);
         row.SetField("sloriginty", entity.sloriginty);
         row.SetField("slpbseqno", entity.slpbseqno);
         row.SetField("slprccostper", entity.slprccostper);
         row.SetField("slproduct", entity.slproduct);
         row.SetField("slspeccostty", entity.slspeccostty);
         row.SetField("slunit", entity.slunit);
         row.SetField("slupdtno", entity.slupdtno);
         row.SetField("slupdttype", entity.slupdttype);
         row.SetField("slvendcd", entity.slvendcd);
         row.SetField("slxref1", entity.slxref1);
         row.SetField("slxref2", entity.slxref2);
         row.SetField("statuscd", entity.statuscd);
         row.SetField("statustype", entity.statustype);
         row.SetField("stndcost", entity.stndcost);
         row.SetField("termspct", entity.termspct);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("unitstock", entity.unitstock);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("whse", entity.whse);
         row.SetField("weight", entity.weight);
         row.SetField("slsupersede", entity.slsupersede);
         row.SetField("effectdt", entity.effectdt);
         row.SetField("slcostbrk1", entity.slcostbrk1);
         row.SetField("slcostbrk2", entity.slcostbrk2);
         row.SetField("slcostbrk3", entity.slcostbrk3);
         row.SetField("slcostbrk4", entity.slcostbrk4);
         row.SetField("slcostbrk5", entity.slcostbrk5);
         row.SetField("slcostbrk6", entity.slcostbrk6);
         row.SetField("slcostbrk7", entity.slcostbrk7);
         row.SetField("slcostbrk8", entity.slcostbrk8);
         row.SetField("slcostbrk9", entity.slcostbrk9);
         row.SetField("slpricebrk1", entity.slpricebrk1);
         row.SetField("slpricebrk2", entity.slpricebrk2);
         row.SetField("slpricebrk3", entity.slpricebrk3);
         row.SetField("slpricebrk4", entity.slpricebrk4);
         row.SetField("slpricebrk5", entity.slpricebrk5);
         row.SetField("slpricebrk6", entity.slpricebrk6);
         row.SetField("slpricebrk7", entity.slpricebrk7);
         row.SetField("slpricebrk8", entity.slpricebrk8);
         row.SetField("slpricebrk9", entity.slpricebrk9);
         row.SetField("slqtybrk1", entity.slqtybrk1);
         row.SetField("slqtybrk2", entity.slqtybrk2);
         row.SetField("slqtybrk3", entity.slqtybrk3);
         row.SetField("slqtybrk4", entity.slqtybrk4);
         row.SetField("slqtybrk5", entity.slqtybrk5);
         row.SetField("slqtybrk6", entity.slqtybrk6);
         row.SetField("slqtybrk7", entity.slqtybrk7);
         row.SetField("slqtybrk8", entity.slqtybrk8);
         row.SetField("slxref3", entity.slxref3);
         row.SetField("slxref4", entity.slxref4);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("vendno", entity.vendno);
         row.SetField("idwdatapos", entity.idwdatapos);
         row.SetField("slunspsc", entity.slunspsc);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("rebatety", entity.rebatety);
         row.SetField("errorcd", entity.errorcd);
         row.SetField("holdcd", entity.holdcd);
         row.SetField("slprceffdt", entity.slprceffdt);
         row.SetField("slprcexpdt", entity.slprcexpdt);
         row.SetField("lastcostfor", entity.lastcostfor);
         row.SetField("rebatecost", entity.rebatecost);
         row.SetField("pdscfl", entity.pdscfl);
         row.SetField("pdsvfl", entity.pdsvfl);
         row.SetField("transproc", entity.transproc);
         row.SetField("unitstnd", entity.unitstnd);
         row.SetField("unitconv", entity.unitconv);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("descrip3", entity.descrip3);
         row.SetField("sldescrip3", entity.sldescrip3);
         row.SetField("sledRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, SledBase entity)
      {
         row.SetField("sledRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	