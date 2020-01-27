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

namespace Infor.Sxe.OE.Data.Models.Pdskitsplitupdate
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdskitsplitupdate.Kitsplitupdate")]
   public partial class Kitsplitupdate : ModelBase
   {
      public decimal price { get; set; }
      public bool priceoverfl { get; set; }
      public decimal kitsplitamt { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Kitsplitupdate BuildKitsplitupdateFromRow(DataRow row)
      {
         Kitsplitupdate entity = new Kitsplitupdate();
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.priceoverfl = row.Field<bool>("priceoverfl");
         entity.kitsplitamt = row.IsNull("kitsplitamt") ? decimal.Zero : row.Field<decimal>("kitsplitamt");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromKitsplitupdate(ref DataRow row, Kitsplitupdate entity)
      {
         row.SetField("price", entity.price);
         row.SetField("priceoverfl", entity.priceoverfl);
         row.SetField("kitsplitamt", entity.kitsplitamt);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
