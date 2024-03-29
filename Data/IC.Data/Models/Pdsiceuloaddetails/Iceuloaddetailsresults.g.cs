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

namespace Infor.Sxe.IC.Data.Models.Pdsiceuloaddetails
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceuloaddetails.Iceuloaddetailsresults")]
   public partial class Iceuloaddetailsresults : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prodlookupnm { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal qtyonhand { get; set; }
      public decimal qtyreservd { get; set; }
      public decimal qtyunavail { get; set; }
      public decimal qtyonorder { get; set; }
      public decimal qtybo { get; set; }
      public decimal netavail { get; set; }
      [StringValidationAttribute]
      public string msg { get; set; }
      [StringValidationAttribute]
      public string reasunavty { get; set; }
      public decimal qtyunavailforreason { get; set; }
      public decimal stkqtyship { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public int orderno { get; set; }
      [StringValidationAttribute]
      public string refer { get; set; }
      public bool ordernoenabled { get; set; }
      public bool reasunavtyenabled { get; set; }
      [StringValidationAttribute]
      public string stkqtyshiplabel { get; set; }
      [StringValidationAttribute]
      public string reasunavtylabel { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceuloaddetailsresults BuildIceuloaddetailsresultsFromRow(DataRow row)
      {
         Iceuloaddetailsresults entity = new Iceuloaddetailsresults();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prodlookupnm = row.IsNull("prodlookupnm") ? string.Empty : row.Field<string>("prodlookupnm");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtyonhand = row.IsNull("qtyonhand") ? decimal.Zero : row.Field<decimal>("qtyonhand");
         entity.qtyreservd = row.IsNull("qtyreservd") ? decimal.Zero : row.Field<decimal>("qtyreservd");
         entity.qtyunavail = row.IsNull("qtyunavail") ? decimal.Zero : row.Field<decimal>("qtyunavail");
         entity.qtyonorder = row.IsNull("qtyonorder") ? decimal.Zero : row.Field<decimal>("qtyonorder");
         entity.qtybo = row.IsNull("qtybo") ? decimal.Zero : row.Field<decimal>("qtybo");
         entity.netavail = row.IsNull("netavail") ? decimal.Zero : row.Field<decimal>("netavail");
         entity.msg = row.IsNull("msg") ? string.Empty : row.Field<string>("msg");
         entity.reasunavty = row.IsNull("reasunavty") ? string.Empty : row.Field<string>("reasunavty");
         entity.qtyunavailforreason = row.IsNull("qtyunavailforreason") ? decimal.Zero : row.Field<decimal>("qtyunavailforreason");
         entity.stkqtyship = row.IsNull("stkqtyship") ? decimal.Zero : row.Field<decimal>("stkqtyship");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.orderno = row.IsNull("orderno") ? 0 : row.Field<int>("orderno");
         entity.refer = row.IsNull("refer") ? string.Empty : row.Field<string>("refer");
         entity.ordernoenabled = row.Field<bool>("ordernoenabled");
         entity.reasunavtyenabled = row.Field<bool>("reasunavtyenabled");
         entity.stkqtyshiplabel = row.IsNull("stkqtyshiplabel") ? string.Empty : row.Field<string>("stkqtyshiplabel");
         entity.reasunavtylabel = row.IsNull("reasunavtylabel") ? string.Empty : row.Field<string>("reasunavtylabel");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceuloaddetailsresults(ref DataRow row, Iceuloaddetailsresults entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("prodlookupnm", entity.prodlookupnm);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtyonhand", entity.qtyonhand);
         row.SetField("qtyreservd", entity.qtyreservd);
         row.SetField("qtyunavail", entity.qtyunavail);
         row.SetField("qtyonorder", entity.qtyonorder);
         row.SetField("qtybo", entity.qtybo);
         row.SetField("netavail", entity.netavail);
         row.SetField("msg", entity.msg);
         row.SetField("reasunavty", entity.reasunavty);
         row.SetField("qtyunavailforreason", entity.qtyunavailforreason);
         row.SetField("stkqtyship", entity.stkqtyship);
         row.SetField("unit", entity.unit);
         row.SetField("orderno", entity.orderno);
         row.SetField("refer", entity.refer);
         row.SetField("ordernoenabled", entity.ordernoenabled);
         row.SetField("reasunavtyenabled", entity.reasunavtyenabled);
         row.SetField("stkqtyshiplabel", entity.stkqtyshiplabel);
         row.SetField("reasunavtylabel", entity.reasunavtylabel);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
