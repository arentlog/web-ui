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

namespace Infor.Sxe.TWL.Data.Models.Pdsrepltopoffbuildlist
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsrepltopoffbuildlist.Repltopoffbuildlist")]
   public partial class Repltopoffbuildlist : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string currentTwlUser { get; set; }
      public decimal maxLvl { get; set; }
      public decimal dOnhand { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Repltopoffbuildlist BuildRepltopoffbuildlistFromRow(DataRow row)
      {
         Repltopoffbuildlist entity = new Repltopoffbuildlist();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.currentTwlUser = row.IsNull("current_twl_user") ? string.Empty : row.Field<string>("current_twl_user");
         entity.maxLvl = row.IsNull("max_lvl") ? decimal.Zero : row.Field<decimal>("max_lvl");
         entity.dOnhand = row.IsNull("d_onhand") ? decimal.Zero : row.Field<decimal>("d_onhand");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromRepltopoffbuildlist(ref DataRow row, Repltopoffbuildlist entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("abs_num", entity.absNum);
         row.SetField("bin_num", entity.binNum);
         row.SetField("current_twl_user", entity.currentTwlUser);
         row.SetField("max_lvl", entity.maxLvl);
         row.SetField("d_onhand", entity.dOnhand);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591