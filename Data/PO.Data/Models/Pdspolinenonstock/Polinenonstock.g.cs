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

namespace Infor.Sxe.PO.Data.Models.Pdspolinenonstock
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdspolinenonstock.Polinenonstock")]
   public partial class Polinenonstock : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      public bool prodenabled { get; set; }
      [StringValidationAttribute]
      public string proddesc1 { get; set; }
      [StringValidationAttribute]
      public string proddesc2 { get; set; }
      public bool proddescenabled { get; set; }
      public decimal cubes { get; set; }
      public bool cubesenabled { get; set; }
      public decimal weight { get; set; }
      public bool weightenabled { get; set; }
      [StringValidationAttribute]
      public string currencyty { get; set; }
      public bool currencytyhidden { get; set; }
      [StringValidationAttribute]
      public string currencytyshort { get; set; }
      public bool currencytyshorthidden { get; set; }
      public decimal exchangerate { get; set; }
      public bool exchangeratehidden { get; set; }
      public decimal foreigncost { get; set; }
      public bool foreigncosthidden { get; set; }
      public decimal calcprice { get; set; }
      public bool calcpriceenabled { get; set; }
      public bool calcpricehidden { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      public bool ncnrenabled { get; set; }
      [StringValidationAttribute]
      public string prodcat { get; set; }
      public bool prodcatenabled { get; set; }
      public bool prodcathidden { get; set; }
      [StringValidationAttribute]
      public string prodcatdesc { get; set; }
      public bool calculatebuttonenabled { get; set; }
      public bool calculatebuttonhidden { get; set; }
      [StringValidationAttribute]
      public string txttitle { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      public decimal dutyrate { get; set; }
      [StringValidationAttribute]
      public string upcid { get; set; }
      public bool promptforcespecialfl { get; set; }
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
      public string userfield { get; set; }


      public static Polinenonstock BuildPolinenonstockFromRow(DataRow row)
      {
         Polinenonstock entity = new Polinenonstock();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.prodenabled = row.Field<bool>("prodenabled");
         entity.proddesc1 = row.IsNull("proddesc1") ? string.Empty : row.Field<string>("proddesc1");
         entity.proddesc2 = row.IsNull("proddesc2") ? string.Empty : row.Field<string>("proddesc2");
         entity.proddescenabled = row.Field<bool>("proddescenabled");
         entity.cubes = row.IsNull("cubes") ? decimal.Zero : row.Field<decimal>("cubes");
         entity.cubesenabled = row.Field<bool>("cubesenabled");
         entity.weight = row.IsNull("weight") ? decimal.Zero : row.Field<decimal>("weight");
         entity.weightenabled = row.Field<bool>("weightenabled");
         entity.currencyty = row.IsNull("currencyty") ? string.Empty : row.Field<string>("currencyty");
         entity.currencytyhidden = row.Field<bool>("currencytyhidden");
         entity.currencytyshort = row.IsNull("currencytyshort") ? string.Empty : row.Field<string>("currencytyshort");
         entity.currencytyshorthidden = row.Field<bool>("currencytyshorthidden");
         entity.exchangerate = row.IsNull("exchangerate") ? decimal.Zero : row.Field<decimal>("exchangerate");
         entity.exchangeratehidden = row.Field<bool>("exchangeratehidden");
         entity.foreigncost = row.IsNull("foreigncost") ? decimal.Zero : row.Field<decimal>("foreigncost");
         entity.foreigncosthidden = row.Field<bool>("foreigncosthidden");
         entity.calcprice = row.IsNull("calcprice") ? decimal.Zero : row.Field<decimal>("calcprice");
         entity.calcpriceenabled = row.Field<bool>("calcpriceenabled");
         entity.calcpricehidden = row.Field<bool>("calcpricehidden");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.ncnrenabled = row.Field<bool>("ncnrenabled");
         entity.prodcat = row.IsNull("prodcat") ? string.Empty : row.Field<string>("prodcat");
         entity.prodcatenabled = row.Field<bool>("prodcatenabled");
         entity.prodcathidden = row.Field<bool>("prodcathidden");
         entity.prodcatdesc = row.IsNull("prodcatdesc") ? string.Empty : row.Field<string>("prodcatdesc");
         entity.calculatebuttonenabled = row.Field<bool>("calculatebuttonenabled");
         entity.calculatebuttonhidden = row.Field<bool>("calculatebuttonhidden");
         entity.txttitle = row.IsNull("txttitle") ? string.Empty : row.Field<string>("txttitle");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.dutyrate = row.IsNull("dutyrate") ? decimal.Zero : row.Field<decimal>("dutyrate");
         entity.upcid = row.IsNull("upcid") ? string.Empty : row.Field<string>("upcid");
         entity.promptforcespecialfl = row.Field<bool>("promptforcespecialfl");
         entity.quesanswer = row.IsNull("quesanswer") ? string.Empty : row.Field<string>("quesanswer");
         entity.quesdescrip1 = row.IsNull("quesdescrip1") ? string.Empty : row.Field<string>("quesdescrip1");
         entity.quesdescrip2 = row.IsNull("quesdescrip2") ? string.Empty : row.Field<string>("quesdescrip2");
         entity.quespriceavail = row.IsNull("quespriceavail") ? string.Empty : row.Field<string>("quespriceavail");
         entity.quesprodcat = row.IsNull("quesprodcat") ? string.Empty : row.Field<string>("quesprodcat");
         entity.quesmessage = row.IsNull("quesmessage") ? string.Empty : row.Field<string>("quesmessage");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPolinenonstock(ref DataRow row, Polinenonstock entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("prodenabled", entity.prodenabled);
         row.SetField("proddesc1", entity.proddesc1);
         row.SetField("proddesc2", entity.proddesc2);
         row.SetField("proddescenabled", entity.proddescenabled);
         row.SetField("cubes", entity.cubes);
         row.SetField("cubesenabled", entity.cubesenabled);
         row.SetField("weight", entity.weight);
         row.SetField("weightenabled", entity.weightenabled);
         row.SetField("currencyty", entity.currencyty);
         row.SetField("currencytyhidden", entity.currencytyhidden);
         row.SetField("currencytyshort", entity.currencytyshort);
         row.SetField("currencytyshorthidden", entity.currencytyshorthidden);
         row.SetField("exchangerate", entity.exchangerate);
         row.SetField("exchangeratehidden", entity.exchangeratehidden);
         row.SetField("foreigncost", entity.foreigncost);
         row.SetField("foreigncosthidden", entity.foreigncosthidden);
         row.SetField("calcprice", entity.calcprice);
         row.SetField("calcpriceenabled", entity.calcpriceenabled);
         row.SetField("calcpricehidden", entity.calcpricehidden);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("ncnrenabled", entity.ncnrenabled);
         row.SetField("prodcat", entity.prodcat);
         row.SetField("prodcatenabled", entity.prodcatenabled);
         row.SetField("prodcathidden", entity.prodcathidden);
         row.SetField("prodcatdesc", entity.prodcatdesc);
         row.SetField("calculatebuttonenabled", entity.calculatebuttonenabled);
         row.SetField("calculatebuttonhidden", entity.calculatebuttonhidden);
         row.SetField("txttitle", entity.txttitle);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("dutyrate", entity.dutyrate);
         row.SetField("upcid", entity.upcid);
         row.SetField("promptforcespecialfl", entity.promptforcespecialfl);
         row.SetField("quesanswer", entity.quesanswer);
         row.SetField("quesdescrip1", entity.quesdescrip1);
         row.SetField("quesdescrip2", entity.quesdescrip2);
         row.SetField("quespriceavail", entity.quespriceavail);
         row.SetField("quesprodcat", entity.quesprodcat);
         row.SetField("quesmessage", entity.quesmessage);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591