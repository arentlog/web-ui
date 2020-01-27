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

namespace Infor.Sxe.OE.Data.Models.Pdsoebundleslookup
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoebundleslookup.Oebundleslookupcriteria")]
   public partial class Oebundleslookupcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string columnlabel1 { get; set; }
      [StringValidationAttribute]
      public string columnlabel2 { get; set; }
      [StringValidationAttribute]
      public string columnlabel3 { get; set; }
      [StringValidationAttribute]
      public string columnlabel4 { get; set; }
      [StringValidationAttribute]
      public string columnlabel5 { get; set; }
      [StringValidationAttribute]
      public string columnlabel6 { get; set; }
      [StringValidationAttribute]
      public string columnlabel7 { get; set; }
      [StringValidationAttribute]
      public string columnlabel8 { get; set; }
      [StringValidationAttribute]
      public string columnlabel9 { get; set; }
      [StringValidationAttribute]
      public string columnlabel10 { get; set; }
      [StringValidationAttribute]
      public string columnlabel11 { get; set; }
      [StringValidationAttribute]
      public string columnlabel12 { get; set; }
      [StringValidationAttribute]
      public string columnlabel13 { get; set; }
      [StringValidationAttribute]
      public string columnlabel14 { get; set; }
      [StringValidationAttribute]
      public string columnlabel15 { get; set; }
      [StringValidationAttribute]
      public string columnlabel16 { get; set; }
      [StringValidationAttribute]
      public string columnlabel17 { get; set; }
      [StringValidationAttribute]
      public string columnlabel18 { get; set; }
      [StringValidationAttribute]
      public string columnlabel19 { get; set; }
      [StringValidationAttribute]
      public string columnlabel20 { get; set; }
      [StringValidationAttribute]
      public string columnprod1 { get; set; }
      [StringValidationAttribute]
      public string columnprod2 { get; set; }
      [StringValidationAttribute]
      public string columnprod3 { get; set; }
      [StringValidationAttribute]
      public string columnprod4 { get; set; }
      [StringValidationAttribute]
      public string columnprod5 { get; set; }
      [StringValidationAttribute]
      public string columnprod6 { get; set; }
      [StringValidationAttribute]
      public string columnprod7 { get; set; }
      [StringValidationAttribute]
      public string columnprod8 { get; set; }
      [StringValidationAttribute]
      public string columnprod9 { get; set; }
      [StringValidationAttribute]
      public string columnprod10 { get; set; }
      [StringValidationAttribute]
      public string columnprod11 { get; set; }
      [StringValidationAttribute]
      public string columnprod12 { get; set; }
      [StringValidationAttribute]
      public string columnprod13 { get; set; }
      [StringValidationAttribute]
      public string columnprod14 { get; set; }
      [StringValidationAttribute]
      public string columnprod15 { get; set; }
      [StringValidationAttribute]
      public string columnprod16 { get; set; }
      [StringValidationAttribute]
      public string columnprod17 { get; set; }
      [StringValidationAttribute]
      public string columnprod18 { get; set; }
      [StringValidationAttribute]
      public string columnprod19 { get; set; }
      [StringValidationAttribute]
      public string columnprod20 { get; set; }
      public bool columnhidden1 { get; set; }
      public bool columnhidden2 { get; set; }
      public bool columnhidden3 { get; set; }
      public bool columnhidden4 { get; set; }
      public bool columnhidden5 { get; set; }
      public bool columnhidden6 { get; set; }
      public bool columnhidden7 { get; set; }
      public bool columnhidden8 { get; set; }
      public bool columnhidden9 { get; set; }
      public bool columnhidden10 { get; set; }
      public bool columnhidden11 { get; set; }
      public bool columnhidden12 { get; set; }
      public bool columnhidden13 { get; set; }
      public bool columnhidden14 { get; set; }
      public bool columnhidden15 { get; set; }
      public bool columnhidden16 { get; set; }
      public bool columnhidden17 { get; set; }
      public bool columnhidden18 { get; set; }
      public bool columnhidden19 { get; set; }
      public bool columnhidden20 { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oebundleslookupcriteria BuildOebundleslookupcriteriaFromRow(DataRow row)
      {
         Oebundleslookupcriteria entity = new Oebundleslookupcriteria();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.columnlabel1 = row.IsNull("columnlabel1") ? string.Empty : row.Field<string>("columnlabel1");
         entity.columnlabel2 = row.IsNull("columnlabel2") ? string.Empty : row.Field<string>("columnlabel2");
         entity.columnlabel3 = row.IsNull("columnlabel3") ? string.Empty : row.Field<string>("columnlabel3");
         entity.columnlabel4 = row.IsNull("columnlabel4") ? string.Empty : row.Field<string>("columnlabel4");
         entity.columnlabel5 = row.IsNull("columnlabel5") ? string.Empty : row.Field<string>("columnlabel5");
         entity.columnlabel6 = row.IsNull("columnlabel6") ? string.Empty : row.Field<string>("columnlabel6");
         entity.columnlabel7 = row.IsNull("columnlabel7") ? string.Empty : row.Field<string>("columnlabel7");
         entity.columnlabel8 = row.IsNull("columnlabel8") ? string.Empty : row.Field<string>("columnlabel8");
         entity.columnlabel9 = row.IsNull("columnlabel9") ? string.Empty : row.Field<string>("columnlabel9");
         entity.columnlabel10 = row.IsNull("columnlabel10") ? string.Empty : row.Field<string>("columnlabel10");
         entity.columnlabel11 = row.IsNull("columnlabel11") ? string.Empty : row.Field<string>("columnlabel11");
         entity.columnlabel12 = row.IsNull("columnlabel12") ? string.Empty : row.Field<string>("columnlabel12");
         entity.columnlabel13 = row.IsNull("columnlabel13") ? string.Empty : row.Field<string>("columnlabel13");
         entity.columnlabel14 = row.IsNull("columnlabel14") ? string.Empty : row.Field<string>("columnlabel14");
         entity.columnlabel15 = row.IsNull("columnlabel15") ? string.Empty : row.Field<string>("columnlabel15");
         entity.columnlabel16 = row.IsNull("columnlabel16") ? string.Empty : row.Field<string>("columnlabel16");
         entity.columnlabel17 = row.IsNull("columnlabel17") ? string.Empty : row.Field<string>("columnlabel17");
         entity.columnlabel18 = row.IsNull("columnlabel18") ? string.Empty : row.Field<string>("columnlabel18");
         entity.columnlabel19 = row.IsNull("columnlabel19") ? string.Empty : row.Field<string>("columnlabel19");
         entity.columnlabel20 = row.IsNull("columnlabel20") ? string.Empty : row.Field<string>("columnlabel20");
         entity.columnprod1 = row.IsNull("columnprod1") ? string.Empty : row.Field<string>("columnprod1");
         entity.columnprod2 = row.IsNull("columnprod2") ? string.Empty : row.Field<string>("columnprod2");
         entity.columnprod3 = row.IsNull("columnprod3") ? string.Empty : row.Field<string>("columnprod3");
         entity.columnprod4 = row.IsNull("columnprod4") ? string.Empty : row.Field<string>("columnprod4");
         entity.columnprod5 = row.IsNull("columnprod5") ? string.Empty : row.Field<string>("columnprod5");
         entity.columnprod6 = row.IsNull("columnprod6") ? string.Empty : row.Field<string>("columnprod6");
         entity.columnprod7 = row.IsNull("columnprod7") ? string.Empty : row.Field<string>("columnprod7");
         entity.columnprod8 = row.IsNull("columnprod8") ? string.Empty : row.Field<string>("columnprod8");
         entity.columnprod9 = row.IsNull("columnprod9") ? string.Empty : row.Field<string>("columnprod9");
         entity.columnprod10 = row.IsNull("columnprod10") ? string.Empty : row.Field<string>("columnprod10");
         entity.columnprod11 = row.IsNull("columnprod11") ? string.Empty : row.Field<string>("columnprod11");
         entity.columnprod12 = row.IsNull("columnprod12") ? string.Empty : row.Field<string>("columnprod12");
         entity.columnprod13 = row.IsNull("columnprod13") ? string.Empty : row.Field<string>("columnprod13");
         entity.columnprod14 = row.IsNull("columnprod14") ? string.Empty : row.Field<string>("columnprod14");
         entity.columnprod15 = row.IsNull("columnprod15") ? string.Empty : row.Field<string>("columnprod15");
         entity.columnprod16 = row.IsNull("columnprod16") ? string.Empty : row.Field<string>("columnprod16");
         entity.columnprod17 = row.IsNull("columnprod17") ? string.Empty : row.Field<string>("columnprod17");
         entity.columnprod18 = row.IsNull("columnprod18") ? string.Empty : row.Field<string>("columnprod18");
         entity.columnprod19 = row.IsNull("columnprod19") ? string.Empty : row.Field<string>("columnprod19");
         entity.columnprod20 = row.IsNull("columnprod20") ? string.Empty : row.Field<string>("columnprod20");
         entity.columnhidden1 = row.Field<bool>("columnhidden1");
         entity.columnhidden2 = row.Field<bool>("columnhidden2");
         entity.columnhidden3 = row.Field<bool>("columnhidden3");
         entity.columnhidden4 = row.Field<bool>("columnhidden4");
         entity.columnhidden5 = row.Field<bool>("columnhidden5");
         entity.columnhidden6 = row.Field<bool>("columnhidden6");
         entity.columnhidden7 = row.Field<bool>("columnhidden7");
         entity.columnhidden8 = row.Field<bool>("columnhidden8");
         entity.columnhidden9 = row.Field<bool>("columnhidden9");
         entity.columnhidden10 = row.Field<bool>("columnhidden10");
         entity.columnhidden11 = row.Field<bool>("columnhidden11");
         entity.columnhidden12 = row.Field<bool>("columnhidden12");
         entity.columnhidden13 = row.Field<bool>("columnhidden13");
         entity.columnhidden14 = row.Field<bool>("columnhidden14");
         entity.columnhidden15 = row.Field<bool>("columnhidden15");
         entity.columnhidden16 = row.Field<bool>("columnhidden16");
         entity.columnhidden17 = row.Field<bool>("columnhidden17");
         entity.columnhidden18 = row.Field<bool>("columnhidden18");
         entity.columnhidden19 = row.Field<bool>("columnhidden19");
         entity.columnhidden20 = row.Field<bool>("columnhidden20");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOebundleslookupcriteria(ref DataRow row, Oebundleslookupcriteria entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("prod", entity.prod);
         row.SetField("columnlabel1", entity.columnlabel1);
         row.SetField("columnlabel2", entity.columnlabel2);
         row.SetField("columnlabel3", entity.columnlabel3);
         row.SetField("columnlabel4", entity.columnlabel4);
         row.SetField("columnlabel5", entity.columnlabel5);
         row.SetField("columnlabel6", entity.columnlabel6);
         row.SetField("columnlabel7", entity.columnlabel7);
         row.SetField("columnlabel8", entity.columnlabel8);
         row.SetField("columnlabel9", entity.columnlabel9);
         row.SetField("columnlabel10", entity.columnlabel10);
         row.SetField("columnlabel11", entity.columnlabel11);
         row.SetField("columnlabel12", entity.columnlabel12);
         row.SetField("columnlabel13", entity.columnlabel13);
         row.SetField("columnlabel14", entity.columnlabel14);
         row.SetField("columnlabel15", entity.columnlabel15);
         row.SetField("columnlabel16", entity.columnlabel16);
         row.SetField("columnlabel17", entity.columnlabel17);
         row.SetField("columnlabel18", entity.columnlabel18);
         row.SetField("columnlabel19", entity.columnlabel19);
         row.SetField("columnlabel20", entity.columnlabel20);
         row.SetField("columnprod1", entity.columnprod1);
         row.SetField("columnprod2", entity.columnprod2);
         row.SetField("columnprod3", entity.columnprod3);
         row.SetField("columnprod4", entity.columnprod4);
         row.SetField("columnprod5", entity.columnprod5);
         row.SetField("columnprod6", entity.columnprod6);
         row.SetField("columnprod7", entity.columnprod7);
         row.SetField("columnprod8", entity.columnprod8);
         row.SetField("columnprod9", entity.columnprod9);
         row.SetField("columnprod10", entity.columnprod10);
         row.SetField("columnprod11", entity.columnprod11);
         row.SetField("columnprod12", entity.columnprod12);
         row.SetField("columnprod13", entity.columnprod13);
         row.SetField("columnprod14", entity.columnprod14);
         row.SetField("columnprod15", entity.columnprod15);
         row.SetField("columnprod16", entity.columnprod16);
         row.SetField("columnprod17", entity.columnprod17);
         row.SetField("columnprod18", entity.columnprod18);
         row.SetField("columnprod19", entity.columnprod19);
         row.SetField("columnprod20", entity.columnprod20);
         row.SetField("columnhidden1", entity.columnhidden1);
         row.SetField("columnhidden2", entity.columnhidden2);
         row.SetField("columnhidden3", entity.columnhidden3);
         row.SetField("columnhidden4", entity.columnhidden4);
         row.SetField("columnhidden5", entity.columnhidden5);
         row.SetField("columnhidden6", entity.columnhidden6);
         row.SetField("columnhidden7", entity.columnhidden7);
         row.SetField("columnhidden8", entity.columnhidden8);
         row.SetField("columnhidden9", entity.columnhidden9);
         row.SetField("columnhidden10", entity.columnhidden10);
         row.SetField("columnhidden11", entity.columnhidden11);
         row.SetField("columnhidden12", entity.columnhidden12);
         row.SetField("columnhidden13", entity.columnhidden13);
         row.SetField("columnhidden14", entity.columnhidden14);
         row.SetField("columnhidden15", entity.columnhidden15);
         row.SetField("columnhidden16", entity.columnhidden16);
         row.SetField("columnhidden17", entity.columnhidden17);
         row.SetField("columnhidden18", entity.columnhidden18);
         row.SetField("columnhidden19", entity.columnhidden19);
         row.SetField("columnhidden20", entity.columnhidden20);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
