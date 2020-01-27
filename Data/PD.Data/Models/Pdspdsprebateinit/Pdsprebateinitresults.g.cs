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

namespace Infor.Sxe.PD.Data.Models.Pdspdsprebateinit
{
   [ModelName("Infor.Sxe.PD.Data.Models.Pdspdsprebateinit.Pdsprebateinitresults")]
   public partial class Pdsprebateinitresults : ModelBase, IUserFields
   {
      public decimal rebrecno { get; set; }
      [StringValidationAttribute]
      public string clevelcd { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string customerName { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string shiptoName { get; set; }
      public decimal vendno { get; set; }
      [StringValidationAttribute]
      public string vendorName { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string prodDesc { get; set; }
      [StringValidationAttribute]
      public string custrebty { get; set; }
      [StringValidationAttribute]
      public string custrebtyDesc { get; set; }
      [StringValidationAttribute]
      public string rebatety { get; set; }
      [StringValidationAttribute]
      public string rebatetyDesc { get; set; }
      [StringValidationAttribute]
      public string rebsubty { get; set; }
      [StringValidationAttribute]
      public string rebsubtyDesc { get; set; }
      [StringValidationAttribute]
      public string prodprcty { get; set; }
      [StringValidationAttribute]
      public string prodprctyDesc { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string prodlineDesc { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      [StringValidationAttribute]
      public string prodcatDesc { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string whseName { get; set; }
      [StringValidationAttribute]
      public string region { get; set; }
      public DateTime? startdt { get; set; }
      [StringValidationAttribute]
      public string rebatecd { get; set; }
      [StringValidationAttribute]
      public string dropshipty { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      public DateTime? enddt { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      [StringValidationAttribute]
      public string contractno { get; set; }
      public bool contractnookfl { get; set; }
      public bool caprebfl { get; set; }
      public bool caprebokfl { get; set; }
      public bool contractcostfl { get; set; }
      public bool contractcostokfl { get; set; }
      [StringValidationAttribute]
      public string rebcalctyli { get; set; }
      [StringValidationAttribute]
      public string rebcalctypd { get; set; }
      [StringValidationAttribute]
      public string rebcalcty { get; set; }
      [StringValidationAttribute]
      public string rebatecosttyli { get; set; }
      [StringValidationAttribute]
      public string rebatecosttypd { get; set; }
      [StringValidationAttribute]
      public string rebatecostty { get; set; }
      public bool rebatecosttyokfl { get; set; }
      [StringValidationAttribute]
      public string rebatecosttylbl { get; set; }
      [StringValidationAttribute]
      public string margincosttyli { get; set; }
      [StringValidationAttribute]
      public string margincosttypd { get; set; }
      [StringValidationAttribute]
      public string margincostty { get; set; }
      public bool margincosttyokfl { get; set; }
      [StringValidationAttribute]
      public string rebdowntoli { get; set; }
      [StringValidationAttribute]
      public string rebdowntopd { get; set; }
      [StringValidationAttribute]
      public string rebdowntoty { get; set; }
      public bool rebdowntookfl { get; set; }
      [StringValidationAttribute]
      public string pricesheet { get; set; }
      public bool pricesheetokfl { get; set; }
      public bool pricesheetbtnokfl { get; set; }
      [StringValidationAttribute]
      public string pricesheetto { get; set; }
      public bool pricesheettookfl { get; set; }
      public bool pricesheettobtnokfl { get; set; }
      public DateTime? priceeffectivedate { get; set; }
      public bool priceeffectivedateokfl { get; set; }
      public DateTime? priceeffectivedateto { get; set; }
      public bool priceeffectivedatetookfl { get; set; }
      public decimal rebateamt { get; set; }
      public bool rebateamtokfl { get; set; }
      [StringValidationAttribute]
      public string rebateamtlbl { get; set; }
      public decimal rebatepct { get; set; }
      public bool rebatepctokfl { get; set; }
      [StringValidationAttribute]
      public string rebatepctlbl { get; set; }
      [StringValidationAttribute]
      public string unitper { get; set; }
      public bool unitperokfl { get; set; }
      public bool sharefl { get; set; }
      public bool shareokfl { get; set; }
      public bool manualfl { get; set; }
      public bool manualokfl { get; set; }
      public decimal sharepct { get; set; }
      public decimal capsellamount { get; set; }
      public bool capselltypefl { get; set; }
      public int contractlineno { get; set; }
      public bool contractlineokfl { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string prccurrencyty { get; set; }
      public bool lUsePricevfl { get; set; }
      [StringValidationAttribute]
      public string user1 { get; set; }
      [StringValidationAttribute]
      public string user2 { get; set; }
      [StringValidationAttribute]
      public string user3 { get; set; }
      [StringValidationAttribute]
      public string user4 { get; set; }
      [StringValidationAttribute]
      public string user5 { get; set; }
      public decimal? user6 { get; set; }
      public decimal? user7 { get; set; }
      public DateTime? user8 { get; set; }
      public DateTime? user9 { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pdsprebateinitresults BuildPdsprebateinitresultsFromRow(DataRow row)
      {
         Pdsprebateinitresults entity = new Pdsprebateinitresults();
         entity.rebrecno = row.IsNull("rebrecno") ? decimal.Zero : row.Field<decimal>("rebrecno");
         entity.clevelcd = row.IsNull("clevelcd") ? string.Empty : row.Field<string>("clevelcd");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.customerName = row.IsNull("customerName") ? string.Empty : row.Field<string>("customerName");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.shiptoName = row.IsNull("shiptoName") ? string.Empty : row.Field<string>("shiptoName");
         entity.vendno = row.IsNull("vendno") ? decimal.Zero : row.Field<decimal>("vendno");
         entity.vendorName = row.IsNull("vendorName") ? string.Empty : row.Field<string>("vendorName");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodDesc = row.IsNull("prodDesc") ? string.Empty : row.Field<string>("prodDesc");
         entity.custrebty = row.IsNull("custrebty") ? string.Empty : row.Field<string>("custrebty");
         entity.custrebtyDesc = row.IsNull("custrebtyDesc") ? string.Empty : row.Field<string>("custrebtyDesc");
         entity.rebatety = row.IsNull("rebatety") ? string.Empty : row.Field<string>("rebatety");
         entity.rebatetyDesc = row.IsNull("rebatetyDesc") ? string.Empty : row.Field<string>("rebatetyDesc");
         entity.rebsubty = row.IsNull("rebsubty") ? string.Empty : row.Field<string>("rebsubty");
         entity.rebsubtyDesc = row.IsNull("rebsubtyDesc") ? string.Empty : row.Field<string>("rebsubtyDesc");
         entity.prodprcty = row.IsNull("prodprcty") ? string.Empty : row.Field<string>("prodprcty");
         entity.prodprctyDesc = row.IsNull("prodprctyDesc") ? string.Empty : row.Field<string>("prodprctyDesc");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodlineDesc = row.IsNull("prodlineDesc") ? string.Empty : row.Field<string>("prodlineDesc");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodcatDesc = row.IsNull("prodcatDesc") ? string.Empty : row.Field<string>("prodcatDesc");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.whseName = row.IsNull("whseName") ? string.Empty : row.Field<string>("whseName");
         entity.region = row.IsNull("region") ? string.Empty : row.Field<string>("region");
         entity.startdt = row.Field<DateTime?>("startdt");
         entity.rebatecd = row.IsNull("rebatecd") ? string.Empty : row.Field<string>("rebatecd");
         entity.dropshipty = row.IsNull("dropshipty") ? string.Empty : row.Field<string>("dropshipty");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.enddt = row.Field<DateTime?>("enddt");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.contractno = row.IsNull("contractno") ? string.Empty : row.Field<string>("contractno");
         entity.contractnookfl = row.Field<bool>("contractnookfl");
         entity.caprebfl = row.Field<bool>("caprebfl");
         entity.caprebokfl = row.Field<bool>("caprebokfl");
         entity.contractcostfl = row.Field<bool>("contractcostfl");
         entity.contractcostokfl = row.Field<bool>("contractcostokfl");
         entity.rebcalctyli = row.IsNull("rebcalctyli") ? string.Empty : row.Field<string>("rebcalctyli");
         entity.rebcalctypd = row.IsNull("rebcalctypd") ? string.Empty : row.Field<string>("rebcalctypd");
         entity.rebcalcty = row.IsNull("rebcalcty") ? string.Empty : row.Field<string>("rebcalcty");
         entity.rebatecosttyli = row.IsNull("rebatecosttyli") ? string.Empty : row.Field<string>("rebatecosttyli");
         entity.rebatecosttypd = row.IsNull("rebatecosttypd") ? string.Empty : row.Field<string>("rebatecosttypd");
         entity.rebatecostty = row.IsNull("rebatecostty") ? string.Empty : row.Field<string>("rebatecostty");
         entity.rebatecosttyokfl = row.Field<bool>("rebatecosttyokfl");
         entity.rebatecosttylbl = row.IsNull("rebatecosttylbl") ? string.Empty : row.Field<string>("rebatecosttylbl");
         entity.margincosttyli = row.IsNull("margincosttyli") ? string.Empty : row.Field<string>("margincosttyli");
         entity.margincosttypd = row.IsNull("margincosttypd") ? string.Empty : row.Field<string>("margincosttypd");
         entity.margincostty = row.IsNull("margincostty") ? string.Empty : row.Field<string>("margincostty");
         entity.margincosttyokfl = row.Field<bool>("margincosttyokfl");
         entity.rebdowntoli = row.IsNull("rebdowntoli") ? string.Empty : row.Field<string>("rebdowntoli");
         entity.rebdowntopd = row.IsNull("rebdowntopd") ? string.Empty : row.Field<string>("rebdowntopd");
         entity.rebdowntoty = row.IsNull("rebdowntoty") ? string.Empty : row.Field<string>("rebdowntoty");
         entity.rebdowntookfl = row.Field<bool>("rebdowntookfl");
         entity.pricesheet = row.IsNull("pricesheet") ? string.Empty : row.Field<string>("pricesheet");
         entity.pricesheetokfl = row.Field<bool>("pricesheetokfl");
         entity.pricesheetbtnokfl = row.Field<bool>("pricesheetbtnokfl");
         entity.pricesheetto = row.IsNull("pricesheetto") ? string.Empty : row.Field<string>("pricesheetto");
         entity.pricesheettookfl = row.Field<bool>("pricesheettookfl");
         entity.pricesheettobtnokfl = row.Field<bool>("pricesheettobtnokfl");
         entity.priceeffectivedate = row.Field<DateTime?>("priceeffectivedate");
         entity.priceeffectivedateokfl = row.Field<bool>("priceeffectivedateokfl");
         entity.priceeffectivedateto = row.Field<DateTime?>("priceeffectivedateto");
         entity.priceeffectivedatetookfl = row.Field<bool>("priceeffectivedatetookfl");
         entity.rebateamt = row.IsNull("rebateamt") ? decimal.Zero : row.Field<decimal>("rebateamt");
         entity.rebateamtokfl = row.Field<bool>("rebateamtokfl");
         entity.rebateamtlbl = row.IsNull("rebateamtlbl") ? string.Empty : row.Field<string>("rebateamtlbl");
         entity.rebatepct = row.IsNull("rebatepct") ? decimal.Zero : row.Field<decimal>("rebatepct");
         entity.rebatepctokfl = row.Field<bool>("rebatepctokfl");
         entity.rebatepctlbl = row.IsNull("rebatepctlbl") ? string.Empty : row.Field<string>("rebatepctlbl");
         entity.unitper = row.IsNull("unitper") ? string.Empty : row.Field<string>("unitper");
         entity.unitperokfl = row.Field<bool>("unitperokfl");
         entity.sharefl = row.Field<bool>("sharefl");
         entity.shareokfl = row.Field<bool>("shareokfl");
         entity.manualfl = row.Field<bool>("manualfl");
         entity.manualokfl = row.Field<bool>("manualokfl");
         entity.sharepct = row.IsNull("sharepct") ? decimal.Zero : row.Field<decimal>("sharepct");
         entity.capsellamount = row.IsNull("capsellamount") ? decimal.Zero : row.Field<decimal>("capsellamount");
         entity.capselltypefl = row.Field<bool>("capselltypefl");
         entity.contractlineno = row.IsNull("contractlineno") ? 0 : row.Field<int>("contractlineno");
         entity.contractlineokfl = row.Field<bool>("contractlineokfl");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.prccurrencyty = row.IsNull("prccurrencyty") ? string.Empty : row.Field<string>("prccurrencyty");
         entity.lUsePricevfl = row.Field<bool>("lUsePricevfl");
         entity.user1 = row.IsNull("user1") ? string.Empty : row.Field<string>("user1");
         entity.user2 = row.IsNull("user2") ? string.Empty : row.Field<string>("user2");
         entity.user3 = row.IsNull("user3") ? string.Empty : row.Field<string>("user3");
         entity.user4 = row.IsNull("user4") ? string.Empty : row.Field<string>("user4");
         entity.user5 = row.IsNull("user5") ? string.Empty : row.Field<string>("user5");
         entity.user6 = row.Field<decimal?>("user6");
         entity.user7 = row.Field<decimal?>("user7");
         entity.user8 = row.Field<DateTime?>("user8");
         entity.user9 = row.Field<DateTime?>("user9");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPdsprebateinitresults(ref DataRow row, Pdsprebateinitresults entity)
      {
         row.SetField("rebrecno", entity.rebrecno);
         row.SetField("clevelcd", entity.clevelcd);
         row.SetField("custno", entity.custno);
         row.SetField("customerName", entity.customerName);
         row.SetField("shipto", entity.shipto);
         row.SetField("shiptoName", entity.shiptoName);
         row.SetField("vendno", entity.vendno);
         row.SetField("vendorName", entity.vendorName);
         row.SetField("prod", entity.prod);
         row.SetField("prodDesc", entity.prodDesc);
         row.SetField("custrebty", entity.custrebty);
         row.SetField("custrebtyDesc", entity.custrebtyDesc);
         row.SetField("rebatety", entity.rebatety);
         row.SetField("rebatetyDesc", entity.rebatetyDesc);
         row.SetField("rebsubty", entity.rebsubty);
         row.SetField("rebsubtyDesc", entity.rebsubtyDesc);
         row.SetField("prodprcty", entity.prodprcty);
         row.SetField("prodprctyDesc", entity.prodprctyDesc);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodlineDesc", entity.prodlineDesc);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodcatDesc", entity.prodcatDesc);
         row.SetField("whse", entity.whse);
         row.SetField("whseName", entity.whseName);
         row.SetField("region", entity.region);
         row.SetField("startdt", entity.startdt);
         row.SetField("rebatecd", entity.rebatecd);
         row.SetField("dropshipty", entity.dropshipty);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("enddt", entity.enddt);
         row.SetField("refer", entity.refer);
         row.SetField("contractno", entity.contractno);
         row.SetField("contractnookfl", entity.contractnookfl);
         row.SetField("caprebfl", entity.caprebfl);
         row.SetField("caprebokfl", entity.caprebokfl);
         row.SetField("contractcostfl", entity.contractcostfl);
         row.SetField("contractcostokfl", entity.contractcostokfl);
         row.SetField("rebcalctyli", entity.rebcalctyli);
         row.SetField("rebcalctypd", entity.rebcalctypd);
         row.SetField("rebcalcty", entity.rebcalcty);
         row.SetField("rebatecosttyli", entity.rebatecosttyli);
         row.SetField("rebatecosttypd", entity.rebatecosttypd);
         row.SetField("rebatecostty", entity.rebatecostty);
         row.SetField("rebatecosttyokfl", entity.rebatecosttyokfl);
         row.SetField("rebatecosttylbl", entity.rebatecosttylbl);
         row.SetField("margincosttyli", entity.margincosttyli);
         row.SetField("margincosttypd", entity.margincosttypd);
         row.SetField("margincostty", entity.margincostty);
         row.SetField("margincosttyokfl", entity.margincosttyokfl);
         row.SetField("rebdowntoli", entity.rebdowntoli);
         row.SetField("rebdowntopd", entity.rebdowntopd);
         row.SetField("rebdowntoty", entity.rebdowntoty);
         row.SetField("rebdowntookfl", entity.rebdowntookfl);
         row.SetField("pricesheet", entity.pricesheet);
         row.SetField("pricesheetokfl", entity.pricesheetokfl);
         row.SetField("pricesheetbtnokfl", entity.pricesheetbtnokfl);
         row.SetField("pricesheetto", entity.pricesheetto);
         row.SetField("pricesheettookfl", entity.pricesheettookfl);
         row.SetField("pricesheettobtnokfl", entity.pricesheettobtnokfl);
         row.SetField("priceeffectivedate", entity.priceeffectivedate);
         row.SetField("priceeffectivedateokfl", entity.priceeffectivedateokfl);
         row.SetField("priceeffectivedateto", entity.priceeffectivedateto);
         row.SetField("priceeffectivedatetookfl", entity.priceeffectivedatetookfl);
         row.SetField("rebateamt", entity.rebateamt);
         row.SetField("rebateamtokfl", entity.rebateamtokfl);
         row.SetField("rebateamtlbl", entity.rebateamtlbl);
         row.SetField("rebatepct", entity.rebatepct);
         row.SetField("rebatepctokfl", entity.rebatepctokfl);
         row.SetField("rebatepctlbl", entity.rebatepctlbl);
         row.SetField("unitper", entity.unitper);
         row.SetField("unitperokfl", entity.unitperokfl);
         row.SetField("sharefl", entity.sharefl);
         row.SetField("shareokfl", entity.shareokfl);
         row.SetField("manualfl", entity.manualfl);
         row.SetField("manualokfl", entity.manualokfl);
         row.SetField("sharepct", entity.sharepct);
         row.SetField("capsellamount", entity.capsellamount);
         row.SetField("capselltypefl", entity.capselltypefl);
         row.SetField("contractlineno", entity.contractlineno);
         row.SetField("contractlineokfl", entity.contractlineokfl);
         row.SetField("price", entity.price);
         row.SetField("prccurrencyty", entity.prccurrencyty);
         row.SetField("lUsePricevfl", entity.lUsePricevfl);
         row.SetField("user1", entity.user1);
         row.SetField("user2", entity.user2);
         row.SetField("user3", entity.user3);
         row.SetField("user4", entity.user4);
         row.SetField("user5", entity.user5);
         row.SetField("user6", entity.user6);
         row.SetField("user7", entity.user7);
         row.SetField("user8", entity.user8);
         row.SetField("user9", entity.user9);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591