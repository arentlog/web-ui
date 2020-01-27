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

namespace Infor.Sxe.IC.Data.Models.Pdsiceanmaintinventory
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceanmaintinventory.Iceanmaintinventorysingle")]
   public partial class Iceanmaintinventorysingle : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public decimal arpvendno { get; set; }
      [StringValidationAttribute]
      public string arpvendname { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string prodlinedesc { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string whsename { get; set; }
      public decimal lastcost { get; set; }
      [StringValidationAttribute]
      public string srctype { get; set; }
      public decimal srcvendno { get; set; }
      [StringValidationAttribute]
      public string srcvendname { get; set; }
      [StringValidationAttribute]
      public string srcwhse { get; set; }
      public decimal newlastcost { get; set; }
      [StringValidationAttribute]
      public string ncnr { get; set; }
      [StringValidationAttribute]
      public string eccnclasscd { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      [StringValidationAttribute]
      public string tariffcd { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceanmaintinventorysingle BuildIceanmaintinventorysingleFromRow(DataRow row)
      {
         Iceanmaintinventorysingle entity = new Iceanmaintinventorysingle();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.arpvendno = row.IsNull("arpvendno") ? decimal.Zero : row.Field<decimal>("arpvendno");
         entity.arpvendname = row.IsNull("arpvendname") ? string.Empty : row.Field<string>("arpvendname");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.prodlinedesc = row.IsNull("prodlinedesc") ? string.Empty : row.Field<string>("prodlinedesc");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.whsename = row.IsNull("whsename") ? string.Empty : row.Field<string>("whsename");
         entity.lastcost = row.IsNull("lastcost") ? decimal.Zero : row.Field<decimal>("lastcost");
         entity.srctype = row.IsNull("srctype") ? string.Empty : row.Field<string>("srctype");
         entity.srcvendno = row.IsNull("srcvendno") ? decimal.Zero : row.Field<decimal>("srcvendno");
         entity.srcvendname = row.IsNull("srcvendname") ? string.Empty : row.Field<string>("srcvendname");
         entity.srcwhse = row.IsNull("srcwhse") ? string.Empty : row.Field<string>("srcwhse");
         entity.newlastcost = row.IsNull("newlastcost") ? decimal.Zero : row.Field<decimal>("newlastcost");
         entity.ncnr = row.IsNull("ncnr") ? string.Empty : row.Field<string>("ncnr");
         entity.eccnclasscd = row.IsNull("eccnclasscd") ? string.Empty : row.Field<string>("eccnclasscd");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.tariffcd = row.IsNull("tariffcd") ? string.Empty : row.Field<string>("tariffcd");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceanmaintinventorysingle(ref DataRow row, Iceanmaintinventorysingle entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("descrip", entity.descrip);
         row.SetField("arpvendno", entity.arpvendno);
         row.SetField("arpvendname", entity.arpvendname);
         row.SetField("prodline", entity.prodline);
         row.SetField("prodlinedesc", entity.prodlinedesc);
         row.SetField("whse", entity.whse);
         row.SetField("whsename", entity.whsename);
         row.SetField("lastcost", entity.lastcost);
         row.SetField("srctype", entity.srctype);
         row.SetField("srcvendno", entity.srcvendno);
         row.SetField("srcvendname", entity.srcvendname);
         row.SetField("srcwhse", entity.srcwhse);
         row.SetField("newlastcost", entity.newlastcost);
         row.SetField("ncnr", entity.ncnr);
         row.SetField("eccnclasscd", entity.eccnclasscd);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("tariffcd", entity.tariffcd);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
