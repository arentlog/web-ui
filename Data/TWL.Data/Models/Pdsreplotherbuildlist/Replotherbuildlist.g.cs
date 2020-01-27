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

namespace Infor.Sxe.TWL.Data.Models.Pdsreplotherbuildlist
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsreplotherbuildlist.Replotherbuildlist")]
   public partial class Replotherbuildlist : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string itemZone { get; set; }
      [StringValidationAttribute]
      public string itemGroup { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string binZone { get; set; }
      [StringValidationAttribute]
      public string binGroup { get; set; }
      public int numLocations { get; set; }
      public decimal qtyonhand { get; set; }
      [StringValidationAttribute]
      public string lot { get; set; }
      [StringValidationAttribute]
      public string palletId { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Replotherbuildlist BuildReplotherbuildlistFromRow(DataRow row)
      {
         Replotherbuildlist entity = new Replotherbuildlist();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.itemZone = row.IsNull("item_zone") ? string.Empty : row.Field<string>("item_zone");
         entity.itemGroup = row.IsNull("item_group") ? string.Empty : row.Field<string>("item_group");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.binZone = row.IsNull("bin_zone") ? string.Empty : row.Field<string>("bin_zone");
         entity.binGroup = row.IsNull("bin_group") ? string.Empty : row.Field<string>("bin_group");
         entity.numLocations = row.IsNull("num_locations") ? 0 : row.Field<int>("num_locations");
         entity.qtyonhand = row.IsNull("qtyonhand") ? decimal.Zero : row.Field<decimal>("qtyonhand");
         entity.lot = row.IsNull("lot") ? string.Empty : row.Field<string>("lot");
         entity.palletId = row.IsNull("pallet_id") ? string.Empty : row.Field<string>("pallet_id");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromReplotherbuildlist(ref DataRow row, Replotherbuildlist entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("item_zone", entity.itemZone);
         row.SetField("item_group", entity.itemGroup);
         row.SetField("bin_num", entity.binNum);
         row.SetField("bin_zone", entity.binZone);
         row.SetField("bin_group", entity.binGroup);
         row.SetField("num_locations", entity.numLocations);
         row.SetField("qtyonhand", entity.qtyonhand);
         row.SetField("lot", entity.lot);
         row.SetField("pallet_id", entity.palletId);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591