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

namespace Infor.Sxe.TWL.Data.Models.Pdsaltloc
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsaltloc.Altloc")]
   public partial class Altloc : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string whZone { get; set; }
      public bool rowStatus { get; set; }
      public int binHits { get; set; }
      public int height { get; set; }
      public int width { get; set; }
      public int depth { get; set; }
      public int maxPal { get; set; }
      public int maxWeight { get; set; }
      public decimal cube { get; set; }
      public int palletFootprint { get; set; }
      [StringValidationAttribute]
      public string binmstRowID { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Altloc BuildAltlocFromRow(DataRow row)
      {
         Altloc entity = new Altloc();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.whZone = row.IsNull("wh_zone") ? string.Empty : row.Field<string>("wh_zone");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.binHits = row.IsNull("bin_hits") ? 0 : row.Field<int>("bin_hits");
         entity.height = row.IsNull("height") ? 0 : row.Field<int>("height");
         entity.width = row.IsNull("width") ? 0 : row.Field<int>("width");
         entity.depth = row.IsNull("depth") ? 0 : row.Field<int>("depth");
         entity.maxPal = row.IsNull("max_pal") ? 0 : row.Field<int>("max_pal");
         entity.maxWeight = row.IsNull("max_weight") ? 0 : row.Field<int>("max_weight");
         entity.cube = row.IsNull("cube") ? decimal.Zero : row.Field<decimal>("cube");
         entity.palletFootprint = row.IsNull("pallet_footprint") ? 0 : row.Field<int>("pallet_footprint");
         entity.binmstRowID = row.Field<byte[]>("binmstRowID").ToStringEncoded();
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromAltloc(ref DataRow row, Altloc entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("bin_num", entity.binNum);
         row.SetField("wh_zone", entity.whZone);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("bin_hits", entity.binHits);
         row.SetField("height", entity.height);
         row.SetField("width", entity.width);
         row.SetField("depth", entity.depth);
         row.SetField("max_pal", entity.maxPal);
         row.SetField("max_weight", entity.maxWeight);
         row.SetField("cube", entity.cube);
         row.SetField("pallet_footprint", entity.palletFootprint);
         row.SetField("binmstRowID", entity.binmstRowID.ToByteArray());
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
