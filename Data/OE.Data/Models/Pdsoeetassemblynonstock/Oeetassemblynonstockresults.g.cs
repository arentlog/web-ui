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

namespace Infor.Sxe.OE.Data.Models.Pdsoeetassemblynonstock
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoeetassemblynonstock.Oeetassemblynonstockresults")]
   public partial class Oeetassemblynonstockresults : ModelBase
   {
      [StringValidationAttribute]
      public string vawhse { get; set; }
      [StringValidationAttribute]
      public string component { get; set; }
      public bool nonstockentry { get; set; }
      public bool creatensfl { get; set; }
      public bool rushfl { get; set; }
      [StringValidationAttribute]
      public string nsarpprodline { get; set; }
      public decimal nsarpvendno { get; set; }
      [StringValidationAttribute]
      public string nsarpwhse { get; set; }
      public decimal nscubes { get; set; }
      [StringValidationAttribute]
      public string nsproddesc { get; set; }
      [StringValidationAttribute]
      public string nsproddesc2 { get; set; }
      [StringValidationAttribute]
      public string nsprodcat { get; set; }
      public decimal nsweight { get; set; }
      public decimal nsprodcost { get; set; }
      public bool nsrushfl { get; set; }
      public bool forcespec { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oeetassemblynonstockresults BuildOeetassemblynonstockresultsFromRow(DataRow row)
      {
         Oeetassemblynonstockresults entity = new Oeetassemblynonstockresults();
         entity.vawhse = row.IsNull("vawhse") ? string.Empty : row.Field<string>("vawhse");
         entity.component = row.IsNull("component") ? string.Empty : row.Field<string>("component");
         entity.nonstockentry = row.Field<bool>("nonstockentry");
         entity.creatensfl = row.Field<bool>("creatensfl");
         entity.rushfl = row.Field<bool>("rushfl");
         entity.nsarpprodline = row.IsNull("nsarpprodline") ? string.Empty : row.Field<string>("nsarpprodline");
         entity.nsarpvendno = row.IsNull("nsarpvendno") ? decimal.Zero : row.Field<decimal>("nsarpvendno");
         entity.nsarpwhse = row.IsNull("nsarpwhse") ? string.Empty : row.Field<string>("nsarpwhse");
         entity.nscubes = row.IsNull("nscubes") ? decimal.Zero : row.Field<decimal>("nscubes");
         entity.nsproddesc = row.IsNull("nsproddesc") ? string.Empty : row.Field<string>("nsproddesc");
         entity.nsproddesc2 = row.IsNull("nsproddesc2") ? string.Empty : row.Field<string>("nsproddesc2");
         entity.nsprodcat = row.IsNull("nsprodcat") ? string.Empty : row.Field<string>("nsprodcat");
         entity.nsweight = row.IsNull("nsweight") ? decimal.Zero : row.Field<decimal>("nsweight");
         entity.nsprodcost = row.IsNull("nsprodcost") ? decimal.Zero : row.Field<decimal>("nsprodcost");
         entity.nsrushfl = row.Field<bool>("nsrushfl");
         entity.forcespec = row.Field<bool>("forcespec");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOeetassemblynonstockresults(ref DataRow row, Oeetassemblynonstockresults entity)
      {
         row.SetField("vawhse", entity.vawhse);
         row.SetField("component", entity.component);
         row.SetField("nonstockentry", entity.nonstockentry);
         row.SetField("creatensfl", entity.creatensfl);
         row.SetField("rushfl", entity.rushfl);
         row.SetField("nsarpprodline", entity.nsarpprodline);
         row.SetField("nsarpvendno", entity.nsarpvendno);
         row.SetField("nsarpwhse", entity.nsarpwhse);
         row.SetField("nscubes", entity.nscubes);
         row.SetField("nsproddesc", entity.nsproddesc);
         row.SetField("nsproddesc2", entity.nsproddesc2);
         row.SetField("nsprodcat", entity.nsprodcat);
         row.SetField("nsweight", entity.nsweight);
         row.SetField("nsprodcost", entity.nsprodcost);
         row.SetField("nsrushfl", entity.nsrushfl);
         row.SetField("forcespec", entity.forcespec);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591