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

namespace Infor.Sxe.IC.Data.Models.Pdsloadexcptusagett
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsloadexcptusagett.Loadexcptusagettresults")]
   public partial class Loadexcptusagettresults : ModelBase
   {
      public int monthseq { get; set; }
      [StringValidationAttribute]
      public string monthwords { get; set; }
      public int year { get; set; }
      public decimal normusage { get; set; }
      public decimal transusage { get; set; }
      [StringValidationAttribute]
      public string overreasty { get; set; }
      [StringValidationAttribute]
      public string overrsdesc { get; set; }
      public int nodaysso { get; set; }
      public int notimesso { get; set; }
      public decimal avginvval { get; set; }
      public decimal overusage { get; set; }
      public decimal transpct { get; set; }
      public int linehits { get; set; }
      public int linehitswt { get; set; }
      public int linehitslb { get; set; }
      public int linehitstot { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Loadexcptusagettresults BuildLoadexcptusagettresultsFromRow(DataRow row)
      {
         Loadexcptusagettresults entity = new Loadexcptusagettresults();
         entity.monthseq = row.IsNull("monthseq") ? 0 : row.Field<int>("monthseq");
         entity.monthwords = row.IsNull("monthwords") ? string.Empty : row.Field<string>("monthwords");
         entity.year = row.IsNull("year") ? 0 : row.Field<int>("year");
         entity.normusage = row.IsNull("normusage") ? decimal.Zero : row.Field<decimal>("normusage");
         entity.transusage = row.IsNull("transusage") ? decimal.Zero : row.Field<decimal>("transusage");
         entity.overreasty = row.IsNull("overreasty") ? string.Empty : row.Field<string>("overreasty");
         entity.overrsdesc = row.IsNull("overrsdesc") ? string.Empty : row.Field<string>("overrsdesc");
         entity.nodaysso = row.IsNull("nodaysso") ? 0 : row.Field<int>("nodaysso");
         entity.notimesso = row.IsNull("notimesso") ? 0 : row.Field<int>("notimesso");
         entity.avginvval = row.IsNull("avginvval") ? decimal.Zero : row.Field<decimal>("avginvval");
         entity.overusage = row.IsNull("overusage") ? decimal.Zero : row.Field<decimal>("overusage");
         entity.transpct = row.IsNull("transpct") ? decimal.Zero : row.Field<decimal>("transpct");
         entity.linehits = row.IsNull("linehits") ? 0 : row.Field<int>("linehits");
         entity.linehitswt = row.IsNull("linehitswt") ? 0 : row.Field<int>("linehitswt");
         entity.linehitslb = row.IsNull("linehitslb") ? 0 : row.Field<int>("linehitslb");
         entity.linehitstot = row.IsNull("linehitstot") ? 0 : row.Field<int>("linehitstot");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromLoadexcptusagettresults(ref DataRow row, Loadexcptusagettresults entity)
      {
         row.SetField("monthseq", entity.monthseq);
         row.SetField("monthwords", entity.monthwords);
         row.SetField("year", entity.year);
         row.SetField("normusage", entity.normusage);
         row.SetField("transusage", entity.transusage);
         row.SetField("overreasty", entity.overreasty);
         row.SetField("overrsdesc", entity.overrsdesc);
         row.SetField("nodaysso", entity.nodaysso);
         row.SetField("notimesso", entity.notimesso);
         row.SetField("avginvval", entity.avginvval);
         row.SetField("overusage", entity.overusage);
         row.SetField("transpct", entity.transpct);
         row.SetField("linehits", entity.linehits);
         row.SetField("linehitswt", entity.linehitswt);
         row.SetField("linehitslb", entity.linehitslb);
         row.SetField("linehitstot", entity.linehitstot);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
