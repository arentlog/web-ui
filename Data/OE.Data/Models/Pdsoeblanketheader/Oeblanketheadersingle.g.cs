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

namespace Infor.Sxe.OE.Data.Models.Pdsoeblanketheader
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeblanketheader.Oeblanketheadersingle")]
   public partial class Oeblanketheadersingle : ModelBase
   {
      public int orderno { get; set; }
      public int ordersuf { get; set; }
      [StringValidationAttribute]
      public string ordernotesfl { get; set; }
      [StringValidationAttribute]
      public string transtype { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string custnotesfl { get; set; }
      [StringValidationAttribute]
      public string name { get; set; }
      [StringValidationAttribute]
      public string billtoaddr1 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr2 { get; set; }
      [StringValidationAttribute]
      public string billtoaddr3 { get; set; }
      [StringValidationAttribute]
      public string billtocity { get; set; }
      [StringValidationAttribute]
      public string billtost { get; set; }
      [StringValidationAttribute]
      public string billtozipcd { get; set; }
      [StringValidationAttribute]
      public string billtocountrycd { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptonm { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr1 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr2 { get; set; }
      [StringValidationAttribute]
      public string shiptoaddr3 { get; set; }
      [StringValidationAttribute]
      public string shiptocity { get; set; }
      [StringValidationAttribute]
      public string shiptost { get; set; }
      [StringValidationAttribute]
      public string shiptozipcd { get; set; }
      [StringValidationAttribute]
      public string shiptocountry { get; set; }
      [StringValidationAttribute]
      public string shiptonotesfl { get; set; }
      public int geocd { get; set; }
      public bool outofcityfl { get; set; }
      public DateTime? promisedt { get; set; }
      public DateTime? promisedtO { get; set; }
      public DateTime? origpromisedt { get; set; }
      public DateTime? origpromisedtO { get; set; }
      public DateTime? reqshipdt { get; set; }
      public DateTime? reqshipdtO { get; set; }
      public DateTime? billdt { get; set; }
      [StringValidationAttribute]
      public string shipviaty { get; set; }
      [StringValidationAttribute]
      public string shipviadesc { get; set; }
      [StringValidationAttribute]
      public string shipinstr { get; set; }
      [StringValidationAttribute]
      public string extshipinstr { get; set; }
      public int nolineitem { get; set; }
      public bool lumpbillfl { get; set; }
      public decimal lumpbillamt { get; set; }
      public decimal totinvamt { get; set; }
      public decimal totweight { get; set; }
      public decimal totamt { get; set; }
      public decimal totqtyord { get; set; }
      public decimal totqtyshp { get; set; }
      public decimal totcube { get; set; }
      public decimal remain { get; set; }
      public bool inbndfrtfl { get; set; }
      public bool outbndfrtfl { get; set; }
      public bool pmfl { get; set; }
      public decimal datc { get; set; }
      public int addonno1 { get; set; }
      public decimal addonamt1 { get; set; }
      public decimal addonnet1 { get; set; }
      [StringValidationAttribute]
      public string addonlabel1 { get; set; }
      public int addonno2 { get; set; }
      public decimal addonamt2 { get; set; }
      public decimal addonnet2 { get; set; }
      [StringValidationAttribute]
      public string addonlabel2 { get; set; }
      public int addonno3 { get; set; }
      public decimal addonamt3 { get; set; }
      public decimal addonnet3 { get; set; }
      [StringValidationAttribute]
      public string addonlabel3 { get; set; }
      public int addonno4 { get; set; }
      public decimal addonamt4 { get; set; }
      public decimal addonnet4 { get; set; }
      [StringValidationAttribute]
      public string addonlabel4 { get; set; }
      [StringValidationAttribute]
      public string orderdisp { get; set; }
      public bool promisedtchangedfl { get; set; }
      public bool origpromisedtchangedfl { get; set; }
      public bool reqshipdtchangedfl { get; set; }
      public bool lndtentfl { get; set; }
      [StringValidationAttribute]
      public string dtupdtype { get; set; }
      public bool promptflushdateupdtype { get; set; }
      public bool freeformaddr { get; set; }
      [StringValidationAttribute]
      public string currsymbol { get; set; }
      [StringValidationAttribute]
      public string taxinterfacety { get; set; }
      public bool modvtfl { get; set; }
      public bool shiptofl { get; set; }
      public bool termsoverfl { get; set; }
      public bool fiGeoCodeSensitive { get; set; }
      public bool tgOutOfCityFlSensitive { get; set; }
      public bool btnLookupGeoCdSensitive { get; set; }
      public string CompleteAddress { get { return this.shiptoaddr1 + "," + this.shiptocity + "," + this.shiptost + "," + this.shiptozipcd + "," + this.shiptocountry; } }


      public static Oeblanketheadersingle BuildOeblanketheadersingleFromRow(DataRow row)
      {
         Oeblanketheadersingle entity = new Oeblanketheadersingle();
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.ordersuf = row.IsNull("ordersuf") ? 0 : row.Field<int>("ordersuf");
         entity.ordernotesfl = row.IsNull("ordernotesfl") ? string.Empty : row.Field<string>("ordernotesfl");
         entity.transtype = row.IsNull("transtype") ? string.Empty : row.Field<string>("transtype");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.custnotesfl = row.IsNull("custnotesfl") ? string.Empty : row.Field<string>("custnotesfl");
         entity.name = row.IsNull("name") ? string.Empty : row.Field<string>("name");
         entity.billtoaddr1 = row.IsNull("billtoaddr1") ? string.Empty : row.Field<string>("billtoaddr1");
         entity.billtoaddr2 = row.IsNull("billtoaddr2") ? string.Empty : row.Field<string>("billtoaddr2");
         entity.billtoaddr3 = row.IsNull("billtoaddr3") ? string.Empty : row.Field<string>("billtoaddr3");
         entity.billtocity = row.IsNull("billtocity") ? string.Empty : row.Field<string>("billtocity");
         entity.billtost = row.IsNull("billtost") ? string.Empty : row.Field<string>("billtost");
         entity.billtozipcd = row.IsNull("billtozipcd") ? string.Empty : row.Field<string>("billtozipcd");
         entity.billtocountrycd = row.IsNull("billtocountrycd") ? string.Empty : row.Field<string>("billtocountrycd");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptonm = row.IsNull("shiptonm") ? string.Empty : row.Field<string>("shiptonm");
         entity.shiptoaddr1 = row.IsNull("shiptoaddr1") ? string.Empty : row.Field<string>("shiptoaddr1");
         entity.shiptoaddr2 = row.IsNull("shiptoaddr2") ? string.Empty : row.Field<string>("shiptoaddr2");
         entity.shiptoaddr3 = row.IsNull("shiptoaddr3") ? string.Empty : row.Field<string>("shiptoaddr3");
         entity.shiptocity = row.IsNull("shiptocity") ? string.Empty : row.Field<string>("shiptocity");
         entity.shiptost = row.IsNull("shiptost") ? string.Empty : row.Field<string>("shiptost");
         entity.shiptozipcd = row.IsNull("shiptozipcd") ? string.Empty : row.Field<string>("shiptozipcd");
         entity.shiptocountry = row.IsNull("shiptocountry") ? string.Empty : row.Field<string>("shiptocountry");
         entity.shiptonotesfl = row.IsNull("shiptonotesfl") ? string.Empty : row.Field<string>("shiptonotesfl");
         entity.geocd = row.IsNull("geocd") ? 0 : row.Field<int>("geocd");
         entity.outofcityfl = row.Field<bool>("outofcityfl");
         entity.promisedt = row.Field<DateTime?>("promisedt");
         entity.promisedtO = row.Field<DateTime?>("promisedt-o");
         entity.origpromisedt = row.Field<DateTime?>("origpromisedt");
         entity.origpromisedtO = row.Field<DateTime?>("origpromisedt-o");
         entity.reqshipdt = row.Field<DateTime?>("reqshipdt");
         entity.reqshipdtO = row.Field<DateTime?>("reqshipdt-o");
         entity.billdt = row.Field<DateTime?>("billdt");
         entity.shipviaty = row.IsNull("shipviaty") ? string.Empty : row.Field<string>("shipviaty");
         entity.shipviadesc = row.IsNull("shipviadesc") ? string.Empty : row.Field<string>("shipviadesc");
         entity.shipinstr = row.IsNull("shipinstr") ? string.Empty : row.Field<string>("shipinstr");
         entity.extshipinstr = row.IsNull("extshipinstr") ? string.Empty : row.Field<string>("extshipinstr");
         entity.nolineitem = row.IsNull("nolineitem") ? 0 : row.Field<int>("nolineitem");
         entity.lumpbillfl = row.Field<bool>("lumpbillfl");
         entity.lumpbillamt = row.IsNull("lumpbillamt") ? decimal.Zero : row.Field<decimal>("lumpbillamt");
         entity.totinvamt = row.IsNull("totinvamt") ? decimal.Zero : row.Field<decimal>("totinvamt");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.totamt = row.IsNull("totamt") ? decimal.Zero : row.Field<decimal>("totamt");
         entity.totqtyord = row.IsNull("totqtyord") ? decimal.Zero : row.Field<decimal>("totqtyord");
         entity.totqtyshp = row.IsNull("totqtyshp") ? decimal.Zero : row.Field<decimal>("totqtyshp");
         entity.totcube = row.IsNull("totcube") ? decimal.Zero : row.Field<decimal>("totcube");
         entity.remain = row.IsNull("remain") ? decimal.Zero : row.Field<decimal>("remain");
         entity.inbndfrtfl = row.Field<bool>("inbndfrtfl");
         entity.outbndfrtfl = row.Field<bool>("outbndfrtfl");
         entity.pmfl = row.Field<bool>("pmfl");
         entity.datc = row.IsNull("datc") ? decimal.Zero : row.Field<decimal>("datc");
         entity.addonno1 = row.IsNull("addonno1") ? 0 : row.Field<int>("addonno1");
         entity.addonamt1 = row.IsNull("addonamt1") ? decimal.Zero : row.Field<decimal>("addonamt1");
         entity.addonnet1 = row.IsNull("addonnet1") ? decimal.Zero : row.Field<decimal>("addonnet1");
         entity.addonlabel1 = row.IsNull("addonlabel1") ? string.Empty : row.Field<string>("addonlabel1");
         entity.addonno2 = row.IsNull("addonno2") ? 0 : row.Field<int>("addonno2");
         entity.addonamt2 = row.IsNull("addonamt2") ? decimal.Zero : row.Field<decimal>("addonamt2");
         entity.addonnet2 = row.IsNull("addonnet2") ? decimal.Zero : row.Field<decimal>("addonnet2");
         entity.addonlabel2 = row.IsNull("addonlabel2") ? string.Empty : row.Field<string>("addonlabel2");
         entity.addonno3 = row.IsNull("addonno3") ? 0 : row.Field<int>("addonno3");
         entity.addonamt3 = row.IsNull("addonamt3") ? decimal.Zero : row.Field<decimal>("addonamt3");
         entity.addonnet3 = row.IsNull("addonnet3") ? decimal.Zero : row.Field<decimal>("addonnet3");
         entity.addonlabel3 = row.IsNull("addonlabel3") ? string.Empty : row.Field<string>("addonlabel3");
         entity.addonno4 = row.IsNull("addonno4") ? 0 : row.Field<int>("addonno4");
         entity.addonamt4 = row.IsNull("addonamt4") ? decimal.Zero : row.Field<decimal>("addonamt4");
         entity.addonnet4 = row.IsNull("addonnet4") ? decimal.Zero : row.Field<decimal>("addonnet4");
         entity.addonlabel4 = row.IsNull("addonlabel4") ? string.Empty : row.Field<string>("addonlabel4");
         entity.orderdisp = row.IsNull("orderdisp") ? string.Empty : row.Field<string>("orderdisp");
         entity.promisedtchangedfl = row.Field<bool>("promisedtchangedfl");
         entity.origpromisedtchangedfl = row.Field<bool>("origpromisedtchangedfl");
         entity.reqshipdtchangedfl = row.Field<bool>("reqshipdtchangedfl");
         entity.lndtentfl = row.Field<bool>("lndtentfl");
         entity.dtupdtype = row.IsNull("dtupdtype") ? string.Empty : row.Field<string>("dtupdtype");
         entity.promptflushdateupdtype = row.Field<bool>("promptflushdateupdtype");
         entity.freeformaddr = row.Field<bool>("freeformaddr");
         entity.currsymbol = row.IsNull("currsymbol") ? string.Empty : row.Field<string>("currsymbol");
         entity.taxinterfacety = row.IsNull("taxinterfacety") ? string.Empty : row.Field<string>("taxinterfacety");
         entity.modvtfl = row.Field<bool>("modvtfl");
         entity.shiptofl = row.Field<bool>("shiptofl");
         entity.termsoverfl = row.Field<bool>("termsoverfl");
         entity.fiGeoCodeSensitive = row.Field<bool>("fiGeoCode-sensitive");
         entity.tgOutOfCityFlSensitive = row.Field<bool>("tgOutOfCityFl-sensitive");
         entity.btnLookupGeoCdSensitive = row.Field<bool>("btnLookupGeoCd-sensitive");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeblanketheadersingle(ref DataRow row, Oeblanketheadersingle entity)
      {
         row.SetField("orderno", entity.orderno);
         row.SetField("ordersuf", entity.ordersuf);
         row.SetField("ordernotesfl", entity.ordernotesfl);
         row.SetField("transtype", entity.transtype);
         row.SetField("custno", entity.custno);
         row.SetField("custnotesfl", entity.custnotesfl);
         row.SetField("name", entity.name);
         row.SetField("billtoaddr1", entity.billtoaddr1);
         row.SetField("billtoaddr2", entity.billtoaddr2);
         row.SetField("billtoaddr3", entity.billtoaddr3);
         row.SetField("billtocity", entity.billtocity);
         row.SetField("billtost", entity.billtost);
         row.SetField("billtozipcd", entity.billtozipcd);
         row.SetField("billtocountrycd", entity.billtocountrycd);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptonm", entity.shiptonm);
         row.SetField("shiptoaddr1", entity.shiptoaddr1);
         row.SetField("shiptoaddr2", entity.shiptoaddr2);
         row.SetField("shiptoaddr3", entity.shiptoaddr3);
         row.SetField("shiptocity", entity.shiptocity);
         row.SetField("shiptost", entity.shiptost);
         row.SetField("shiptozipcd", entity.shiptozipcd);
         row.SetField("shiptocountry", entity.shiptocountry);
         row.SetField("shiptonotesfl", entity.shiptonotesfl);
         row.SetField("geocd", entity.geocd);
         row.SetField("outofcityfl", entity.outofcityfl);
         row.SetField("promisedt", entity.promisedt);
         row.SetField("promisedt-o", entity.promisedtO);
         row.SetField("origpromisedt", entity.origpromisedt);
         row.SetField("origpromisedt-o", entity.origpromisedtO);
         row.SetField("reqshipdt", entity.reqshipdt);
         row.SetField("reqshipdt-o", entity.reqshipdtO);
         row.SetField("billdt", entity.billdt);
         row.SetField("shipviaty", entity.shipviaty);
         row.SetField("shipviadesc", entity.shipviadesc);
         row.SetField("shipinstr", entity.shipinstr);
         row.SetField("extshipinstr", entity.extshipinstr);
         row.SetField("nolineitem", entity.nolineitem);
         row.SetField("lumpbillfl", entity.lumpbillfl);
         row.SetField("lumpbillamt", entity.lumpbillamt);
         row.SetField("totinvamt", entity.totinvamt);
         row.SetField("totweight", entity.totweight);
         row.SetField("totamt", entity.totamt);
         row.SetField("totqtyord", entity.totqtyord);
         row.SetField("totqtyshp", entity.totqtyshp);
         row.SetField("totcube", entity.totcube);
         row.SetField("remain", entity.remain);
         row.SetField("inbndfrtfl", entity.inbndfrtfl);
         row.SetField("outbndfrtfl", entity.outbndfrtfl);
         row.SetField("pmfl", entity.pmfl);
         row.SetField("datc", entity.datc);
         row.SetField("addonno1", entity.addonno1);
         row.SetField("addonamt1", entity.addonamt1);
         row.SetField("addonnet1", entity.addonnet1);
         row.SetField("addonlabel1", entity.addonlabel1);
         row.SetField("addonno2", entity.addonno2);
         row.SetField("addonamt2", entity.addonamt2);
         row.SetField("addonnet2", entity.addonnet2);
         row.SetField("addonlabel2", entity.addonlabel2);
         row.SetField("addonno3", entity.addonno3);
         row.SetField("addonamt3", entity.addonamt3);
         row.SetField("addonnet3", entity.addonnet3);
         row.SetField("addonlabel3", entity.addonlabel3);
         row.SetField("addonno4", entity.addonno4);
         row.SetField("addonamt4", entity.addonamt4);
         row.SetField("addonnet4", entity.addonnet4);
         row.SetField("addonlabel4", entity.addonlabel4);
         row.SetField("orderdisp", entity.orderdisp);
         row.SetField("promisedtchangedfl", entity.promisedtchangedfl);
         row.SetField("origpromisedtchangedfl", entity.origpromisedtchangedfl);
         row.SetField("reqshipdtchangedfl", entity.reqshipdtchangedfl);
         row.SetField("lndtentfl", entity.lndtentfl);
         row.SetField("dtupdtype", entity.dtupdtype);
         row.SetField("promptflushdateupdtype", entity.promptflushdateupdtype);
         row.SetField("freeformaddr", entity.freeformaddr);
         row.SetField("currsymbol", entity.currsymbol);
         row.SetField("taxinterfacety", entity.taxinterfacety);
         row.SetField("modvtfl", entity.modvtfl);
         row.SetField("shiptofl", entity.shiptofl);
         row.SetField("termsoverfl", entity.termsoverfl);
         row.SetField("fiGeoCode-sensitive", entity.fiGeoCodeSensitive);
         row.SetField("tgOutOfCityFl-sensitive", entity.tgOutOfCityFlSensitive);
         row.SetField("btnLookupGeoCd-sensitive", entity.btnLookupGeoCdSensitive);

      }
   
   }
}
#pragma warning restore 1591