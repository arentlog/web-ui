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
   /// PD Customer Pricing
   /// </summary>
   [EntityType("PD Customer Pricing","pdsp.customerDetail","")]
   public partial class PdscBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Company #
      /// </summary>
      [BusContext(BusPart.AcctEntity),Key,Order]
      public int cono { get; set; }

      /// <summary>
      /// Customer #
      /// </summary>
      [Key,Order]
      public decimal custno { get; set; }

      /// <summary>
      /// Cust Price Type
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string custtype { get; set; }

      /// <summary>
      /// Whse
      /// </summary>
      [BusContext(BusPart.Location),BusContext(BusPart.Name),Key,Order,StringValidationAttribute]
      public string whse { get; set; }

      /// <summary>
      /// Unit
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string units { get; set; }

      /// <summary>
      /// Begin Date
      /// </summary>
      [Key,Order]
      public DateTime? startdt { get; set; }

      /// <summary>
      /// Product
      /// </summary>
      [BusContext(BusPart.Descr),Key,Order,StringValidationAttribute]
      public string prod { get; set; }

      /// <summary>
      /// Level
      /// </summary>
      [Key,Order]
      public int levelcd { get; set; }

      /// <summary>
      /// End Date
      /// </summary>
      public DateTime? enddt { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      public bool statustype { get; set; }

      /// <summary>
      /// Reference
      /// </summary>
      [StringValidationAttribute]
      public string refer { get; set; }

      /// <summary>
      /// Comm Type
      /// </summary>
      [StringValidationAttribute]
      public string commtype { get; set; }

      /// <summary>
      /// Minimum Qty
      /// </summary>
      public decimal minqty { get; set; }

      /// <summary>
      /// Maximum Qty
      /// </summary>
      public decimal maxqty { get; set; }

      /// <summary>
      /// Actual Qty
      /// </summary>
      public decimal actqty { get; set; }

      /// <summary>
      /// Pricing- Round
      /// </summary>
      [StringValidationAttribute]
      public string pround { get; set; }

      /// <summary>
      /// Qty Brk Per
      /// </summary>
      [StringValidationAttribute]
      public string qtytype { get; set; }

      /// <summary>
      /// Tgt
      /// </summary>
      public int ptarget { get; set; }

      /// <summary>
      /// User Tgt
      /// </summary>
      public decimal pexactrnd { get; set; }

      /// <summary>
      /// Price Level
      /// </summary>
      public bool prctype { get; set; }

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
      /// Last CCYYMM for Qty
      /// </summary>
      [StringValidationAttribute]
      public string qtyyymm { get; set; }

      /// <summary>
      /// PD#
      /// </summary>
      public int pdrecno { get; set; }

      /// <summary>
      /// Order Discount Based On
      /// </summary>
      [StringValidationAttribute]
      public string disctype { get; set; }

      /// <summary>
      /// Discount
      /// </summary>
      public decimal prcdisc1 { get; set; }
      public decimal prcdisc2 { get; set; }
      public decimal prcdisc3 { get; set; }
      public decimal prcdisc4 { get; set; }
      public decimal prcdisc5 { get; set; }
      public decimal prcdisc6 { get; set; }
      public decimal prcdisc7 { get; set; }
      public decimal prcdisc8 { get; set; }
      public decimal prcdisc9 { get; set; }

      /// <summary>
      /// Price
      /// </summary>
      public decimal prcmult1 { get; set; }
      public decimal prcmult2 { get; set; }
      public decimal prcmult3 { get; set; }
      public decimal prcmult4 { get; set; }
      public decimal prcmult5 { get; set; }
      public decimal prcmult6 { get; set; }
      public decimal prcmult7 { get; set; }
      public decimal prcmult8 { get; set; }
      public decimal prcmult9 { get; set; }

      /// <summary>
      /// Quote
      /// </summary>
      public bool quotefl { get; set; }

      /// <summary>
      /// Pricing Cost Type
      /// </summary>
      [StringValidationAttribute]
      public string pricecostty { get; set; }

      /// <summary>
      /// Qty
      /// </summary>
      public int qtybrk1 { get; set; }
      public int qtybrk2 { get; set; }
      public int qtybrk3 { get; set; }
      public int qtybrk4 { get; set; }
      public int qtybrk5 { get; set; }
      public int qtybrk6 { get; set; }
      public int qtybrk7 { get; set; }
      public int qtybrk8 { get; set; }

      /// <summary>
      /// Contract Number
      /// </summary>
      [StringValidationAttribute]
      public string contractNo { get; set; }

      /// <summary>
      /// Promotional
      /// </summary>
      public bool promofl { get; set; }

      /// <summary>
      /// Price Sheet
      /// </summary>
      [StringValidationAttribute]
      public string priceSheet { get; set; }

      /// <summary>
      /// Qty Brk On
      /// </summary>
      [StringValidationAttribute]
      public string qtybreakty { get; set; }

      /// <summary>
      /// Quote
      /// </summary>
      [StringValidationAttribute]
      public string quoteno { get; set; }

      /// <summary>
      /// Line Refer
      /// </summary>
      [StringValidationAttribute]
      public string jobno { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Price Effective
      /// </summary>
      public DateTime? priceEffectiveDate { get; set; }

      /// <summary>
      /// Terms Disc
      /// </summary>
      public bool termsdiscfl { get; set; }

      /// <summary>
      /// Terms Discount %
      /// </summary>
      public decimal termspct { get; set; }

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
      /// Price Method
      /// </summary>
      [StringValidationAttribute]
      public string pricety { get; set; }

      /// <summary>
      /// User 3
      /// </summary>
      [StringValidationAttribute]
      public string user3 { get; set; }

      /// <summary>
      /// Multiplier
      /// </summary>
      [StringValidationAttribute]
      public string priceonty { get; set; }

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
      /// Trans Proc
      /// </summary>
      [StringValidationAttribute]
      public string transproc { get; set; }

      /// <summary>
      /// SL Update Date
      /// </summary>
      public DateTime? slchgdt { get; set; }

      /// <summary>
      /// Modifier Identifier
      /// </summary>
      [StringValidationAttribute]
      public string modifiernm { get; set; }

      /// <summary>
      /// Allow With Line Rebate
      /// </summary>
      public bool modifierrebfl { get; set; }

      /// <summary>
      /// Hard Max Qty?
      /// </summary>
      public bool hardmaxqtyfl { get; set; }

      /// <summary>
      /// Max Based On
      /// </summary>
      [StringValidationAttribute]
      public string maxqtytype { get; set; }

      /// <summary>
      /// Hard Price
      /// </summary>
      public bool hardpricefl { get; set; }

      /// <summary>
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// Last Used Date
      /// </summary>
      public DateTime? lastuseddt { get; set; }

      /// <summary>
      /// Override Percent Up
      /// </summary>
      public decimal ovrridepctup { get; set; }

      /// <summary>
      /// Override Pct Down
      /// </summary>
      public decimal ovrridepctdown { get; set; }

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
      public static T BuildPdscBaseFromRow<T>(DataRow row) where T:PdscBase, new()
      {
         T entity = new T();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custtype = row.IsNull("custtype") ? string.Empty : row.Field<string>("custtype");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.units = row.IsNull("units") ? string.Empty : row.Field<string>("units");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.statustype = row.Field<bool>("statustype");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.commtype = row.IsNull("commtype") ? string.Empty : row.Field<string>("commtype");
         entity.minqty = row.IsNull("minqty") ? decimal.Zero : row.Field<decimal>("minqty");
         entity.maxqty = row.IsNull("maxqty") ? decimal.Zero : row.Field<decimal>("maxqty");
         entity.actqty = row.IsNull("actqty") ? decimal.Zero : row.Field<decimal>("actqty");
         entity.pround = row.IsNull("pround") ? string.Empty : row.Field<string>("pround");
         entity.qtytype = row.IsNull("qtytype") ? string.Empty : row.Field<string>("qtytype");
         entity.ptarget = row.IsNull("ptarget") ? 0 : row.Field<int>("ptarget");
         entity.pexactrnd = row.IsNull("pexactrnd") ? decimal.Zero : row.Field<decimal>("pexactrnd");
         entity.prctype = row.Field<bool>("prctype");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.qtyyymm = row.IsNull("qtyyymm") ? string.Empty : row.Field<string>("qtyyymm");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.pdrecno = row.IsNull("pdrecno") ? 0 : row.Field<int>("pdrecno");
         entity.disctype = row.IsNull("disctype") ? string.Empty : row.Field<string>("disctype");
         entity.levelcd = row.IsNull("levelcd") ? 0 : row.Field<int>("levelcd");
         entity.prcdisc1 = row.IsNull("prcdisc1") ? decimal.Zero : row.Field<decimal>("prcdisc1");
         entity.prcdisc2 = row.IsNull("prcdisc2") ? decimal.Zero : row.Field<decimal>("prcdisc2");
         entity.prcdisc3 = row.IsNull("prcdisc3") ? decimal.Zero : row.Field<decimal>("prcdisc3");
         entity.prcdisc4 = row.IsNull("prcdisc4") ? decimal.Zero : row.Field<decimal>("prcdisc4");
         entity.prcdisc5 = row.IsNull("prcdisc5") ? decimal.Zero : row.Field<decimal>("prcdisc5");
         entity.prcdisc6 = row.IsNull("prcdisc6") ? decimal.Zero : row.Field<decimal>("prcdisc6");
         entity.prcdisc7 = row.IsNull("prcdisc7") ? decimal.Zero : row.Field<decimal>("prcdisc7");
         entity.prcdisc8 = row.IsNull("prcdisc8") ? decimal.Zero : row.Field<decimal>("prcdisc8");
         entity.prcdisc9 = row.IsNull("prcdisc9") ? decimal.Zero : row.Field<decimal>("prcdisc9");
         entity.prcmult1 = row.IsNull("prcmult1") ? decimal.Zero : row.Field<decimal>("prcmult1");
         entity.prcmult2 = row.IsNull("prcmult2") ? decimal.Zero : row.Field<decimal>("prcmult2");
         entity.prcmult3 = row.IsNull("prcmult3") ? decimal.Zero : row.Field<decimal>("prcmult3");
         entity.prcmult4 = row.IsNull("prcmult4") ? decimal.Zero : row.Field<decimal>("prcmult4");
         entity.prcmult5 = row.IsNull("prcmult5") ? decimal.Zero : row.Field<decimal>("prcmult5");
         entity.prcmult6 = row.IsNull("prcmult6") ? decimal.Zero : row.Field<decimal>("prcmult6");
         entity.prcmult7 = row.IsNull("prcmult7") ? decimal.Zero : row.Field<decimal>("prcmult7");
         entity.prcmult8 = row.IsNull("prcmult8") ? decimal.Zero : row.Field<decimal>("prcmult8");
         entity.prcmult9 = row.IsNull("prcmult9") ? decimal.Zero : row.Field<decimal>("prcmult9");
         entity.quotefl = row.Field<bool>("quotefl");
         entity.pricecostty = row.IsNull("pricecostty") ? string.Empty : row.Field<string>("pricecostty");
         entity.qtybrk1 = row.IsNull("qtybrk1") ? 0 : row.Field<int>("qtybrk1");
         entity.qtybrk2 = row.IsNull("qtybrk2") ? 0 : row.Field<int>("qtybrk2");
         entity.qtybrk3 = row.IsNull("qtybrk3") ? 0 : row.Field<int>("qtybrk3");
         entity.qtybrk4 = row.IsNull("qtybrk4") ? 0 : row.Field<int>("qtybrk4");
         entity.qtybrk5 = row.IsNull("qtybrk5") ? 0 : row.Field<int>("qtybrk5");
         entity.qtybrk6 = row.IsNull("qtybrk6") ? 0 : row.Field<int>("qtybrk6");
         entity.qtybrk7 = row.IsNull("qtybrk7") ? 0 : row.Field<int>("qtybrk7");
         entity.qtybrk8 = row.IsNull("qtybrk8") ? 0 : row.Field<int>("qtybrk8");
         entity.contractNo = row.IsNull("ContractNo") ? string.Empty : row.Field<string>("ContractNo");
         entity.promofl = row.Field<bool>("promofl");
         entity.priceSheet = row.IsNull("PriceSheet") ? string.Empty : row.Field<string>("PriceSheet");
         entity.qtybreakty = row.IsNull("qtybreakty") ? string.Empty : row.Field<string>("qtybreakty");
         entity.quoteno = row.IsNull("quoteno") ? string.Empty : row.Field<string>("quoteno");
         entity.jobno = row.IsNull("jobno") ? string.Empty : row.Field<string>("jobno");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.priceEffectiveDate = row.Field<DateTime?>("PriceEffectiveDate");
         entity.termsdiscfl = row.Field<bool>("termsdiscfl");
         entity.termspct = row.IsNull("termspct") ? decimal.Zero : row.Field<decimal>("termspct");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.pricety = row.IsNull("pricety") ? string.Empty : row.Field<string>("pricety");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.priceonty = row.IsNull("priceonty") ? string.Empty : row.Field<string>("priceonty");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.slchgdt = row.Field<DateTime?>("slchgdt");
         entity.modifiernm = row.IsNull("modifiernm") ? string.Empty : row.Field<string>("modifiernm");
         entity.modifierrebfl = row.Field<bool>("modifierrebfl");
         entity.hardmaxqtyfl = row.Field<bool>("hardmaxqtyfl");
         entity.maxqtytype = row.IsNull("maxqtytype") ? string.Empty : row.Field<string>("maxqtytype");
         entity.hardpricefl = row.Field<bool>("hardpricefl");
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.lastuseddt = row.Field<DateTime?>("lastuseddt");
         entity.ovrridepctup = row.IsNull("ovrridepctup") ? decimal.Zero : row.Field<decimal>("ovrridepctup");
         entity.ovrridepctdown = row.IsNull("ovrridepctdown") ? decimal.Zero : row.Field<decimal>("ovrridepctdown");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.rowID = row.Field<byte[]>("pdscRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdscBase(ref DataRow row, PdscBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("custtype", entity.custtype);
         row.SetField("whse", entity.whse);
         row.SetField("units", entity.units);
         row.SetField("startdt", entity.startdt);
         row.SetField("enddt", entity.enddt);
         row.SetField("statustype", entity.statustype);
         row.SetField("refer", entity.refer);
         row.SetField("commtype", entity.commtype);
         row.SetField("minqty", entity.minqty);
         row.SetField("maxqty", entity.maxqty);
         row.SetField("actqty", entity.actqty);
         row.SetField("pround", entity.pround);
         row.SetField("qtytype", entity.qtytype);
         row.SetField("ptarget", entity.ptarget);
         row.SetField("pexactrnd", entity.pexactrnd);
         row.SetField("prctype", entity.prctype);
         row.SetField("operinit", entity.operinit);
         row.SetField("transdt", entity.transdt);
         row.SetField("transtm", entity.transtm);
         row.SetField("qtyyymm", entity.qtyyymm);
         row.SetField("prod", entity.prod);
         row.SetField("pdrecno", entity.pdrecno);
         row.SetField("disctype", entity.disctype);
         row.SetField("levelcd", entity.levelcd);
         row.SetField("prcdisc1", entity.prcdisc1);
         row.SetField("prcdisc2", entity.prcdisc2);
         row.SetField("prcdisc3", entity.prcdisc3);
         row.SetField("prcdisc4", entity.prcdisc4);
         row.SetField("prcdisc5", entity.prcdisc5);
         row.SetField("prcdisc6", entity.prcdisc6);
         row.SetField("prcdisc7", entity.prcdisc7);
         row.SetField("prcdisc8", entity.prcdisc8);
         row.SetField("prcdisc9", entity.prcdisc9);
         row.SetField("prcmult1", entity.prcmult1);
         row.SetField("prcmult2", entity.prcmult2);
         row.SetField("prcmult3", entity.prcmult3);
         row.SetField("prcmult4", entity.prcmult4);
         row.SetField("prcmult5", entity.prcmult5);
         row.SetField("prcmult6", entity.prcmult6);
         row.SetField("prcmult7", entity.prcmult7);
         row.SetField("prcmult8", entity.prcmult8);
         row.SetField("prcmult9", entity.prcmult9);
         row.SetField("quotefl", entity.quotefl);
         row.SetField("pricecostty", entity.pricecostty);
         row.SetField("qtybrk1", entity.qtybrk1);
         row.SetField("qtybrk2", entity.qtybrk2);
         row.SetField("qtybrk3", entity.qtybrk3);
         row.SetField("qtybrk4", entity.qtybrk4);
         row.SetField("qtybrk5", entity.qtybrk5);
         row.SetField("qtybrk6", entity.qtybrk6);
         row.SetField("qtybrk7", entity.qtybrk7);
         row.SetField("qtybrk8", entity.qtybrk8);
         row.SetField("ContractNo", entity.contractNo);
         row.SetField("promofl", entity.promofl);
         row.SetField("PriceSheet", entity.priceSheet);
         row.SetField("qtybreakty", entity.qtybreakty);
         row.SetField("quoteno", entity.quoteno);
         row.SetField("jobno", entity.jobno);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("PriceEffectiveDate", entity.priceEffectiveDate);
         row.SetField("termsdiscfl", entity.termsdiscfl);
         row.SetField("termspct", entity.termspct);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("pricety", entity.pricety);
         row.SetField("user3", entity.user3);
         row.SetField("priceonty", entity.priceonty);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("transproc", entity.transproc);
         row.SetField("slchgdt", entity.slchgdt);
         row.SetField("modifiernm", entity.modifiernm);
         row.SetField("modifierrebfl", entity.modifierrebfl);
         row.SetField("hardmaxqtyfl", entity.hardmaxqtyfl);
         row.SetField("maxqtytype", entity.maxqtytype);
         row.SetField("hardpricefl", entity.hardpricefl);
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("lastuseddt", entity.lastuseddt);
         row.SetField("ovrridepctup", entity.ovrridepctup);
         row.SetField("ovrridepctdown", entity.ovrridepctdown);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("pdscRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, PdscBase entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("custno", entity.custno);
         row.SetField("custtype", entity.custtype);
         row.SetField("whse", entity.whse);
         row.SetField("units", entity.units);
         row.SetField("startdt", entity.startdt);
         row.SetField("prod", entity.prod);
         row.SetField("levelcd", entity.levelcd);
         row.SetField("pdscRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	