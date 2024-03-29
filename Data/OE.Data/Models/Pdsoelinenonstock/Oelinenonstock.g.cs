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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinenonstock
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinenonstock.Oelinenonstock")]
   public partial class Oelinenonstock : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      public bool prodenabled { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      public bool proddescenabled { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public bool prodcatenabled { get; set; }
      public decimal price { get; set; }
      public bool priceenabled { get; set; }
      public bool pricehidden { get; set; }
      public decimal discamt { get; set; }
      public bool discamtenabled { get; set; }
      public bool discamthidden { get; set; }
      public bool disctype { get; set; }
      public bool disctypeenabled { get; set; }
      public bool disctypehidden { get; set; }
      [StringValidationAttribute]
      public string pricetype { get; set; }
      public bool pricetypeenabled { get; set; }
      public decimal prodcost { get; set; }
      public bool prodcostenabled { get; set; }
      public bool prodcosthidden { get; set; }
      [StringValidationAttribute]
      public string commtype { get; set; }
      public bool commtypeenabled { get; set; }
      public bool kitfl { get; set; }
      public bool kitflenabled { get; set; }
      [StringValidationAttribute]
      public string kitrollty { get; set; }
      public bool kitrolltyenabled { get; set; }
      public decimal foreigncost { get; set; }
      public bool foreigncosthidden { get; set; }
      public decimal exchangerate { get; set; }
      public bool exchangeratehidden { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      public bool currencytyhidden { get; set; }
      [StringValidationAttribute]
      public string currencytyshort { get; set; }
      public bool currencytyshorthidden { get; set; }
      public bool calculatebuttonenabled { get; set; }
      public bool calculatebuttonhidden { get; set; }
      public bool bofl { get; set; }
      public bool boflenabledfl { get; set; }
      public bool createpofl { get; set; }
      public bool createpoflenabled { get; set; }
      [StringValidationAttribute]
      public string itemtype { get; set; }
      public bool itemtypeenabled { get; set; }
      [StringValidationAttribute]
      public string itemtypevaluesdesc { get; set; }
      [StringValidationAttribute]
      public string itemtypevaluescode { get; set; }
      public bool rushfl { get; set; }
      public bool rushflenabled { get; set; }
      public bool copycommentfl { get; set; }
      public bool copycommentflenabled { get; set; }
      public decimal vendno { get; set; }
      public bool vendnoenabled { get; set; }
      [StringValidationAttribute]
      public string vendname { get; set; }
      [StringValidationAttribute]
      public string arpwhse { get; set; }
      public bool arpwhseenabled { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public bool prodlineenabled { get; set; }
      public decimal stkqtyavail { get; set; }
      public bool stkqtyavailhidden { get; set; }
      public decimal nsqtyavail { get; set; }
      public bool nsqtyavailhidden { get; set; }
      public bool defaultbuttonenabled { get; set; }
      public bool defaultbuttonhidden { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      public bool ncnrenabled { get; set; }
      [StringValidationAttribute]
      public string eccnclasscd { get; set; }
      public bool eccnallowblankfl { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      public bool pricefound { get; set; }
      [StringValidationAttribute]
      public string promoacceptcd { get; set; }
      public decimal promoprice { get; set; }
      public decimal nonpromoprice { get; set; }
      [StringValidationAttribute]
      public string botype { get; set; }
      public decimal vvendno { get; set; }
      public bool powtnew { get; set; }
      [StringValidationAttribute]
      public string ordertype { get; set; }
      public int orderaltno { get; set; }
      public bool powtintfl { get; set; }
      public int vshipfmno { get; set; }
      [StringValidationAttribute]
      public string vshipviaty { get; set; }
      [StringValidationAttribute]
      public string vfrttermscd { get; set; }
      [StringValidationAttribute]
      public string vtransferloc { get; set; }
      [StringValidationAttribute]
      public string vfrtbillacct { get; set; }
      public DateTime? vduedt { get; set; }
      public bool vfobfl { get; set; }
      [StringValidationAttribute]
      public string wwhse { get; set; }
      [StringValidationAttribute]
      public string wshipviaty { get; set; }
      public DateTime? wduedt { get; set; }
      public int leadtm { get; set; }
      public bool taxablefl { get; set; }
      [StringValidationAttribute]
      public string nontaxtype { get; set; }
      public int taxgroup { get; set; }
      [StringValidationAttribute]
      public string quesanswer { get; set; }
      [StringValidationAttribute]
      public string quesdescrip1 { get; set; }
      [StringValidationAttribute]
      public string quesdescrip2 { get; set; }
      [StringValidationAttribute]
      public string quespriceavail { get; set; }
      [StringValidationAttribute]
      public string quesprodcat { get; set; }
      [StringValidationAttribute]
      public string quesmessage { get; set; }
      [StringValidationAttribute]
      public string quesmsgmsds { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string serlottype { get; set; }
      [StringValidationAttribute]
      public string speccostty { get; set; }
      public decimal csunperstk { get; set; }
      [StringValidationAttribute]
      public string prccostper { get; set; }
      public bool nonstkaddfl { get; set; }
      public bool restrictovrfl { get; set; }
      [StringValidationAttribute]
      public string restricterrmess { get; set; }
      public bool altprodgrpfl { get; set; }
      public int altshipfmno { get; set; }
      public decimal altvendno { get; set; }
      [StringValidationAttribute]
      public string altprodline { get; set; }
      [StringValidationAttribute]
      public string altprodcat { get; set; }
      [StringValidationAttribute]
      public string altpricetype { get; set; }
      [StringValidationAttribute]
      public string altprodgrp { get; set; }
      [StringValidationAttribute]
      public string custprod { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinenonstock BuildOelinenonstockFromRow(DataRow row)
      {
         Oelinenonstock entity = new Oelinenonstock();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodenabled = row.Field<bool>("prodenabled");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.proddescenabled = row.Field<bool>("proddescenabled");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodcatenabled = row.Field<bool>("prodcatenabled");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.priceenabled = row.Field<bool>("priceenabled");
         entity.pricehidden = row.Field<bool>("pricehidden");
         entity.discamt = row.IsNull("discamt") ? decimal.Zero : row.Field<decimal>("discamt");
         entity.discamtenabled = row.Field<bool>("discamtenabled");
         entity.discamthidden = row.Field<bool>("discamthidden");
         entity.disctype = row.Field<bool>("disctype");
         entity.disctypeenabled = row.Field<bool>("disctypeenabled");
         entity.disctypehidden = row.Field<bool>("disctypehidden");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.pricetypeenabled = row.Field<bool>("pricetypeenabled");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.prodcostenabled = row.Field<bool>("prodcostenabled");
         entity.prodcosthidden = row.Field<bool>("prodcosthidden");
         entity.commtype = row.IsNull("commtype") ? string.Empty : row.Field<string>("commtype");
         entity.commtypeenabled = row.Field<bool>("commtypeenabled");
         entity.kitfl = row.Field<bool>("kitfl");
         entity.kitflenabled = row.Field<bool>("kitflenabled");
         entity.kitrollty = row.IsNull("kitrollty") ? string.Empty : row.Field<string>("kitrollty");
         entity.kitrolltyenabled = row.Field<bool>("kitrolltyenabled");
         entity.foreigncost = row.IsNull("foreigncost") ? decimal.Zero : row.Field<decimal>("foreigncost");
         entity.foreigncosthidden = row.Field<bool>("foreigncosthidden");
         entity.exchangerate = row.IsNull("exchangerate") ? decimal.Zero : row.Field<decimal>("exchangerate");
         entity.exchangeratehidden = row.Field<bool>("exchangeratehidden");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.currencytyhidden = row.Field<bool>("currencytyhidden");
         entity.currencytyshort = row.IsNull("currencytyshort") ? string.Empty : row.Field<string>("currencytyshort");
         entity.currencytyshorthidden = row.Field<bool>("currencytyshorthidden");
         entity.calculatebuttonenabled = row.Field<bool>("calculatebuttonenabled");
         entity.calculatebuttonhidden = row.Field<bool>("calculatebuttonhidden");
         entity.bofl = row.Field<bool>("bofl");
         entity.boflenabledfl = row.Field<bool>("boflenabledfl");
         entity.createpofl = row.Field<bool>("createpofl");
         entity.createpoflenabled = row.Field<bool>("createpoflenabled");
         entity.itemtype = row.IsNull("itemtype") ? string.Empty : row.Field<string>("itemtype");
         entity.itemtypeenabled = row.Field<bool>("itemtypeenabled");
         entity.itemtypevaluesdesc = row.IsNull("itemtypevaluesdesc") ? string.Empty : row.Field<string>("itemtypevaluesdesc");
         entity.itemtypevaluescode = row.IsNull("itemtypevaluescode") ? string.Empty : row.Field<string>("itemtypevaluescode");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.rushflenabled = row.Field<bool>("rushflenabled");
         entity.copycommentfl = row.Field<bool>("copycommentfl");
         entity.copycommentflenabled = row.Field<bool>("copycommentflenabled");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendnoenabled = row.Field<bool>("vendnoenabled");
         entity.vendname = row.IsNull("vendname") ? string.Empty : row.Field<string>("vendname");
         entity.arpwhse = row.IsNull("arpwhse") ? string.Empty : row.Field<string>("arpwhse");
         entity.arpwhseenabled = row.Field<bool>("arpwhseenabled");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodlineenabled = row.Field<bool>("prodlineenabled");
         entity.stkqtyavail = row.IsNull("stkqtyavail") ? decimal.Zero : row.Field<decimal>("stkqtyavail");
         entity.stkqtyavailhidden = row.Field<bool>("stkqtyavailhidden");
         entity.nsqtyavail = row.IsNull("nsqtyavail") ? decimal.Zero : row.Field<decimal>("nsqtyavail");
         entity.nsqtyavailhidden = row.Field<bool>("nsqtyavailhidden");
         entity.defaultbuttonenabled = row.Field<bool>("defaultbuttonenabled");
         entity.defaultbuttonhidden = row.Field<bool>("defaultbuttonhidden");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.ncnrenabled = row.Field<bool>("ncnrenabled");
         entity.eccnclasscd = row.IsNull("eccnclasscd") ? string.Empty : row.Field<string>("eccnclasscd");
         entity.eccnallowblankfl = row.Field<bool>("eccnallowblankfl");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.pricefound = row.Field<bool>("pricefound");
         entity.promoacceptcd = row.IsNull("promoacceptcd") ? string.Empty : row.Field<string>("promoacceptcd");
         entity.promoprice = row.IsNull("promoprice") ? decimal.Zero : row.Field<decimal>("promoprice");
         entity.nonpromoprice = row.IsNull("nonpromoprice") ? decimal.Zero : row.Field<decimal>("nonpromoprice");
         entity.botype = row.IsNull("botype") ? string.Empty : row.Field<string>("botype");
         entity.vvendno = row.IsNull("vvendno") ? decimal.Zero : row.Field<decimal>("vvendno");
         entity.powtnew = row.Field<bool>("powtnew");
         entity.ordertype = row.IsNull("ordertype") ? string.Empty : row.Field<string>("ordertype");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.powtintfl = row.Field<bool>("powtintfl");
         entity.vshipfmno = row.IsNull("vshipfmno") ? 0 : row.Field<int>("vshipfmno");
         entity.vshipviaty = row.IsNull("vshipviaty") ? string.Empty : row.Field<string>("vshipviaty");
         entity.vfrttermscd = row.IsNull("vfrttermscd") ? string.Empty : row.Field<string>("vfrttermscd");
         entity.vtransferloc = row.IsNull("vtransferloc") ? string.Empty : row.Field<string>("vtransferloc");
         entity.vfrtbillacct = row.IsNull("vfrtbillacct") ? string.Empty : row.Field<string>("vfrtbillacct");
         entity.vduedt = row.Field<DateTime?>("vduedt");
         entity.vfobfl = row.Field<bool>("vfobfl");
         entity.wwhse = row.IsNull("wwhse") ? string.Empty : row.Field<string>("wwhse");
         entity.wshipviaty = row.IsNull("wshipviaty") ? string.Empty : row.Field<string>("wshipviaty");
         entity.wduedt = row.Field<DateTime?>("wduedt");
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.taxablefl = row.Field<bool>("taxablefl");
         entity.nontaxtype = row.IsNull("nontaxtype") ? string.Empty : row.Field<string>("nontaxtype");
         entity.taxgroup = row.IsNull("taxgroup") ? 0 : row.Field<int>("taxgroup");
         entity.quesanswer = row.IsNull("quesanswer") ? string.Empty : row.Field<string>("quesanswer");
         entity.quesdescrip1 = row.IsNull("quesdescrip1") ? string.Empty : row.Field<string>("quesdescrip1");
         entity.quesdescrip2 = row.IsNull("quesdescrip2") ? string.Empty : row.Field<string>("quesdescrip2");
         entity.quespriceavail = row.IsNull("quespriceavail") ? string.Empty : row.Field<string>("quespriceavail");
         entity.quesprodcat = row.IsNull("quesprodcat") ? string.Empty : row.Field<string>("quesprodcat");
         entity.quesmessage = row.IsNull("quesmessage") ? string.Empty : row.Field<string>("quesmessage");
         entity.quesmsgmsds = row.IsNull("quesmsgmsds") ? string.Empty : row.Field<string>("quesmsgmsds");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.serlottype = row.IsNull("serlottype") ? string.Empty : row.Field<string>("serlottype");
         entity.speccostty = row.IsNull("speccostty") ? string.Empty : row.Field<string>("speccostty");
         entity.csunperstk = row.IsNull("csunperstk") ? decimal.Zero : row.Field<decimal>("csunperstk");
         entity.prccostper = row.IsNull("prccostper") ? string.Empty : row.Field<string>("prccostper");
         entity.nonstkaddfl = row.Field<bool>("nonstkaddfl");
         entity.restrictovrfl = row.Field<bool>("restrictovrfl");
         entity.restricterrmess = row.IsNull("restricterrmess") ? string.Empty : row.Field<string>("restricterrmess");
         entity.altprodgrpfl = row.Field<bool>("altprodgrpfl");
         entity.altshipfmno = row.IsNull("altshipfmno") ? 0 : row.Field<int>("altshipfmno");
         entity.altvendno = row.IsNull("altvendno") ? decimal.Zero : row.Field<decimal>("altvendno");
         entity.altprodline = row.IsNull("altprodline") ? string.Empty : row.Field<string>("altprodline");
         entity.altprodcat = row.IsNull("altprodcat") ? string.Empty : row.Field<string>("altprodcat");
         entity.altpricetype = row.IsNull("altpricetype") ? string.Empty : row.Field<string>("altpricetype");
         entity.altprodgrp = row.IsNull("altprodgrp") ? string.Empty : row.Field<string>("altprodgrp");
         entity.custprod = row.IsNull("custprod") ? string.Empty : row.Field<string>("custprod");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinenonstock(ref DataRow row, Oelinenonstock entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("prodenabled", entity.prodenabled);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("proddescenabled", entity.proddescenabled);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodcatenabled", entity.prodcatenabled);
         row.SetField("price", entity.price);
         row.SetField("priceenabled", entity.priceenabled);
         row.SetField("pricehidden", entity.pricehidden);
         row.SetField("discamt", entity.discamt);
         row.SetField("discamtenabled", entity.discamtenabled);
         row.SetField("discamthidden", entity.discamthidden);
         row.SetField("disctype", entity.disctype);
         row.SetField("disctypeenabled", entity.disctypeenabled);
         row.SetField("disctypehidden", entity.disctypehidden);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("pricetypeenabled", entity.pricetypeenabled);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("prodcostenabled", entity.prodcostenabled);
         row.SetField("prodcosthidden", entity.prodcosthidden);
         row.SetField("commtype", entity.commtype);
         row.SetField("commtypeenabled", entity.commtypeenabled);
         row.SetField("kitfl", entity.kitfl);
         row.SetField("kitflenabled", entity.kitflenabled);
         row.SetField("kitrollty", entity.kitrollty);
         row.SetField("kitrolltyenabled", entity.kitrolltyenabled);
         row.SetField("foreigncost", entity.foreigncost);
         row.SetField("foreigncosthidden", entity.foreigncosthidden);
         row.SetField("exchangerate", entity.exchangerate);
         row.SetField("exchangeratehidden", entity.exchangeratehidden);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("currencytyhidden", entity.currencytyhidden);
         row.SetField("currencytyshort", entity.currencytyshort);
         row.SetField("currencytyshorthidden", entity.currencytyshorthidden);
         row.SetField("calculatebuttonenabled", entity.calculatebuttonenabled);
         row.SetField("calculatebuttonhidden", entity.calculatebuttonhidden);
         row.SetField("bofl", entity.bofl);
         row.SetField("boflenabledfl", entity.boflenabledfl);
         row.SetField("createpofl", entity.createpofl);
         row.SetField("createpoflenabled", entity.createpoflenabled);
         row.SetField("itemtype", entity.itemtype);
         row.SetField("itemtypeenabled", entity.itemtypeenabled);
         row.SetField("itemtypevaluesdesc", entity.itemtypevaluesdesc);
         row.SetField("itemtypevaluescode", entity.itemtypevaluescode);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("rushflenabled", entity.rushflenabled);
         row.SetField("copycommentfl", entity.copycommentfl);
         row.SetField("copycommentflenabled", entity.copycommentflenabled);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendnoenabled", entity.vendnoenabled);
         row.SetField("vendname", entity.vendname);
         row.SetField("arpwhse", entity.arpwhse);
         row.SetField("arpwhseenabled", entity.arpwhseenabled);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodlineenabled", entity.prodlineenabled);
         row.SetField("stkqtyavail", entity.stkqtyavail);
         row.SetField("stkqtyavailhidden", entity.stkqtyavailhidden);
         row.SetField("nsqtyavail", entity.nsqtyavail);
         row.SetField("nsqtyavailhidden", entity.nsqtyavailhidden);
         row.SetField("defaultbuttonenabled", entity.defaultbuttonenabled);
         row.SetField("defaultbuttonhidden", entity.defaultbuttonhidden);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("ncnrenabled", entity.ncnrenabled);
         row.SetField("eccnclasscd", entity.eccnclasscd);
         row.SetField("eccnallowblankfl", entity.eccnallowblankfl);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("pricefound", entity.pricefound);
         row.SetField("promoacceptcd", entity.promoacceptcd);
         row.SetField("promoprice", entity.promoprice);
         row.SetField("nonpromoprice", entity.nonpromoprice);
         row.SetField("botype", entity.botype);
         row.SetField("vvendno", entity.vvendno);
         row.SetField("powtnew", entity.powtnew);
         row.SetField("ordertype", entity.ordertype);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("powtintfl", entity.powtintfl);
         row.SetField("vshipfmno", entity.vshipfmno);
         row.SetField("vshipviaty", entity.vshipviaty);
         row.SetField("vfrttermscd", entity.vfrttermscd);
         row.SetField("vtransferloc", entity.vtransferloc);
         row.SetField("vfrtbillacct", entity.vfrtbillacct);
         row.SetField("vduedt", entity.vduedt);
         row.SetField("vfobfl", entity.vfobfl);
         row.SetField("wwhse", entity.wwhse);
         row.SetField("wshipviaty", entity.wshipviaty);
         row.SetField("wduedt", entity.wduedt);
         row.SetField("leadtm", entity.leadtm);
         row.SetField("taxablefl", entity.taxablefl);
         row.SetField("nontaxtype", entity.nontaxtype);
         row.SetField("taxgroup", entity.taxgroup);
         row.SetField("quesanswer", entity.quesanswer);
         row.SetField("quesdescrip1", entity.quesdescrip1);
         row.SetField("quesdescrip2", entity.quesdescrip2);
         row.SetField("quespriceavail", entity.quespriceavail);
         row.SetField("quesprodcat", entity.quesprodcat);
         row.SetField("quesmessage", entity.quesmessage);
         row.SetField("quesmsgmsds", entity.quesmsgmsds);
         row.SetField("unit", entity.unit);
         row.SetField("serlottype", entity.serlottype);
         row.SetField("speccostty", entity.speccostty);
         row.SetField("csunperstk", entity.csunperstk);
         row.SetField("prccostper", entity.prccostper);
         row.SetField("nonstkaddfl", entity.nonstkaddfl);
         row.SetField("restrictovrfl", entity.restrictovrfl);
         row.SetField("restricterrmess", entity.restricterrmess);
         row.SetField("altprodgrpfl", entity.altprodgrpfl);
         row.SetField("altshipfmno", entity.altshipfmno);
         row.SetField("altvendno", entity.altvendno);
         row.SetField("altprodline", entity.altprodline);
         row.SetField("altprodcat", entity.altprodcat);
         row.SetField("altpricetype", entity.altpricetype);
         row.SetField("altprodgrp", entity.altprodgrp);
         row.SetField("custprod", entity.custprod);
         row.SetField("upcid", entity.upcid);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
