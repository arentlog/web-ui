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

namespace Infor.Sxe.WT.Data.Models.Pdsloadwtlinedetail
{
   [ModelName("Infor.Sxe.WT.Data.Models.Pdsloadwtlinedetail.Loadwtlinedetailresults")]
   public partial class Loadwtlinedetailresults : ModelBase
   {
      public int lineno { get; set; }
      public bool commentfl { get; set; }
      [StringValidationAttribute]
      public string nonstockty { get; set; }
      [StringValidationAttribute]
      public string shipprod { get; set; }
      [StringValidationAttribute]
      public string notesfl { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public decimal qtyord { get; set; }
      public decimal qtyship { get; set; }
      public decimal prodcost { get; set; }
      public decimal netamt { get; set; }
      public bool cancelfl { get; set; }
      public int orderaltno { get; set; }
      [StringValidationAttribute]
      public string sourcingtype { get; set; }
      [StringValidationAttribute]
      public string proddesc { get; set; }
      public decimal qtyrcv { get; set; }
      [StringValidationAttribute]
      public string approval { get; set; }
      public decimal custstkqtyshp { get; set; }
      public decimal custprodcost { get; set; }
      [StringValidationAttribute]
      public string brandcode { get; set; }
      [StringValidationAttribute]
      public string mfgprod { get; set; }
      [StringValidationAttribute]
      public string vendprod { get; set; }
      public bool msdsfl { get; set; }
      public decimal addonamt { get; set; }
      public decimal addonmarkupcost { get; set; }
      [StringValidationAttribute]
      public string addonmarkuptype { get; set; }
      public decimal addonpct { get; set; }
      [StringValidationAttribute]
      public string addontype { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadwtlinedetailresults BuildLoadwtlinedetailresultsFromRow(DataRow row)
      {
         Loadwtlinedetailresults entity = new Loadwtlinedetailresults();
         entity.lineno = row.IsNull("lineno") ? 0 : row.Field<int>("lineno");
         entity.commentfl = row.Field<bool>("commentfl");
         entity.nonstockty = row.IsNull("nonstockty") ? string.Empty : row.Field<string>("nonstockty");
         entity.shipprod = row.IsNull("shipprod") ? string.Empty : row.Field<string>("shipprod");
         entity.notesfl = row.IsNull("notesfl") ? string.Empty : row.Field<string>("notesfl");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.qtyord = row.IsNull("qtyord") ? decimal.Zero : row.Field<decimal>("qtyord");
         entity.qtyship = row.IsNull("qtyship") ? decimal.Zero : row.Field<decimal>("qtyship");
         entity.prodcost = row.IsNull("prodcost") ? decimal.Zero : row.Field<decimal>("prodcost");
         entity.netamt = row.IsNull("netamt") ? decimal.Zero : row.Field<decimal>("netamt");
         entity.cancelfl = row.Field<bool>("cancelfl");
         entity.orderaltno = row.IsNull("orderaltno") ? 0 : row.Field<int>("orderaltno");
         entity.sourcingtype = row.IsNull("sourcingtype") ? string.Empty : row.Field<string>("sourcingtype");
         entity.proddesc = row.IsNull("proddesc") ? string.Empty : row.Field<string>("proddesc");
         entity.qtyrcv = row.IsNull("qtyrcv") ? decimal.Zero : row.Field<decimal>("qtyrcv");
         entity.approval = row.IsNull("approval") ? string.Empty : row.Field<string>("approval");
         entity.custstkqtyshp = row.IsNull("custstkqtyshp") ? decimal.Zero : row.Field<decimal>("custstkqtyshp");
         entity.custprodcost = row.IsNull("custprodcost") ? decimal.Zero : row.Field<decimal>("custprodcost");
         entity.brandcode = row.IsNull("brandcode") ? string.Empty : row.Field<string>("brandcode");
         entity.mfgprod = row.IsNull("mfgprod") ? string.Empty : row.Field<string>("mfgprod");
         entity.vendprod = row.IsNull("vendprod") ? string.Empty : row.Field<string>("vendprod");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.addonamt = row.IsNull("addonamt") ? decimal.Zero : row.Field<decimal>("addonamt");
         entity.addonmarkupcost = row.IsNull("addonmarkupcost") ? decimal.Zero : row.Field<decimal>("addonmarkupcost");
         entity.addonmarkuptype = row.IsNull("addonmarkuptype") ? string.Empty : row.Field<string>("addonmarkuptype");
         entity.addonpct = row.IsNull("addonpct") ? decimal.Zero : row.Field<decimal>("addonpct");
         entity.addontype = row.IsNull("addontype") ? string.Empty : row.Field<string>("addontype");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadwtlinedetailresults(ref DataRow row, Loadwtlinedetailresults entity)
      {
         row.SetField("lineno", entity.lineno);
         row.SetField("commentfl", entity.commentfl);
         row.SetField("nonstockty", entity.nonstockty);
         row.SetField("shipprod", entity.shipprod);
         row.SetField("notesfl", entity.notesfl);
         row.SetField("unit", entity.unit);
         row.SetField("qtyord", entity.qtyord);
         row.SetField("qtyship", entity.qtyship);
         row.SetField("prodcost", entity.prodcost);
         row.SetField("netamt", entity.netamt);
         row.SetField("cancelfl", entity.cancelfl);
         row.SetField("orderaltno", entity.orderaltno);
         row.SetField("sourcingtype", entity.sourcingtype);
         row.SetField("proddesc", entity.proddesc);
         row.SetField("qtyrcv", entity.qtyrcv);
         row.SetField("approval", entity.approval);
         row.SetField("custstkqtyshp", entity.custstkqtyshp);
         row.SetField("custprodcost", entity.custprodcost);
         row.SetField("brandcode", entity.brandcode);
         row.SetField("mfgprod", entity.mfgprod);
         row.SetField("vendprod", entity.vendprod);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("addonamt", entity.addonamt);
         row.SetField("addonmarkupcost", entity.addonmarkupcost);
         row.SetField("addonmarkuptype", entity.addonmarkuptype);
         row.SetField("addonpct", entity.addonpct);
         row.SetField("addontype", entity.addontype);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
