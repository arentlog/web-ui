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

namespace Infor.Sxe.TWL.Data.Models.Pdspackinglistaddpo
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdspackinglistaddpo.Packinglistaddpo")]
   public partial class Packinglistaddpo : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string userId { get; set; }
      [StringValidationAttribute]
      public string rtNum { get; set; }
      [StringValidationAttribute]
      public string poNum { get; set; }
      [StringValidationAttribute]
      public string poSuffix { get; set; }
      public bool mixvendorokfl { get; set; }
      [StringValidationAttribute]
      public string packinglistaddpouserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Packinglistaddpo BuildPackinglistaddpoFromRow(DataRow row)
      {
         Packinglistaddpo entity = new Packinglistaddpo();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.userId = row.IsNull("user_id") ? string.Empty : row.Field<string>("user_id");
         entity.rtNum = row.IsNull("rt_num") ? string.Empty : row.Field<string>("rt_num");
         entity.poNum = row.IsNull("po_num") ? string.Empty : row.Field<string>("po_num");
         entity.poSuffix = row.IsNull("po_suffix") ? string.Empty : row.Field<string>("po_suffix");
         entity.mixvendorokfl = row.Field<bool>("mixvendorokfl");
         entity.packinglistaddpouserfield = row.IsNull("packinglistaddpouserfield") ? string.Empty : row.Field<string>("packinglistaddpouserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPackinglistaddpo(ref DataRow row, Packinglistaddpo entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("user_id", entity.userId);
         row.SetField("rt_num", entity.rtNum);
         row.SetField("po_num", entity.poNum);
         row.SetField("po_suffix", entity.poSuffix);
         row.SetField("mixvendorokfl", entity.mixvendorokfl);
         row.SetField("packinglistaddpouserfield", entity.packinglistaddpouserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
