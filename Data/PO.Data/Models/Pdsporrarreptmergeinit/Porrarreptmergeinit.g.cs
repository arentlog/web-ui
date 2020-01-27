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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarreptmergeinit
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarreptmergeinit.Porrarreptmergeinit")]
   public partial class Porrarreptmergeinit : ModelBase
   {
      [StringValidationAttribute]
      public string orderdtmonth { get; set; }
      [StringValidationAttribute]
      public string orderdtday { get; set; }
      [StringValidationAttribute]
      public string orderdtyear { get; set; }
      public bool printpofl { get; set; }
      public bool printourprodfl { get; set; }
      public bool convertfl { get; set; }
      public bool deleteunmergefl { get; set; }
      public bool faxwhereapprfl { get; set; }
      public bool ediwhereapprfl { get; set; }
      [StringValidationAttribute]
      public string edifile { get; set; }
      [StringValidationAttribute]
      public string poorder { get; set; }
      [StringValidationAttribute]
      public string mergenonstock { get; set; }
      [StringValidationAttribute]
      public string centwhseoverride { get; set; }
      [StringValidationAttribute]
      public string progbuypotype { get; set; }
      [StringValidationAttribute]
      public string progbuyconswhse { get; set; }
      [StringValidationAttribute]
      public string progbuyconsperwhse { get; set; }
      public bool progbuywodiscfl { get; set; }


      public static Porrarreptmergeinit BuildPorrarreptmergeinitFromRow(DataRow row)
      {
         Porrarreptmergeinit entity = new Porrarreptmergeinit();
         entity.orderdtmonth = row.IsNull("orderdtmonth") ? string.Empty : row.Field<string>("orderdtmonth");
         entity.orderdtday = row.IsNull("orderdtday") ? string.Empty : row.Field<string>("orderdtday");
         entity.orderdtyear = row.IsNull("orderdtyear") ? string.Empty : row.Field<string>("orderdtyear");
         entity.printpofl = row.Field<bool>("printpofl");
         entity.printourprodfl = row.Field<bool>("printourprodfl");
         entity.convertfl = row.Field<bool>("convertfl");
         entity.deleteunmergefl = row.Field<bool>("deleteunmergefl");
         entity.faxwhereapprfl = row.Field<bool>("faxwhereapprfl");
         entity.ediwhereapprfl = row.Field<bool>("ediwhereapprfl");
         entity.edifile = row.IsNull("edifile") ? string.Empty : row.Field<string>("edifile");
         entity.poorder = row.IsNull("poorder") ? string.Empty : row.Field<string>("poorder");
         entity.mergenonstock = row.IsNull("mergenonstock") ? string.Empty : row.Field<string>("mergenonstock");
         entity.centwhseoverride = row.IsNull("centwhseoverride") ? string.Empty : row.Field<string>("centwhseoverride");
         entity.progbuypotype = row.IsNull("progbuypotype") ? string.Empty : row.Field<string>("progbuypotype");
         entity.progbuyconswhse = row.IsNull("progbuyconswhse") ? string.Empty : row.Field<string>("progbuyconswhse");
         entity.progbuyconsperwhse = row.IsNull("progbuyconsperwhse") ? string.Empty : row.Field<string>("progbuyconsperwhse");
         entity.progbuywodiscfl = row.Field<bool>("progbuywodiscfl");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarreptmergeinit(ref DataRow row, Porrarreptmergeinit entity)
      {
         row.SetField("orderdtmonth", entity.orderdtmonth);
         row.SetField("orderdtday", entity.orderdtday);
         row.SetField("orderdtyear", entity.orderdtyear);
         row.SetField("printpofl", entity.printpofl);
         row.SetField("printourprodfl", entity.printourprodfl);
         row.SetField("convertfl", entity.convertfl);
         row.SetField("deleteunmergefl", entity.deleteunmergefl);
         row.SetField("faxwhereapprfl", entity.faxwhereapprfl);
         row.SetField("ediwhereapprfl", entity.ediwhereapprfl);
         row.SetField("edifile", entity.edifile);
         row.SetField("poorder", entity.poorder);
         row.SetField("mergenonstock", entity.mergenonstock);
         row.SetField("centwhseoverride", entity.centwhseoverride);
         row.SetField("progbuypotype", entity.progbuypotype);
         row.SetField("progbuyconswhse", entity.progbuyconswhse);
         row.SetField("progbuyconsperwhse", entity.progbuyconsperwhse);
         row.SetField("progbuywodiscfl", entity.progbuywodiscfl);

      }
   
   }
}
#pragma warning restore 1591
