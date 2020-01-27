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

namespace Infor.Sxe.SA.Data.Models.Pdssasgaddonsresults
{
   [ModelName("Infor.Sxe.SA.Data.Models.Pdssasgaddonsresults.Sasgaddonsresults")]
   public partial class Sasgaddonsresults : ModelBase
   {
      public int addonno { get; set; }
      [StringValidationAttribute]
      public string descrip { get; set; }
      public int taxtype { get; set; }
      public int otaxtype { get; set; }
      [StringValidationAttribute]
      public string taxdesc { get; set; }
      [StringValidationAttribute]
      public string taxability { get; set; }
      [StringValidationAttribute]
      public string taxablety { get; set; }
      [StringValidationAttribute]
      public string taxmethodty { get; set; }
      [StringValidationAttribute]
      public string recordty { get; set; }
      public int recty { get; set; }
      public int sasgmRecty { get; set; }
      public int taxgroup { get; set; }
      public int sasgmTaxgroup { get; set; }
      [StringValidationAttribute]
      public string statecd { get; set; }
      public bool taxgroupenabled { get; set; }
      public bool taxabilityenabled { get; set; }
      public bool taxabilityhidden { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Sasgaddonsresults BuildSasgaddonsresultsFromRow(DataRow row)
      {
         Sasgaddonsresults entity = new Sasgaddonsresults();
         entity.addonno = row.IsNull("addonno") ? 0 : row.Field<int>("addonno");
         entity.descrip = row.IsNull("descrip") ? string.Empty : row.Field<string>("descrip");
         entity.taxtype = row.IsNull("taxtype") ? 0 : row.Field<int>("taxtype");
         entity.otaxtype = row.IsNull("otaxtype") ? 0 : row.Field<int>("otaxtype");
         entity.taxdesc = row.IsNull("taxdesc") ? string.Empty : row.Field<string>("taxdesc");
         entity.taxability = row.IsNull("taxability") ? string.Empty : row.Field<string>("taxability");
         entity.taxablety = row.IsNull("taxablety") ? string.Empty : row.Field<string>("taxablety");
         entity.taxmethodty = row.IsNull("taxmethodty") ? string.Empty : row.Field<string>("taxmethodty");
         entity.recordty = row.IsNull("recordty") ? string.Empty : row.Field<string>("recordty");
         entity.recty = row.IsNull("recty") ? 0 : row.Field<int>("recty");
         entity.sasgmRecty = row.IsNull("sasgm-recty") ? 0 : row.Field<int>("sasgm-recty");
         entity.taxgroup = row.IsNull("taxgroup") ? 0 : row.Field<int>("taxgroup");
         entity.sasgmTaxgroup = row.IsNull("sasgm-taxgroup") ? 0 : row.Field<int>("sasgm-taxgroup");
         entity.statecd = row.IsNull("statecd") ? string.Empty : row.Field<string>("statecd");
         entity.taxgroupenabled = row.Field<bool>("taxgroupenabled");
         entity.taxabilityenabled = row.Field<bool>("taxabilityenabled");
         entity.taxabilityhidden = row.Field<bool>("taxabilityhidden");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromSasgaddonsresults(ref DataRow row, Sasgaddonsresults entity)
      {
         row.SetField("addonno", entity.addonno);
         row.SetField("descrip", entity.descrip);
         row.SetField("taxtype", entity.taxtype);
         row.SetField("otaxtype", entity.otaxtype);
         row.SetField("taxdesc", entity.taxdesc);
         row.SetField("taxability", entity.taxability);
         row.SetField("taxablety", entity.taxablety);
         row.SetField("taxmethodty", entity.taxmethodty);
         row.SetField("recordty", entity.recordty);
         row.SetField("recty", entity.recty);
         row.SetField("sasgm-recty", entity.sasgmRecty);
         row.SetField("taxgroup", entity.taxgroup);
         row.SetField("sasgm-taxgroup", entity.sasgmTaxgroup);
         row.SetField("statecd", entity.statecd);
         row.SetField("taxgroupenabled", entity.taxgroupenabled);
         row.SetField("taxabilityenabled", entity.taxabilityenabled);
         row.SetField("taxabilityhidden", entity.taxabilityhidden);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591