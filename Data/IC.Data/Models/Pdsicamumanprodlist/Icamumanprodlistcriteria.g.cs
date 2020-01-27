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

namespace Infor.Sxe.IC.Data.Models.Pdsicamumanprodlist
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsicamumanprodlist.Icamumanprodlistcriteria")]
   public partial class Icamumanprodlistcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string validatelist { get; set; }
      [StringValidationAttribute]
      public string fromwhse { get; set; }
      [StringValidationAttribute]
      public string towhse { get; set; }
      [StringValidationAttribute]
      public string fromprod { get; set; }
      [StringValidationAttribute]
      public string toprod { get; set; }
      [StringValidationAttribute]
      public string fromrank { get; set; }
      [StringValidationAttribute]
      public string torank { get; set; }
      public DateTime? fmacquiredt { get; set; }
      public DateTime? toacquiredt { get; set; }
      public decimal vendorno { get; set; }
      [StringValidationAttribute]
      public string prodline { get; set; }
      [StringValidationAttribute]
      public string pricetype { get; set; }
      [StringValidationAttribute]
      public string category { get; set; }
      [StringValidationAttribute]
      public string slgroup { get; set; }
      [StringValidationAttribute]
      public string stndpack { get; set; }
      [StringValidationAttribute]
      public string ordcalcty { get; set; }
      public int leadtime { get; set; }
      [StringValidationAttribute]
      public string frozendate { get; set; }
      [StringValidationAttribute]
      public string frozentype { get; set; }
      public int frozenmonths { get; set; }
      [StringValidationAttribute]
      public string usagectrl { get; set; }
      public int usagemonths { get; set; }
      [StringValidationAttribute]
      public string surplusty { get; set; }
      [StringValidationAttribute]
      public string rebatetype { get; set; }
      [StringValidationAttribute]
      public string rebsubtype { get; set; }
      [StringValidationAttribute]
      public string countryoforigin { get; set; }
      public int noproducts { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Icamumanprodlistcriteria BuildIcamumanprodlistcriteriaFromRow(DataRow row)
      {
         Icamumanprodlistcriteria entity = new Icamumanprodlistcriteria();
         entity.validatelist = row.IsNull("validatelist") ? string.Empty : row.Field<string>("validatelist");
         entity.fromwhse = row.IsNull("fromwhse") ? string.Empty : row.Field<string>("fromwhse");
         entity.towhse = row.IsNull("towhse") ? string.Empty : row.Field<string>("towhse");
         entity.fromprod = row.IsNull("fromprod") ? string.Empty : row.Field<string>("fromprod");
         entity.toprod = row.IsNull("toprod") ? string.Empty : row.Field<string>("toprod");
         entity.fromrank = row.IsNull("fromrank") ? string.Empty : row.Field<string>("fromrank");
         entity.torank = row.IsNull("torank") ? string.Empty : row.Field<string>("torank");
         entity.fmacquiredt = row.Field<DateTime?>("fmacquiredt");
         entity.toacquiredt = row.Field<DateTime?>("toacquiredt");
         entity.vendorno = row.IsNull("vendorno") ? decimal.Zero : row.Field<decimal>("vendorno");
         entity.prodline = row.IsNull("prodline") ? string.Empty : row.Field<string>("prodline");
         entity.pricetype = row.IsNull("pricetype") ? string.Empty : row.Field<string>("pricetype");
         entity.category = row.IsNull("category") ? string.Empty : row.Field<string>("category");
         entity.slgroup = row.IsNull("slgroup") ? string.Empty : row.Field<string>("slgroup");
         entity.stndpack = row.IsNull("stndpack") ? string.Empty : row.Field<string>("stndpack");
         entity.ordcalcty = row.IsNull("ordcalcty") ? string.Empty : row.Field<string>("ordcalcty");
         entity.leadtime = row.IsNull("leadtime") ? 0 : row.Field<int>("leadtime");
         entity.frozendate = row.IsNull("frozendate") ? string.Empty : row.Field<string>("frozendate");
         entity.frozentype = row.IsNull("frozentype") ? string.Empty : row.Field<string>("frozentype");
         entity.frozenmonths = row.IsNull("frozenmonths") ? 0 : row.Field<int>("frozenmonths");
         entity.usagectrl = row.IsNull("usagectrl") ? string.Empty : row.Field<string>("usagectrl");
         entity.usagemonths = row.IsNull("usagemonths") ? 0 : row.Field<int>("usagemonths");
         entity.surplusty = row.IsNull("surplusty") ? string.Empty : row.Field<string>("surplusty");
         entity.rebatetype = row.IsNull("rebatetype") ? string.Empty : row.Field<string>("rebatetype");
         entity.rebsubtype = row.IsNull("rebsubtype") ? string.Empty : row.Field<string>("rebsubtype");
         entity.countryoforigin = row.IsNull("countryoforigin") ? string.Empty : row.Field<string>("countryoforigin");
         entity.noproducts = row.IsNull("noproducts") ? 0 : row.Field<int>("noproducts");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIcamumanprodlistcriteria(ref DataRow row, Icamumanprodlistcriteria entity)
      {
         row.SetField("validatelist", entity.validatelist);
         row.SetField("fromwhse", entity.fromwhse);
         row.SetField("towhse", entity.towhse);
         row.SetField("fromprod", entity.fromprod);
         row.SetField("toprod", entity.toprod);
         row.SetField("fromrank", entity.fromrank);
         row.SetField("torank", entity.torank);
         row.SetField("fmacquiredt", entity.fmacquiredt);
         row.SetField("toacquiredt", entity.toacquiredt);
         row.SetField("vendorno", entity.vendorno);
         row.SetField("prodline", entity.prodline);
         row.SetField("pricetype", entity.pricetype);
         row.SetField("category", entity.category);
         row.SetField("slgroup", entity.slgroup);
         row.SetField("stndpack", entity.stndpack);
         row.SetField("ordcalcty", entity.ordcalcty);
         row.SetField("leadtime", entity.leadtime);
         row.SetField("frozendate", entity.frozendate);
         row.SetField("frozentype", entity.frozentype);
         row.SetField("frozenmonths", entity.frozenmonths);
         row.SetField("usagectrl", entity.usagectrl);
         row.SetField("usagemonths", entity.usagemonths);
         row.SetField("surplusty", entity.surplusty);
         row.SetField("rebatetype", entity.rebatetype);
         row.SetField("rebsubtype", entity.rebsubtype);
         row.SetField("countryoforigin", entity.countryoforigin);
         row.SetField("noproducts", entity.noproducts);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
