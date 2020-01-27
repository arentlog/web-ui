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

namespace Infor.Sxe.OE.Data.Models.Pdsoelinepricetab
{
   [ModelName("Infor.Sxe.OE.Data.Models.Pdsoelinepricetab.Oelinepricetabpricelvl")]
   public partial class Oelinepricetabpricelvl : ModelBase
   {
      public int level { get; set; }
      public decimal price { get; set; }
      [StringValidationAttribute]
      public string pricedspl { get; set; }
      public decimal qty { get; set; }
      [StringValidationAttribute]
      public string qtydspl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Oelinepricetabpricelvl BuildOelinepricetabpricelvlFromRow(DataRow row)
      {
         Oelinepricetabpricelvl entity = new Oelinepricetabpricelvl();
         entity.level = row.IsNull("level") ? 0 : row.Field<int>("level");
         entity.price = row.IsNull("price") ? decimal.Zero : row.Field<decimal>("price");
         entity.pricedspl = row.IsNull("pricedspl") ? string.Empty : row.Field<string>("pricedspl");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.qtydspl = row.IsNull("qtydspl") ? string.Empty : row.Field<string>("qtydspl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOelinepricetabpricelvl(ref DataRow row, Oelinepricetabpricelvl entity)
      {
         row.SetField("level", entity.level);
         row.SetField("price", entity.price);
         row.SetField("pricedspl", entity.pricedspl);
         row.SetField("qty", entity.qty);
         row.SetField("qtydspl", entity.qtydspl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
