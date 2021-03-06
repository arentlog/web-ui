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
   /// Catalog
   /// </summary>
   [EntityType("Catalog","icsc.detail","")]
   public partial class IcscBase: ModelBase, IUserFields
   {

      /// <summary>
      /// Catalog #
      /// </summary>
      [BusContext(BusPart.Name),DrillbackParam("pk",1),Key,Order,StringValidationAttribute]
      public string catalog { get; set; }

      /// <summary>
      /// Vendor #
      /// </summary>
      [ID(2)]
      public decimal vendno { get; set; }

      /// <summary>
      /// Base Price
      /// </summary>
      public decimal baseprice { get; set; }

      /// <summary>
      /// List Price
      /// </summary>
      public decimal listprice { get; set; }

      /// <summary>
      /// Cost
      /// </summary>
      public decimal prodcost { get; set; }

      /// <summary>
      /// Stocking Units
      /// </summary>
      [StringValidationAttribute]
      public string unitstock { get; set; }

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
      /// Auto Pricing Type
      /// </summary>
      [StringValidationAttribute]
      public string autotype { get; set; }

      /// <summary>
      /// Description
      /// </summary>
      [BusContext(BusPart.Descr),StringValidationAttribute]
      public string descrip1 { get; set; }
      [StringValidationAttribute]
      public string descrip2 { get; set; }

      /// <summary>
      /// Weight
      /// </summary>
      public decimal weight { get; set; }

      /// <summary>
      /// Price Type
      /// </summary>
      [StringValidationAttribute]
      public string pricetype { get; set; }

      /// <summary>
      /// Multiplier
      /// </summary>
      [StringValidationAttribute]
      public string priceonty { get; set; }

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
      /// Notes
      /// </summary>
      [StringValidationAttribute]
      public string notesfl { get; set; }

      /// <summary>
      /// Cube
      /// </summary>
      public decimal cubes { get; set; }

      /// <summary>
      /// Last Change Date
      /// </summary>
      public DateTime? transdt { get; set; }

      /// <summary>
      /// Description for Key Structure
      /// </summary>
      [StringValidationAttribute]
      public string desckey { get; set; }

      /// <summary>
      /// Special Price/Cost Unit
      /// </summary>
      [StringValidationAttribute]
      public string prccostper { get; set; }

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
      /// Length
      /// </summary>
      public decimal length { get; set; }

      /// <summary>
      /// Width
      /// </summary>
      public decimal width { get; set; }

      /// <summary>
      /// External Web Page
      /// </summary>
      [StringValidationAttribute]
      public string webpageext { get; set; }

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
      /// Extended Type
      /// </summary>
      [StringValidationAttribute]
      public string serlottype { get; set; }

      /// <summary>
      /// Supplier Group
      /// </summary>
      [StringValidationAttribute]
      public string slgroup { get; set; }

      /// <summary>
      /// Price Book Sequence #
      /// </summary>
      public int pbseqno { get; set; }

      /// <summary>
      /// Last MSDS Change
      /// </summary>
      public DateTime? msdschgdt { get; set; }

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
      /// MSDS Sheet #
      /// </summary>
      [StringValidationAttribute]
      public string msdssheetno { get; set; }

      /// <summary>
      /// Terms Disc
      /// </summary>
      public bool termsdiscfl { get; set; }

      /// <summary>
      /// Terms Discount %
      /// </summary>
      public decimal termspct { get; set; }

      /// <summary>
      /// Standard
      /// </summary>
      public decimal stndcost { get; set; }

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
      /// Rebate Cost
      /// </summary>
      public decimal rebatecost { get; set; }

      /// <summary>
      /// Product Costing Code
      /// </summary>
      [StringValidationAttribute]
      public string pctcode { get; set; }

      /// <summary>
      /// MSDS Product
      /// </summary>
      public bool msdsfl { get; set; }

      /// <summary>
      /// Auto Update Code
      /// </summary>
      [StringValidationAttribute]
      public string autoupcd { get; set; }

      /// <summary>
      /// Height
      /// </summary>
      public decimal height { get; set; }

      /// <summary>
      /// WebPage
      /// </summary>
      [StringValidationAttribute]
      public string webpage { get; set; }

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
      /// Long Description
      /// </summary>
      [StringValidationAttribute]
      public string longdescrip { get; set; }

      /// <summary>
      /// Model Number
      /// </summary>
      [StringValidationAttribute]
      public string model { get; set; }

      /// <summary>
      /// Thumbnail Path
      /// </summary>
      [StringValidationAttribute]
      public string thumbnailPic { get; set; }

      /// <summary>
      /// catkeyindex1
      /// </summary>
      [StringValidationAttribute]
      public string catkeyindex1 { get; set; }
      [StringValidationAttribute]
      public string catkeyindex2 { get; set; }
      [StringValidationAttribute]
      public string catkeyindex3 { get; set; }
      [StringValidationAttribute]
      public string catkeyindex4 { get; set; }

      /// <summary>
      /// Auth Group List
      /// </summary>
      [StringValidationAttribute]
      public string authGrpList { get; set; }

      /// <summary>
      /// Vendor Product
      /// </summary>
      [StringValidationAttribute]
      public string vendprod { get; set; }

      /// <summary>
      /// Standard Pack
      /// </summary>
      [StringValidationAttribute]
      public string unitstnd { get; set; }

      /// <summary>
      /// Document Description
      /// </summary>
      [StringValidationAttribute]
      public string documentdescrip { get; set; }

      /// <summary>
      /// UNSPSC Code
      /// </summary>
      [StringValidationAttribute]
      public string unspsc { get; set; }

      /// <summary>
      /// Ext Product
      /// </summary>
      [StringValidationAttribute]
      public string extprod { get; set; }

      /// <summary>
      /// Trade Name
      /// </summary>
      [StringValidationAttribute]
      public string tradename { get; set; }

      /// <summary>
      /// Corp Id
      /// </summary>
      public int corpid { get; set; }

      /// <summary>
      /// Search Parameters
      /// </summary>
      [StringValidationAttribute]
      public string paramList { get; set; }

      /// <summary>
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string statustype { get; set; }

      /// <summary>
      /// Status Date
      /// </summary>
      public DateTime? statusdt { get; set; }

      /// <summary>
      /// Store Id
      /// </summary>
      public int storeid { get; set; }

      /// <summary>
      /// Manufacturer Number
      /// </summary>
      public int mfgNo { get; set; }

      /// <summary>
      /// Node List
      /// </summary>
      [StringValidationAttribute]
      public string nodeList { get; set; }

      /// <summary>
      /// Batch
      /// </summary>
      [StringValidationAttribute]
      public string ecbatchnm { get; set; }

      /// <summary>
      /// SL Update Date
      /// </summary>
      public DateTime? slchgdt { get; set; }

      /// <summary>
      /// Extended Description
      /// </summary>
      [StringValidationAttribute]
      public string descrip3 { get; set; }

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
      /// Row Pointer
      /// </summary>
      [StringValidationAttribute]
      public string rowpointer { get; set; }

      /// <summary>
      /// Intrastat Commodity Code
      /// </summary>
      [StringValidationAttribute]
      public string commoditycd { get; set; }

      /// <summary>
      /// Intrastat Net Mass
      /// </summary>
      public decimal netmassamt { get; set; }

      /// <summary>
      /// Intrastat Supplementary Units
      /// </summary>
      public decimal usesuppunits { get; set; }

      /// <summary>
      /// Manufacturer Product
      /// </summary>
      [StringValidationAttribute]
      public string mfgprod { get; set; }

      /// <summary>
      /// Brand Code
      /// </summary>
      [StringValidationAttribute]
      public string brandcode { get; set; }

      /// <summary>
      /// Accept OE
      /// </summary>
      public bool acceptoefl { get; set; }

      /// <summary>
      /// Inv Status
      /// </summary>
      [StringValidationAttribute]
      public string inventorystatus { get; set; }

      /// <summary>
      /// NCNR
      /// </summary>
      [StringValidationAttribute]
      public string ncnr { get; set; }

      /// <summary>
      /// ECCN
      /// </summary>
      [StringValidationAttribute]
      public string eccnclasscd { get; set; }

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
      /// Product Tier
      /// </summary>
      [StringValidationAttribute]
      public string prodtier { get; set; }

      /// <summary>
      /// Alternate Product Group
      /// </summary>
      [StringValidationAttribute]
      public string altprodgrp { get; set; }

      /// <summary>
      /// Alt Product Price Code
      /// </summary>
      [StringValidationAttribute]
      public string altprodprccd { get; set; }

      /// <summary>
      /// Product Preference
      /// </summary>
      [StringValidationAttribute]
      public string prodpreference { get; set; }

      /// <summary>
      /// Product Tier Group
      /// </summary>
      [StringValidationAttribute]
      public string prodtiergrp { get; set; }

      /// <summary>
      /// transdttmz
      /// </summary>
      public DateTime? transdttmz { get; set; }

      /// <summary>
      /// Model Number
      /// </summary>
      [StringValidationAttribute]
      public string modelcode { get; set; }

      /// <summary>
      /// Taxation Weight
      /// </summary>
      public decimal taxweight { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildIcscBaseFromRow<T>(DataRow row) where T:IcscBase, new()
      {
         T entity = new T();
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.catalog = row.IsNull("catalog") ? string.Empty : row.Field<string>("catalog");
         entity.baseprice = row.IsNull("baseprice") ? decimal.Zero : row.Field<decimal>("baseprice");
         entity.listprice = row.IsNull("listprice") ? decimal.Zero : row.Field<decimal>("listprice");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.unitstock = row.IsNull("unitstock") ? string.Empty : row.Field<string>("unitstock");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.autotype = row.IsNull("autotype") ? string.Empty : row.Field<string>("autotype");
         entity.descrip1 = row.IsNull("descrip1") ? string.Empty : row.Field<string>("descrip1");
         entity.descrip2 = row.IsNull("descrip2") ? string.Empty : row.Field<string>("descrip2");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.priceonty = row.IsNull("priceonty") ? string.Empty : row.Field<string>("priceonty");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.transdt = row.Field<DateTime?>("transdt");
         entity.desckey = row.IsNull("desckey") ? string.Empty : row.Field<string>("desckey");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.length = row.IsNull("length") ? decimal.Zero : row.Field<decimal>("length");
         entity.width = row.IsNull("width") ? decimal.Zero : row.Field<decimal>("width");
         entity.webpageext = row.IsNull("webpageext") ? string.Empty : row.Field<string>("webpageext");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.rebatety = row.IsNull("rebatety") ? string.Empty : row.Field<string>("rebatety");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.slgroup = row.IsNull("slgroup") ? string.Empty : row.Field<string>("slgroup");
         entity.pbseqno = row.IsNull("pbseqno") ? 0 : row.Field<int>("pbseqno");
         entity.msdschgdt = row.Field<DateTime?>("msdschgdt");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.msdssheetno = row.IsNull("msdssheetno") ? string.Empty : row.Field<string>("msdssheetno");
         entity.termsdiscfl = row.Field<bool>("termsdiscfl");
         entity.termspct = row.IsNull("termspct") ? decimal.Zero : row.Field<decimal>("termspct");
         entity.stndcost = row.IsNull("stndcost") ? decimal.Zero : row.Field<decimal>("stndcost");
         entity.transtm = row.IsNull("transtm") ? string.Empty : row.Field<string>("transtm");
         entity.operinit = row.IsNull("operinit") ? string.Empty : row.Field<string>("operinit");
         entity.rebatecost = row.IsNull("rebatecost") ? decimal.Zero : row.Field<decimal>("rebatecost");
         entity.pctcode = row.IsNull("pctcode") ? string.Empty : row.Field<string>("pctcode");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.autoupcd = row.IsNull("autoupcd") ? string.Empty : row.Field<string>("autoupcd");
         entity.height = row.IsNull("height") ? decimal.Zero : row.Field<decimal>("height");
         entity.webpage = row.IsNull("webpage") ? string.Empty : row.Field<string>("webpage");
         entity.icspecrecno = row.IsNull("icspecrecno") ? 0 : row.Field<int>("icspecrecno");
         entity.transproc = row.IsNull("transproc") ? string.Empty : row.Field<string>("transproc");
         entity.longdescrip = row.IsNull("longdescrip") ? string.Empty : row.Field<string>("longdescrip");
         entity.model = row.IsNull("Model") ? string.Empty : row.Field<string>("Model");
         entity.thumbnailPic = row.IsNull("ThumbnailPic") ? string.Empty : row.Field<string>("ThumbnailPic");
         entity.catkeyindex1 = row.IsNull("catkeyindex1") ? string.Empty : row.Field<string>("catkeyindex1");
         entity.catkeyindex2 = row.IsNull("catkeyindex2") ? string.Empty : row.Field<string>("catkeyindex2");
         entity.catkeyindex3 = row.IsNull("catkeyindex3") ? string.Empty : row.Field<string>("catkeyindex3");
         entity.catkeyindex4 = row.IsNull("catkeyindex4") ? string.Empty : row.Field<string>("catkeyindex4");
         entity.authGrpList = row.IsNull("AuthGrpList") ? string.Empty : row.Field<string>("AuthGrpList");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.unitstnd = row.IsNull("unitstnd") ? string.Empty : row.Field<string>("unitstnd");
         entity.documentdescrip = row.IsNull("documentdescrip") ? string.Empty : row.Field<string>("documentdescrip");
         entity.unspsc = row.IsNull("unspsc") ? string.Empty : row.Field<string>("unspsc");
         entity.extprod = row.IsNull("extprod") ? string.Empty : row.Field<string>("extprod");
         entity.tradename = row.IsNull("tradename") ? string.Empty : row.Field<string>("tradename");
         entity.corpid = row.IsNull("corpid") ? 0 : row.Field<int>("corpid");
         entity.paramList = row.IsNull("param-list") ? string.Empty : row.Field<string>("param-list");
         entity.statustype = row.IsNull("statustype") ? string.Empty : row.Field<string>("statustype");
         entity.statusdt = row.Field<DateTime?>("statusdt");
         entity.storeid = row.IsNull("storeid") ? 0 : row.Field<int>("storeid");
         entity.mfgNo = row.IsNull("mfg-no") ? 0 : row.Field<int>("mfg-no");
         entity.nodeList = row.IsNull("node-list") ? string.Empty : row.Field<string>("node-list");
         entity.ecbatchnm = row.IsNull("ecbatchnm") ? string.Empty : row.Field<string>("ecbatchnm");
         entity.slchgdt = row.Field<DateTime?>("slchgdt");
         entity.descrip3 = row.IsNull("descrip3") ? string.Empty : row.Field<string>("descrip3");
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
         entity.rowpointer = row.IsNull("rowpointer") ? string.Empty : row.Field<string>("rowpointer");
         entity.commoditycd = row.IsNull("commoditycd") ? string.Empty : row.Field<string>("commoditycd");
         entity.netmassamt = row.IsNull("netmassamt") ? decimal.Zero : row.Field<decimal>("netmassamt");
         entity.usesuppunits = row.IsNull("usesuppunits") ? decimal.Zero : row.Field<decimal>("usesuppunits");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.acceptoefl = row.Field<bool>("acceptoefl");
         entity.inventorystatus = row.IsNull("inventorystatus") ? string.Empty : row.Field<string>("inventorystatus");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.eccnclasscd = row.IsNull("eccnclasscd") ? string.Empty : row.Field<string>("eccnclasscd");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.prodtier = row.IsNull("prodtier") ? string.Empty : row.Field<string>("prodtier");
         entity.altprodgrp = row.IsNull("altprodgrp") ? string.Empty : row.Field<string>("altprodgrp");
         entity.altprodprccd = row.IsNull("altprodprccd") ? string.Empty : row.Field<string>("altprodprccd");
         entity.prodpreference = row.IsNull("prodpreference") ? string.Empty : row.Field<string>("prodpreference");
         entity.prodtiergrp = row.IsNull("prodtiergrp") ? string.Empty : row.Field<string>("prodtiergrp");
         entity.transdttmz = row.Field<DateTime?>("transdttmz");
         entity.modelcode = row.IsNull("modelcode") ? string.Empty : row.Field<string>("modelcode");
         entity.taxweight = row.IsNull("taxweight") ? decimal.Zero : row.Field<decimal>("taxweight");
         entity.rowID = row.Field<byte[]>("icscRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcscBase(ref DataRow row, IcscBase entity)
      {
         row.SetField("vendno", entity.vendno);
         row.SetField("catalog", entity.catalog);
         row.SetField("baseprice", entity.baseprice);
         row.SetField("listprice", entity.listprice);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("unitstock", entity.unitstock);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodline", entity.prodline);
         row.SetField("autotype", entity.autotype);
         row.SetField("descrip1", entity.descrip1);
         row.SetField("descrip2", entity.descrip2);
         row.SetField("weight", entity.weight);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("priceonty", entity.priceonty);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("cubes", entity.cubes);
         row.SetField("transdt", entity.transdt);
         row.SetField("desckey", entity.desckey);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("length", entity.length);
         row.SetField("width", entity.width);
         row.SetField("webpageext", entity.webpageext);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("rebatety", entity.rebatety);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("slgroup", entity.slgroup);
         row.SetField("pbseqno", entity.pbseqno);
         row.SetField("msdschgdt", entity.msdschgdt);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("msdssheetno", entity.msdssheetno);
         row.SetField("termsdiscfl", entity.termsdiscfl);
         row.SetField("termspct", entity.termspct);
         row.SetField("stndcost", entity.stndcost);
         row.SetField("transtm", entity.transtm);
         row.SetField("operinit", entity.operinit);
         row.SetField("rebatecost", entity.rebatecost);
         row.SetField("pctcode", entity.pctcode);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("autoupcd", entity.autoupcd);
         row.SetField("height", entity.height);
         row.SetField("webpage", entity.webpage);
         row.SetField("icspecrecno", entity.icspecrecno);
         row.SetField("transproc", entity.transproc);
         row.SetField("longdescrip", entity.longdescrip);
         row.SetField("Model", entity.model);
         row.SetField("ThumbnailPic", entity.thumbnailPic);
         row.SetField("catkeyindex1", entity.catkeyindex1);
         row.SetField("catkeyindex2", entity.catkeyindex2);
         row.SetField("catkeyindex3", entity.catkeyindex3);
         row.SetField("catkeyindex4", entity.catkeyindex4);
         row.SetField("AuthGrpList", entity.authGrpList);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("unitstnd", entity.unitstnd);
         row.SetField("documentdescrip", entity.documentdescrip);
         row.SetField("unspsc", entity.unspsc);
         row.SetField("extprod", entity.extprod);
         row.SetField("tradename", entity.tradename);
         row.SetField("corpid", entity.corpid);
         row.SetField("param-list", entity.paramList);
         row.SetField("statustype", entity.statustype);
         row.SetField("statusdt", entity.statusdt);
         row.SetField("storeid", entity.storeid);
         row.SetField("mfg-no", entity.mfgNo);
         row.SetField("node-list", entity.nodeList);
         row.SetField("ecbatchnm", entity.ecbatchnm);
         row.SetField("slchgdt", entity.slchgdt);
         row.SetField("descrip3", entity.descrip3);
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
         row.SetField("rowpointer", entity.rowpointer);
         row.SetField("commoditycd", entity.commoditycd);
         row.SetField("netmassamt", entity.netmassamt);
         row.SetField("usesuppunits", entity.usesuppunits);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("acceptoefl", entity.acceptoefl);
         row.SetField("inventorystatus", entity.inventorystatus);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("eccnclasscd", entity.eccnclasscd);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("prodtier", entity.prodtier);
         row.SetField("altprodgrp", entity.altprodgrp);
         row.SetField("altprodprccd", entity.altprodprccd);
         row.SetField("prodpreference", entity.prodpreference);
         row.SetField("prodtiergrp", entity.prodtiergrp);
         row.SetField("transdttmz", entity.transdttmz);
         row.SetField("modelcode", entity.modelcode);
         row.SetField("taxweight", entity.taxweight);
         row.SetField("icscRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, IcscBase entity)
      {
         row.SetField("catalog", entity.catalog);
         row.SetField("icscRowID", entity.rowID.ToByteArray());
         row.SetField("rowpointer", entity.rowpointer);

      }   
   }
}
#pragma warning restore 1591
	