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

namespace Infor.Sxe.IC.Data.Models.Pdsiceanmaintretrieve
{
   [ModelName("Infor.Sxe.IC.Data.Models.Pdsiceanmaintretrieve.Iceanmaintretrievesingle")]
   public partial class Iceanmaintretrievesingle : ModelBase
   {
      [StringValidationAttribute]
      public string adjustmentlabel { get; set; }
      [StringValidationAttribute]
      public string qty1 { get; set; }
      [StringValidationAttribute]
      public string qty2 { get; set; }
      [StringValidationAttribute]
      public string qty3 { get; set; }
      [StringValidationAttribute]
      public string qty4 { get; set; }
      [StringValidationAttribute]
      public string qty5 { get; set; }
      [StringValidationAttribute]
      public string unit1 { get; set; }
      [StringValidationAttribute]
      public string unit2 { get; set; }
      [StringValidationAttribute]
      public string unit3 { get; set; }
      [StringValidationAttribute]
      public string unit4 { get; set; }
      [StringValidationAttribute]
      public string unit5 { get; set; }
      [StringValidationAttribute]
      public string amount1 { get; set; }
      [StringValidationAttribute]
      public string amount2 { get; set; }
      [StringValidationAttribute]
      public string amount3 { get; set; }
      [StringValidationAttribute]
      public string amount4 { get; set; }
      [StringValidationAttribute]
      public string amount5 { get; set; }
      [StringValidationAttribute]
      public string total1 { get; set; }
      [StringValidationAttribute]
      public string total2 { get; set; }
      [StringValidationAttribute]
      public string total3 { get; set; }
      [StringValidationAttribute]
      public string total4 { get; set; }
      [StringValidationAttribute]
      public string total5 { get; set; }
      [StringValidationAttribute]
      public string balancetotal { get; set; }
      public decimal qty { get; set; }
      public bool enableqty { get; set; }
      [StringValidationAttribute]
      public string unit { get; set; }
      public bool enableunit { get; set; }
      public decimal amount { get; set; }
      public decimal total { get; set; }
      public bool enabletotal { get; set; }
      [StringValidationAttribute]
      public string binloc { get; set; }
      public bool enablebinloc { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Iceanmaintretrievesingle BuildIceanmaintretrievesingleFromRow(DataRow row)
      {
         Iceanmaintretrievesingle entity = new Iceanmaintretrievesingle();
         entity.adjustmentlabel = row.IsNull("adjustmentlabel") ? string.Empty : row.Field<string>("adjustmentlabel");
         entity.qty1 = row.IsNull("qty1") ? string.Empty : row.Field<string>("qty1");
         entity.qty2 = row.IsNull("qty2") ? string.Empty : row.Field<string>("qty2");
         entity.qty3 = row.IsNull("qty3") ? string.Empty : row.Field<string>("qty3");
         entity.qty4 = row.IsNull("qty4") ? string.Empty : row.Field<string>("qty4");
         entity.qty5 = row.IsNull("qty5") ? string.Empty : row.Field<string>("qty5");
         entity.unit1 = row.IsNull("unit1") ? string.Empty : row.Field<string>("unit1");
         entity.unit2 = row.IsNull("unit2") ? string.Empty : row.Field<string>("unit2");
         entity.unit3 = row.IsNull("unit3") ? string.Empty : row.Field<string>("unit3");
         entity.unit4 = row.IsNull("unit4") ? string.Empty : row.Field<string>("unit4");
         entity.unit5 = row.IsNull("unit5") ? string.Empty : row.Field<string>("unit5");
         entity.amount1 = row.IsNull("amount1") ? string.Empty : row.Field<string>("amount1");
         entity.amount2 = row.IsNull("amount2") ? string.Empty : row.Field<string>("amount2");
         entity.amount3 = row.IsNull("amount3") ? string.Empty : row.Field<string>("amount3");
         entity.amount4 = row.IsNull("amount4") ? string.Empty : row.Field<string>("amount4");
         entity.amount5 = row.IsNull("amount5") ? string.Empty : row.Field<string>("amount5");
         entity.total1 = row.IsNull("total1") ? string.Empty : row.Field<string>("total1");
         entity.total2 = row.IsNull("total2") ? string.Empty : row.Field<string>("total2");
         entity.total3 = row.IsNull("total3") ? string.Empty : row.Field<string>("total3");
         entity.total4 = row.IsNull("total4") ? string.Empty : row.Field<string>("total4");
         entity.total5 = row.IsNull("total5") ? string.Empty : row.Field<string>("total5");
         entity.balancetotal = row.IsNull("balancetotal") ? string.Empty : row.Field<string>("balancetotal");
         entity.qty = row.IsNull("qty") ? decimal.Zero : row.Field<decimal>("qty");
         entity.enableqty = row.Field<bool>("enableqty");
         entity.unit = row.IsNull("unit") ? string.Empty : row.Field<string>("unit");
         entity.enableunit = row.Field<bool>("enableunit");
         entity.amount = row.IsNull("amount") ? decimal.Zero : row.Field<decimal>("amount");
         entity.total = row.IsNull("total") ? decimal.Zero : row.Field<decimal>("total");
         entity.enabletotal = row.Field<bool>("enabletotal");
         entity.binloc = row.IsNull("binloc") ? string.Empty : row.Field<string>("binloc");
         entity.enablebinloc = row.Field<bool>("enablebinloc");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromIceanmaintretrievesingle(ref DataRow row, Iceanmaintretrievesingle entity)
      {
         row.SetField("adjustmentlabel", entity.adjustmentlabel);
         row.SetField("qty1", entity.qty1);
         row.SetField("qty2", entity.qty2);
         row.SetField("qty3", entity.qty3);
         row.SetField("qty4", entity.qty4);
         row.SetField("qty5", entity.qty5);
         row.SetField("unit1", entity.unit1);
         row.SetField("unit2", entity.unit2);
         row.SetField("unit3", entity.unit3);
         row.SetField("unit4", entity.unit4);
         row.SetField("unit5", entity.unit5);
         row.SetField("amount1", entity.amount1);
         row.SetField("amount2", entity.amount2);
         row.SetField("amount3", entity.amount3);
         row.SetField("amount4", entity.amount4);
         row.SetField("amount5", entity.amount5);
         row.SetField("total1", entity.total1);
         row.SetField("total2", entity.total2);
         row.SetField("total3", entity.total3);
         row.SetField("total4", entity.total4);
         row.SetField("total5", entity.total5);
         row.SetField("balancetotal", entity.balancetotal);
         row.SetField("qty", entity.qty);
         row.SetField("enableqty", entity.enableqty);
         row.SetField("unit", entity.unit);
         row.SetField("enableunit", entity.enableunit);
         row.SetField("amount", entity.amount);
         row.SetField("total", entity.total);
         row.SetField("enabletotal", entity.enabletotal);
         row.SetField("binloc", entity.binloc);
         row.SetField("enablebinloc", entity.enablebinloc);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591