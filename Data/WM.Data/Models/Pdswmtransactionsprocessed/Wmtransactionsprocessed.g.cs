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

namespace Infor.Sxe.WM.Data.Models.Pdswmtransactionsprocessed
{
   [ModelName("Infor.Sxe.WM.Data.Models.Pdswmtransactionsprocessed.Wmtransactionsprocessed")]
   public partial class Wmtransactionsprocessed : ModelBase
   {
      [StringValidationAttribute]
      public string whse { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      [StringValidationAttribute]
      public string adjtype { get; set; }
      [StringValidationAttribute]
      public string prod { get; set; }
      [StringValidationAttribute]
      public string tobinloc { get; set; }
      public decimal quantity { get; set; }
      [StringValidationAttribute]
      public string icspnotesfl { get; set; }
      [StringValidationAttribute]
      public string icsplookupnm { get; set; }
      [StringValidationAttribute]
      public string icspunitstock { get; set; }
      public bool msdsfl { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Wmtransactionsprocessed BuildWmtransactionsprocessedFromRow(DataRow row)
      {
         Wmtransactionsprocessed entity = new Wmtransactionsprocessed();
         entity.whse = row.IsNull("whse") ? string.Empty : row.Field<string>("whse");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.adjtype = row.IsNull("adjtype") ? string.Empty : row.Field<string>("adjtype");
         entity.prod = row.IsNull("prod") ? string.Empty : row.Field<string>("prod");
         entity.tobinloc = row.IsNull("tobinloc") ? string.Empty : row.Field<string>("tobinloc");
         entity.quantity = row.IsNull("quantity") ? decimal.Zero : row.Field<decimal>("quantity");
         entity.icspnotesfl = row.IsNull("icspnotesfl") ? string.Empty : row.Field<string>("icspnotesfl");
         entity.icsplookupnm = row.IsNull("icsplookupnm") ? string.Empty : row.Field<string>("icsplookupnm");
         entity.icspunitstock = row.IsNull("icspunitstock") ? string.Empty : row.Field<string>("icspunitstock");
         entity.msdsfl = row.Field<bool>("msdsfl");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromWmtransactionsprocessed(ref DataRow row, Wmtransactionsprocessed entity)
      {
         row.SetField("whse", entity.whse);
         row.SetField("binloc", entity.binloc);
         row.SetField("adjtype", entity.adjtype);
         row.SetField("prod", entity.prod);
         row.SetField("tobinloc", entity.tobinloc);
         row.SetField("quantity", entity.quantity);
         row.SetField("icspnotesfl", entity.icspnotesfl);
         row.SetField("icsplookupnm", entity.icsplookupnm);
         row.SetField("icspunitstock", entity.icspunitstock);
         row.SetField("msdsfl", entity.msdsfl);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
