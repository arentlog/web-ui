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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarreptheader
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarreptheader.Porrarreptheader")]
   public partial class Porrarreptheader : ModelBase
   {
      public int reportno { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      public int shipfmno { get; set; }
      [StringValidationAttribute]
      public string billtowhse { get; set; }
      [StringValidationAttribute]
      public string buyer { get; set; }
      [StringValidationAttribute]
      public string sourcety { get; set; }
      [StringValidationAttribute]
      public string vendorname { get; set; }
      [StringValidationAttribute]
      public string billtoname { get; set; }
      [StringValidationAttribute]
      public string billtoaddr1 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr2 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr3 { get; set; }
      [StringValidationAttribute]
      public string billtocity { get; set; }
      [StringValidationAttribute]
      public string billtostate { get; set; }
      [StringValidationAttribute]
      public string billtozip { get; set; }
      [StringValidationAttribute]
      public string billtocountrycd { get; set; }
      public bool freeformaddrfl { get; set; }
      [StringValidationAttribute]
      public string shiptoname { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr1 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr2 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr3 { get; set; }
      [StringValidationAttribute]
      public string shiptocity { get; set; }
      [StringValidationAttribute]
      public string shiptostate { get; set; }
      [StringValidationAttribute]
      public string shiptozip { get; set; }
      public bool shiptoaddrenabled { get; set; }
      public DateTime? duedt { get; set; }
      [StringValidationAttribute]
      public string rush { get; set; }
      public DateTime? reqshipdt { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string shipviatydesc { get; set; }
      [StringValidationAttribute]
      public string frttermscd { get; set; }
      [StringValidationAttribute]
      public string transferloc { get; set; }
      [StringValidationAttribute]
      public string frtbillacct { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      [StringValidationAttribute]
      public string instructions { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string shiptocountrycd { get; set; }
      public bool shiptocountrycdenabled { get; set; }
      public int geocd { get; set; }
      public bool geocdenabled { get; set; }
      public bool outofcityfl { get; set; }
      public bool outofcityflenabled { get; set; }
      [StringValidationAttribute]
      public string termstype { get; set; }
      [StringValidationAttribute]
      public string termstypedesc { get; set; }
      public bool termstypeenabled { get; set; }
      public bool resalefl { get; set; }
      [StringValidationAttribute]
      public string resaleno { get; set; }
      public bool resaleenabled { get; set; }
      public decimal wodiscamt { get; set; }
      public bool wodisctype { get; set; }
      [StringValidationAttribute]
      public string wodisctypesymbol { get; set; }
      public decimal wodiscnet { get; set; }
      public decimal discpct { get; set; }
      public decimal addon { get; set; }
      [StringValidationAttribute]
      public string currencylabel { get; set; }
      [StringValidationAttribute]
      public string currencydesc { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public bool subfl { get; set; }
      public bool leadtimefl { get; set; }
      public bool bofl { get; set; }
      public bool fobfl { get; set; }
      public bool conslinesfl { get; set; }
      public bool conslinesenabled { get; set; }
      public bool conswhsefl { get; set; }
      public bool conswhseenabled { get; set; }
      public bool combineenabled { get; set; }
      [StringValidationAttribute]
      public string frtconsolidation { get; set; }
      public decimal totqtyordered { get; set; }
      public decimal totlineamount { get; set; }
      public decimal totcubes { get; set; }
      public decimal totweight { get; set; }
      [StringValidationAttribute]
      public string targettext { get; set; }
      public decimal targetamt { get; set; }
      [StringValidationAttribute]
      public string shorttext { get; set; }
      public decimal shortamt { get; set; }
      [StringValidationAttribute]
      public string adjusttext { get; set; }
      public decimal adjustamt { get; set; }
      public bool adjustvisible { get; set; }
      [StringValidationAttribute]
      public string minbuytext { get; set; }
      public decimal minbuyamt { get; set; }
      public bool minbuyvisible { get; set; }
      [StringValidationAttribute]
      public string addonsymbol { get; set; }
      public decimal addonamt1 { get; set; }
      public decimal addonamt2 { get; set; }
      public decimal addonamt3 { get; set; }
      public decimal addonamt4 { get; set; }
      public int addonno1 { get; set; }
      public int addonno2 { get; set; }
      public int addonno3 { get; set; }
      public int addonno4 { get; set; }
      [StringValidationAttribute]
      public string addonno1desc { get; set; }
      [StringValidationAttribute]
      public string addonno2desc { get; set; }
      [StringValidationAttribute]
      public string addonno3desc { get; set; }
      [StringValidationAttribute]
      public string addonno4desc { get; set; }
      public bool addontype1 { get; set; }
      public bool addontype2 { get; set; }
      public bool addontype3 { get; set; }
      public bool addontype4 { get; set; }
      public decimal addonnet1 { get; set; }
      public decimal addonnet2 { get; set; }
      public decimal addonnet3 { get; set; }
      public decimal addonnet4 { get; set; }
      [StringValidationAttribute]
      public string addoncaplabel1 { get; set; }
      [StringValidationAttribute]
      public string addoncaplabel2 { get; set; }
      [StringValidationAttribute]
      public string addoncaplabel3 { get; set; }
      [StringValidationAttribute]
      public string addoncaplabel4 { get; set; }
      public bool addoncaplabelenabled { get; set; }
      public bool freightexpectedfl { get; set; }
      [StringValidationAttribute]
      public string freightexpectedmsg { get; set; }
      [StringValidationAttribute]
      public string poerahRowid { get; set; }
      public string CompleteAddress { get { return this.shiptoaddr1 + "," + this.shiptocity + "," + this.shiptostate + "," + this.shiptozip; } }


      public static Porrarreptheader BuildPorrarreptheaderFromRow(DataRow row)
      {
         Porrarreptheader entity = new Porrarreptheader();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.shipfmno = row.IsNull("shipfmno") ? 0 : row.Field<int>("shipfmno");
         entity.billtowhse = row.IsNull("billtowhse") ? string.Empty : row.Field<string>("billtowhse");
         entity.buyer = row.IsNull("buyer") ? string.Empty : row.Field<string>("buyer");
         entity.sourcety = row.IsNull("sourcety") ? string.Empty : row.Field<string>("sourcety");
         entity.vendorname = row.IsNull("vendorname") ? string.Empty : row.Field<string>("vendorname");
         entity.billtoname = row.IsNull("billtoname") ? string.Empty : row.Field<string>("billtoname");
         entity.billtoaddr1 = row.IsNull("billtoaddr1") ? string.Empty : row.Field<string>("billtoaddr1");
         entity.billtoaddr2 = row.IsNull("billtoaddr2") ? string.Empty : row.Field<string>("billtoaddr2");
         entity.billtoaddr3 = row.IsNull("billtoaddr3") ? string.Empty : row.Field<string>("billtoaddr3");
         entity.billtocity = row.IsNull("billtocity") ? string.Empty : row.Field<string>("billtocity");
         entity.billtostate = row.IsNull("billtostate") ? string.Empty : row.Field<string>("billtostate");
         entity.billtozip = row.IsNull("billtozip") ? string.Empty : row.Field<string>("billtozip");
         entity.billtocountrycd = row.IsNull("billtocountrycd") ? string.Empty : row.Field<string>("billtocountrycd");
         entity.freeformaddrfl = row.Field<bool>("freeformaddrfl");
         entity.shiptoname = row.IsNull("shiptoname") ? string.Empty : row.Field<string>("shiptoname");
         entity.shiptoaddr1 = row.IsNull("shiptoaddr1") ? string.Empty : row.Field<string>("shiptoaddr1");
         entity.shiptoaddr2 = row.IsNull("shiptoaddr2") ? string.Empty : row.Field<string>("shiptoaddr2");
         entity.shiptoaddr3 = row.IsNull("shiptoaddr3") ? string.Empty : row.Field<string>("shiptoaddr3");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.shiptostate = row.IsNull("shiptostate") ? string.Empty : row.Field<string>("shiptostate");
         entity.shiptozip = row.IsNull("shiptozip") ? string.Empty : row.Field<string>("shiptozip");
         entity.shiptoaddrenabled = row.Field<bool>("shiptoaddrenabled");
         entity.duedt = row.Field<DateTime?>("duedt");
         entity.rush = row.IsNull("rush") ? string.Empty : row.Field<string>("rush");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.shipviatydesc = row.IsNull("shipviatydesc") ? string.Empty : row.Field<string>("shipviatydesc");
         entity.frttermscd = row.IsNull("frttermscd") ? string.Empty : row.Field<string>("frttermscd");
         entity.transferloc = row.IsNull("transferloc") ? string.Empty : row.Field<string>("transferloc");
         entity.frtbillacct = row.IsNull("frtbillacct") ? string.Empty : row.Field<string>("frtbillacct");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.instructions = row.IsNull("instructions") ? string.Empty : row.Field<string>("instructions");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.shiptocountrycd = row.IsNull("shiptocountrycd") ? string.Empty : row.Field<string>("shiptocountrycd");
         entity.shiptocountrycdenabled = row.Field<bool>("shiptocountrycdenabled");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.geocdenabled = row.Field<bool>("geocdenabled");
         entity.outofcityfl = row.Field<bool>("outofcityfl");
         entity.outofcityflenabled = row.Field<bool>("outofcityflenabled");
         entity.termstype = row.IsNull("termstype") ? string.Empty : row.Field<string>("termstype");
         entity.termstypedesc = row.IsNull("termstypedesc") ? string.Empty : row.Field<string>("termstypedesc");
         entity.termstypeenabled = row.Field<bool>("termstypeenabled");
         entity.resalefl = row.Field<bool>("resalefl");
         entity.resaleno = row.IsNull("resaleno") ? string.Empty : row.Field<string>("resaleno");
         entity.resaleenabled = row.Field<bool>("resaleenabled");
         entity.wodiscamt = row.IsNull("wodiscamt") ? decimal.Zero : row.Field<decimal>("wodiscamt");
         entity.wodisctype = row.Field<bool>("wodisctype");
         entity.wodisctypesymbol = row.IsNull("wodisctypesymbol") ? string.Empty : row.Field<string>("wodisctypesymbol");
         entity.wodiscnet = row.IsNull("wodiscnet") ? decimal.Zero : row.Field<decimal>("wodiscnet");
         entity.discpct = row.IsNull("discpct") ? decimal.Zero : row.Field<decimal>("discpct");
         entity.addon = row.IsNull("addon") ? decimal.Zero : row.Field<decimal>("addon");
         entity.currencylabel = row.IsNull("currencylabel") ? string.Empty : row.Field<string>("currencylabel");
         entity.currencydesc = row.IsNull("currencydesc") ? string.Empty : row.Field<string>("currencydesc");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.subfl = row.Field<bool>("subfl");
         entity.leadtimefl = row.Field<bool>("leadtimefl");
         entity.bofl = row.Field<bool>("bofl");
         entity.fobfl = row.Field<bool>("fobfl");
         entity.conslinesfl = row.Field<bool>("conslinesfl");
         entity.conslinesenabled = row.Field<bool>("conslinesenabled");
         entity.conswhsefl = row.Field<bool>("conswhsefl");
         entity.conswhseenabled = row.Field<bool>("conswhseenabled");
         entity.combineenabled = row.Field<bool>("combineenabled");
         entity.frtconsolidation = row.IsNull("frtconsolidation") ? string.Empty : row.Field<string>("frtconsolidation");
         entity.totqtyordered = row.IsNull("totqtyordered") ? decimal.Zero : row.Field<decimal>("totqtyordered");
         entity.totlineamount = row.IsNull("totlineamount") ? decimal.Zero : row.Field<decimal>("totlineamount");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.targettext = row.IsNull("targettext") ? string.Empty : row.Field<string>("targettext");
         entity.targetamt = row.IsNull("targetamt") ? decimal.Zero : row.Field<decimal>("targetamt");
         entity.shorttext = row.IsNull("shorttext") ? string.Empty : row.Field<string>("shorttext");
         entity.shortamt = row.IsNull("shortamt") ? decimal.Zero : row.Field<decimal>("shortamt");
         entity.adjusttext = row.IsNull("adjusttext") ? string.Empty : row.Field<string>("adjusttext");
         entity.adjustamt = row.IsNull("adjustamt") ? decimal.Zero : row.Field<decimal>("adjustamt");
         entity.adjustvisible = row.Field<bool>("adjustvisible");
         entity.minbuytext = row.IsNull("minbuytext") ? string.Empty : row.Field<string>("minbuytext");
         entity.minbuyamt = row.IsNull("minbuyamt") ? decimal.Zero : row.Field<decimal>("minbuyamt");
         entity.minbuyvisible = row.Field<bool>("minbuyvisible");
         entity.addonsymbol = row.IsNull("addonsymbol") ? string.Empty : row.Field<string>("addonsymbol");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addonamt3 = row.IsNull("addonamt3") ? decimal.Zero : row.Field<decimal>("addonamt3");
         entity.addonamt4 = row.IsNull("addonamt4") ? decimal.Zero : row.Field<decimal>("addonamt4");
         entity.addonno1 = row.IsNull("addonno1") ? 0 : row.Field<int>("addonno1");
         entity.addonno2 = row.IsNull("addonno2") ? 0 : row.Field<int>("addonno2");
         entity.addonno3 = row.IsNull("addonno3") ? 0 : row.Field<int>("addonno3");
         entity.addonno4 = row.IsNull("addonno4") ? 0 : row.Field<int>("addonno4");
         entity.addonno1desc = row.IsNull("addonno1desc") ? string.Empty : row.Field<string>("addonno1desc");
         entity.addonno2desc = row.IsNull("addonno2desc") ? string.Empty : row.Field<string>("addonno2desc");
         entity.addonno3desc = row.IsNull("addonno3desc") ? string.Empty : row.Field<string>("addonno3desc");
         entity.addonno4desc = row.IsNull("addonno4desc") ? string.Empty : row.Field<string>("addonno4desc");
         entity.addontype1 = row.Field<bool>("addontype1");
         entity.addontype2 = row.Field<bool>("addontype2");
         entity.addontype3 = row.Field<bool>("addontype3");
         entity.addontype4 = row.Field<bool>("addontype4");
         entity.addonnet1 = row.IsNull("addonnet1") ? decimal.Zero : row.Field<decimal>("addonnet1");
         entity.addonnet2 = row.IsNull("addonnet2") ? decimal.Zero : row.Field<decimal>("addonnet2");
         entity.addonnet3 = row.IsNull("addonnet3") ? decimal.Zero : row.Field<decimal>("addonnet3");
         entity.addonnet4 = row.IsNull("addonnet4") ? decimal.Zero : row.Field<decimal>("addonnet4");
         entity.addoncaplabel1 = row.IsNull("addoncaplabel1") ? string.Empty : row.Field<string>("addoncaplabel1");
         entity.addoncaplabel2 = row.IsNull("addoncaplabel2") ? string.Empty : row.Field<string>("addoncaplabel2");
         entity.addoncaplabel3 = row.IsNull("addoncaplabel3") ? string.Empty : row.Field<string>("addoncaplabel3");
         entity.addoncaplabel4 = row.IsNull("addoncaplabel4") ? string.Empty : row.Field<string>("addoncaplabel4");
         entity.addoncaplabelenabled = row.Field<bool>("addoncaplabelenabled");
         entity.freightexpectedfl = row.Field<bool>("freightexpectedfl");
         entity.freightexpectedmsg = row.IsNull("freightexpectedmsg") ? string.Empty : row.Field<string>("freightexpectedmsg");
         entity.poerahRowid = row.Field<byte[]>("poerah-rowid").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarreptheader(ref DataRow row, Porrarreptheader entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("vendno", entity.vendno);
         row.SetField("whse", entity.whse);
         row.SetField("prodline", entity.prodline);
         row.SetField("shipfmno", entity.shipfmno);
         row.SetField("billtowhse", entity.billtowhse);
         row.SetField("buyer", entity.buyer);
         row.SetField("sourcety", entity.sourcety);
         row.SetField("vendorname", entity.vendorname);
         row.SetField("billtoname", entity.billtoname);
         row.SetField("billtoaddr1", entity.billtoaddr1);
         row.SetField("billtoaddr2", entity.billtoaddr2);
         row.SetField("billtoaddr3", entity.billtoaddr3);
         row.SetField("billtocity", entity.billtocity);
         row.SetField("billtostate", entity.billtostate);
         row.SetField("billtozip", entity.billtozip);
         row.SetField("billtocountrycd", entity.billtocountrycd);
         row.SetField("freeformaddrfl", entity.freeformaddrfl);
         row.SetField("shiptoname", entity.shiptoname);
         row.SetField("shiptoaddr1", entity.shiptoaddr1);
         row.SetField("shiptoaddr2", entity.shiptoaddr2);
         row.SetField("shiptoaddr3", entity.shiptoaddr3);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("shiptostate", entity.shiptostate);
         row.SetField("shiptozip", entity.shiptozip);
         row.SetField("shiptoaddrenabled", entity.shiptoaddrenabled);
         row.SetField("duedt", entity.duedt);
         row.SetField("rush", entity.rush);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("shipviatydesc", entity.shipviatydesc);
         row.SetField("frttermscd", entity.frttermscd);
         row.SetField("transferloc", entity.transferloc);
         row.SetField("frtbillacct", entity.frtbillacct);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("instructions", entity.instructions);
         row.SetField("refer", entity.refer);
         row.SetField("shiptocountrycd", entity.shiptocountrycd);
         row.SetField("shiptocountrycdenabled", entity.shiptocountrycdenabled);
         row.SetField("geocd", entity.geocd);
         row.SetField("geocdenabled", entity.geocdenabled);
         row.SetField("outofcityfl", entity.outofcityfl);
         row.SetField("outofcityflenabled", entity.outofcityflenabled);
         row.SetField("termstype", entity.termstype);
         row.SetField("termstypedesc", entity.termstypedesc);
         row.SetField("termstypeenabled", entity.termstypeenabled);
         row.SetField("resalefl", entity.resalefl);
         row.SetField("resaleno", entity.resaleno);
         row.SetField("resaleenabled", entity.resaleenabled);
         row.SetField("wodiscamt", entity.wodiscamt);
         row.SetField("wodisctype", entity.wodisctype);
         row.SetField("wodisctypesymbol", entity.wodisctypesymbol);
         row.SetField("wodiscnet", entity.wodiscnet);
         row.SetField("discpct", entity.discpct);
         row.SetField("addon", entity.addon);
         row.SetField("currencylabel", entity.currencylabel);
         row.SetField("currencydesc", entity.currencydesc);
         row.SetField("contractno", entity.contractno);
         row.SetField("subfl", entity.subfl);
         row.SetField("leadtimefl", entity.leadtimefl);
         row.SetField("bofl", entity.bofl);
         row.SetField("fobfl", entity.fobfl);
         row.SetField("conslinesfl", entity.conslinesfl);
         row.SetField("conslinesenabled", entity.conslinesenabled);
         row.SetField("conswhsefl", entity.conswhsefl);
         row.SetField("conswhseenabled", entity.conswhseenabled);
         row.SetField("combineenabled", entity.combineenabled);
         row.SetField("frtconsolidation", entity.frtconsolidation);
         row.SetField("totqtyordered", entity.totqtyordered);
         row.SetField("totlineamount", entity.totlineamount);
         row.SetField("totcubes", entity.totcubes);
         row.SetField("totweight", entity.totweight);
         row.SetField("targettext", entity.targettext);
         row.SetField("targetamt", entity.targetamt);
         row.SetField("shorttext", entity.shorttext);
         row.SetField("shortamt", entity.shortamt);
         row.SetField("adjusttext", entity.adjusttext);
         row.SetField("adjustamt", entity.adjustamt);
         row.SetField("adjustvisible", entity.adjustvisible);
         row.SetField("minbuytext", entity.minbuytext);
         row.SetField("minbuyamt", entity.minbuyamt);
         row.SetField("minbuyvisible", entity.minbuyvisible);
         row.SetField("addonsymbol", entity.addonsymbol);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addonamt3", entity.addonamt3);
         row.SetField("addonamt4", entity.addonamt4);
         row.SetField("addonno1", entity.addonno1);
         row.SetField("addonno2", entity.addonno2);
         row.SetField("addonno3", entity.addonno3);
         row.SetField("addonno4", entity.addonno4);
         row.SetField("addonno1desc", entity.addonno1desc);
         row.SetField("addonno2desc", entity.addonno2desc);
         row.SetField("addonno3desc", entity.addonno3desc);
         row.SetField("addonno4desc", entity.addonno4desc);
         row.SetField("addontype1", entity.addontype1);
         row.SetField("addontype2", entity.addontype2);
         row.SetField("addontype3", entity.addontype3);
         row.SetField("addontype4", entity.addontype4);
         row.SetField("addonnet1", entity.addonnet1);
         row.SetField("addonnet2", entity.addonnet2);
         row.SetField("addonnet3", entity.addonnet3);
         row.SetField("addonnet4", entity.addonnet4);
         row.SetField("addoncaplabel1", entity.addoncaplabel1);
         row.SetField("addoncaplabel2", entity.addoncaplabel2);
         row.SetField("addoncaplabel3", entity.addoncaplabel3);
         row.SetField("addoncaplabel4", entity.addoncaplabel4);
         row.SetField("addoncaplabelenabled", entity.addoncaplabelenabled);
         row.SetField("freightexpectedfl", entity.freightexpectedfl);
         row.SetField("freightexpectedmsg", entity.freightexpectedmsg);
         row.SetField("poerah-rowid", entity.poerahRowid.ToByteArray());

      }
   
   }
}
#pragma warning restore 1591