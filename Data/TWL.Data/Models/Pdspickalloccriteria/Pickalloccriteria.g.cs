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

namespace Infor.Sxe.TWL.Data.Models.Pdspickalloccriteria
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdspickalloccriteria.Pickalloccriteria")]
   public partial class Pickalloccriteria : ModelBase
   {
      [StringValidationAttribute]
      public string coNum { get; set; }
      [StringValidationAttribute]
      public string whNum { get; set; }
      [StringValidationAttribute]
      public string order { get; set; }
      [StringValidationAttribute]
      public string orderSuffix { get; set; }
      public int line { get; set; }
      public int lineSequence { get; set; }
      [StringValidationAttribute]
      public string absNum { get; set; }
      public bool availOnly { get; set; }
      public bool unavailOnly { get; set; }
      [StringValidationAttribute]
      public string binNum { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Pickalloccriteria BuildPickalloccriteriaFromRow(DataRow row)
      {
         Pickalloccriteria entity = new Pickalloccriteria();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.order = row.IsNull("order") ? string.Empty : row.Field<string>("order");
         entity.orderSuffix = row.IsNull("order_suffix") ? string.Empty : row.Field<string>("order_suffix");
         entity.line = row.IsNull("line") ? 0 : row.Field<int>("line");
         entity.lineSequence = row.IsNull("line_sequence") ? 0 : row.Field<int>("line_sequence");
         entity.absNum = row.IsNull("abs_num") ? string.Empty : row.Field<string>("abs_num");
         entity.availOnly = row.Field<bool>("avail_only");
         entity.unavailOnly = row.Field<bool>("unavail_only");
         entity.binNum = row.IsNull("bin_num") ? string.Empty : row.Field<string>("bin_num");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPickalloccriteria(ref DataRow row, Pickalloccriteria entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("order", entity.order);
         row.SetField("order_suffix", entity.orderSuffix);
         row.SetField("line", entity.line);
         row.SetField("line_sequence", entity.lineSequence);
         row.SetField("abs_num", entity.absNum);
         row.SetField("avail_only", entity.availOnly);
         row.SetField("unavail_only", entity.unavailOnly);
         row.SetField("bin_num", entity.binNum);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
