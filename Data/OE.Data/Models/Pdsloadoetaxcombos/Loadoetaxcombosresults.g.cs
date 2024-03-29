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

namespace Infor.Sxe.OE.Data.Models.Pdsloadoetaxcombos
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsloadoetaxcombos.Loadoetaxcombosresults")]
   public partial class Loadoetaxcombosresults : ModelBase
   {
      [StringValidationAttribute]
      public string statecodes { get; set; }
      [StringValidationAttribute]
      public string statedescs { get; set; }
      [StringValidationAttribute]
      public string countycodes { get; set; }
      [StringValidationAttribute]
      public string countydescs { get; set; }
      [StringValidationAttribute]
      public string citycodes { get; set; }
      [StringValidationAttribute]
      public string citydescs { get; set; }
      [StringValidationAttribute]
      public string other1codes { get; set; }
      [StringValidationAttribute]
      public string other1descs { get; set; }
      [StringValidationAttribute]
      public string other2codes { get; set; }
      [StringValidationAttribute]
      public string other2descs { get; set; }
      [StringValidationAttribute]
      public string taxauthcodes { get; set; }
      [StringValidationAttribute]
      public string taxauthdescs { get; set; }


      public static Loadoetaxcombosresults BuildLoadoetaxcombosresultsFromRow(DataRow row)
      {
         Loadoetaxcombosresults entity = new Loadoetaxcombosresults();
         entity.statecodes = row.IsNull("statecodes") ? string.Empty : row.Field<string>("statecodes");
         entity.statedescs = row.IsNull("statedescs") ? string.Empty : row.Field<string>("statedescs");
         entity.countycodes = row.IsNull("countycodes") ? string.Empty : row.Field<string>("countycodes");
         entity.countydescs = row.IsNull("countydescs") ? string.Empty : row.Field<string>("countydescs");
         entity.citycodes = row.IsNull("citycodes") ? string.Empty : row.Field<string>("citycodes");
         entity.citydescs = row.IsNull("citydescs") ? string.Empty : row.Field<string>("citydescs");
         entity.other1codes = row.IsNull("other1codes") ? string.Empty : row.Field<string>("other1codes");
         entity.other1descs = row.IsNull("other1descs") ? string.Empty : row.Field<string>("other1descs");
         entity.other2codes = row.IsNull("other2codes") ? string.Empty : row.Field<string>("other2codes");
         entity.other2descs = row.IsNull("other2descs") ? string.Empty : row.Field<string>("other2descs");
         entity.taxauthcodes = row.IsNull("taxauthcodes") ? string.Empty : row.Field<string>("taxauthcodes");
         entity.taxauthdescs = row.IsNull("taxauthdescs") ? string.Empty : row.Field<string>("taxauthdescs");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadoetaxcombosresults(ref DataRow row, Loadoetaxcombosresults entity)
      {
         row.SetField("statecodes", entity.statecodes);
         row.SetField("statedescs", entity.statedescs);
         row.SetField("countycodes", entity.countycodes);
         row.SetField("countydescs", entity.countydescs);
         row.SetField("citycodes", entity.citycodes);
         row.SetField("citydescs", entity.citydescs);
         row.SetField("other1codes", entity.other1codes);
         row.SetField("other1descs", entity.other1descs);
         row.SetField("other2codes", entity.other2codes);
         row.SetField("other2descs", entity.other2descs);
         row.SetField("taxauthcodes", entity.taxauthcodes);
         row.SetField("taxauthdescs", entity.taxauthdescs);

      }
   
   }
}
#pragma warning restore 1591
