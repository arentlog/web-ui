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

namespace Infor.Sxe.IC.Data.Models.Pdsicir
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicir.Icirresults")]
   public partial class Icirresults : ModelBase
   {
      public int cono { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      [StringValidationAttribute]
      public string prodnotesfl { get; set; }
      public decimal custno { get; set; }
      [StringValidationAttribute]
      public string shipto { get; set; }
      [StringValidationAttribute]
      public string custnm { get; set; }
      [StringValidationAttribute]
      public string custprod { get; set; }
      public decimal qty { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal price { get; set; }
      public decimal extprice { get; set; }
      public decimal orderpt { get; set; }
      public decimal linept { get; set; }
      public decimal ordqty { get; set; }
      public DateTime? lastrcptdt { get; set; }
      public DateTime? lastinvdt { get; set; }
      public bool criticalfl { get; set; }
      public int leadtm { get; set; }
      public decimal discamt { get; set; }
      public bool disctype { get; set; }
      public bool displayfl { get; set; }
      [StringValidationAttribute]
      public string xrefprodty { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icirresults BuildIcirresultsFromRow(DataRow row)
      {
         Icirresults entity = new Icirresults();
         entity.cono = row.IsNull("cono") ? 0 : row.Field<int>("cono");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.prodnotesfl = row.IsNull("prodnotesfl") ? string.Empty : row.Field<string>("prodnotesfl");
         entity.custno = row.IsNull("custno") ? decimal.Zero : row.Field<decimal>("custno");
         entity.shipto = row.IsNull("shipto") ? string.Empty : row.Field<string>("shipto");
         entity.custnm = row.IsNull("custnm") ? string.Empty : row.Field<string>("custnm");
         entity.custprod = row.IsNull("custprod") ? string.Empty : row.Field<string>("custprod");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.extprice = row.IsNull("extprice") ? decimal.Zero : row.Field<decimal>("extprice");
         entity.orderpt = row.IsNull("orderpt") ? decimal.Zero : row.Field<decimal>("orderpt");
         entity.linept = row.IsNull("linept") ? decimal.Zero : row.Field<decimal>("linept");
         entity.ordqty = row.IsNull("ordqty") ? decimal.Zero : row.Field<decimal>("ordqty");
         entity.lastrcptdt = row.Field<DateTime?>("lastrcptdt");
         entity.lastinvdt = row.Field<DateTime?>("lastinvdt");
         entity.criticalfl = row.Field<bool>("criticalfl");
         entity.leadtm = row.IsNull("leadtm") ? 0 : row.Field<int>("leadtm");
         entity.discamt = row.IsNull("discamt") ? decimal.Zero : row.Field<decimal>("discamt");
         entity.disctype = row.Field<bool>("disctype");
         entity.displayfl = row.Field<bool>("displayfl");
         entity.xrefprodty = row.IsNull("xrefprodty") ? string.Empty : row.Field<string>("xrefprodty");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcirresults(ref DataRow row, Icirresults entity)
      {
         row.SetField("cono", entity.cono);
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("prodnotesfl", entity.prodnotesfl);
         row.SetField("custno", entity.custno);
         row.SetField("shipto", entity.shipto);
         row.SetField("custnm", entity.custnm);
         row.SetField("custprod", entity.custprod);
         row.SetField("qty", entity.qty);
         row.SetField("unit", entity.unit);
         row.SetField("price", entity.price);
         row.SetField("extprice", entity.extprice);
         row.SetField("orderpt", entity.orderpt);
         row.SetField("linept", entity.linept);
         row.SetField("ordqty", entity.ordqty);
         row.SetField("lastrcptdt", entity.lastrcptdt);
         row.SetField("lastinvdt", entity.lastinvdt);
         row.SetField("criticalfl", entity.criticalfl);
         row.SetField("leadtm", entity.leadtm);
         row.SetField("discamt", entity.discamt);
         row.SetField("disctype", entity.disctype);
         row.SetField("displayfl", entity.displayfl);
         row.SetField("xrefprodty", entity.xrefprodty);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591