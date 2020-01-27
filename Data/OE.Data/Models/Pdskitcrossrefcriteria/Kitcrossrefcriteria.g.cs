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

namespace Infor.Sxe.OE.Data.Models.Pdskitcrossrefcriteria
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdskitcrossrefcriteria.Kitcrossrefcriteria")]
   public partial class Kitcrossrefcriteria : ModelBase
   {
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string type { get; set; }
      public decimal qty { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      [StringValidationAttribute]
      public string fabwhse { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kitcrossrefcriteria BuildKitcrossrefcriteriaFromRow(DataRow row)
      {
         Kitcrossrefcriteria entity = new Kitcrossrefcriteria();
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.type = row.IsNull("type") ? string.Empty : row.Field<string>("type");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.fabwhse = row.IsNull("fabwhse") ? string.Empty : row.Field<string>("fabwhse");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKitcrossrefcriteria(ref DataRow row, Kitcrossrefcriteria entity)
      {
         row.SetField("prod", entity.prod);
         row.SetField("whse", entity.whse);
         row.SetField("type", entity.type);
         row.SetField("qty", entity.qty);
         row.SetField("unit", entity.unit);
         row.SetField("fabwhse", entity.fabwhse);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
