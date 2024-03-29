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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarrepttotals
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarrepttotals.Porrarrepttotals")]
   public partial class Porrarrepttotals : ModelBase
   {
      public decimal mergeamount { get; set; }
      public decimal mergecubes { get; set; }
      public decimal mergeweight { get; set; }
      public decimal mergeqtyordered { get; set; }
      public decimal totalamount { get; set; }
      public decimal totalcubes { get; set; }
      public decimal totalweight { get; set; }
      public decimal totalqtyordered { get; set; }
      public int nolineschanged { get; set; }
      public int nolinesadded { get; set; }
      public int nolinesdeleted { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }
      public int purcprirushcnt { get; set; }
      public decimal purcprirushtotal { get; set; }
      public int purcpribelowopcnt { get; set; }
      public decimal purcpribelowoptotal { get; set; }
      public int purcpribelowcritcnt { get; set; }
      public decimal purcpribelowcrittotal { get; set; }
      public int purcprinegnetavlcnt { get; set; }
      public decimal purcprinegnetavltotal { get; set; }
      public int purcpridoctiescnt { get; set; }
      public decimal purcpridoctiestotal { get; set; }
      public int purcprinormalcnt { get; set; }
      public decimal purcprinormaltotal { get; set; }


      public static Porrarrepttotals BuildPorrarrepttotalsFromRow(DataRow row)
      {
         Porrarrepttotals entity = new Porrarrepttotals();
         entity.mergeamount = row.IsNull("mergeamount") ? decimal.Zero : row.Field<decimal>("mergeamount");
         entity.mergecubes = row.IsNull("mergecubes") ? decimal.Zero : row.Field<decimal>("mergecubes");
         entity.mergeweight = row.IsNull("mergeweight") ? decimal.Zero : row.Field<decimal>("mergeweight");
         entity.mergeqtyordered = row.IsNull("mergeqtyordered") ? decimal.Zero : row.Field<decimal>("mergeqtyordered");
         entity.totalamount = row.IsNull("totalamount") ? decimal.Zero : row.Field<decimal>("totalamount");
         entity.totalcubes = row.IsNull("totalcubes") ? decimal.Zero : row.Field<decimal>("totalcubes");
         entity.totalweight = row.IsNull("totalweight") ? decimal.Zero : row.Field<decimal>("totalweight");
         entity.totalqtyordered = row.IsNull("totalqtyordered") ? decimal.Zero : row.Field<decimal>("totalqtyordered");
         entity.nolineschanged = row.IsNull("nolineschanged") ? 0 : row.Field<int>("nolineschanged");
         entity.nolinesadded = row.IsNull("nolinesadded") ? 0 : row.Field<int>("nolinesadded");
         entity.nolinesdeleted = row.IsNull("nolinesdeleted") ? 0 : row.Field<int>("nolinesdeleted");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         entity.purcprirushcnt = row.IsNull("purcprirushcnt") ? 0 : row.Field<int>("purcprirushcnt");
         entity.purcprirushtotal = row.IsNull("purcprirushtotal") ? decimal.Zero : row.Field<decimal>("purcprirushtotal");
         entity.purcpribelowopcnt = row.IsNull("purcpribelowopcnt") ? 0 : row.Field<int>("purcpribelowopcnt");
         entity.purcpribelowoptotal = row.IsNull("purcpribelowoptotal") ? decimal.Zero : row.Field<decimal>("purcpribelowoptotal");
         entity.purcpribelowcritcnt = row.IsNull("purcpribelowcritcnt") ? 0 : row.Field<int>("purcpribelowcritcnt");
         entity.purcpribelowcrittotal = row.IsNull("purcpribelowcrittotal") ? decimal.Zero : row.Field<decimal>("purcpribelowcrittotal");
         entity.purcprinegnetavlcnt = row.IsNull("purcprinegnetavlcnt") ? 0 : row.Field<int>("purcprinegnetavlcnt");
         entity.purcprinegnetavltotal = row.IsNull("purcprinegnetavltotal") ? decimal.Zero : row.Field<decimal>("purcprinegnetavltotal");
         entity.purcpridoctiescnt = row.IsNull("purcpridoctiescnt") ? 0 : row.Field<int>("purcpridoctiescnt");
         entity.purcpridoctiestotal = row.IsNull("purcpridoctiestotal") ? decimal.Zero : row.Field<decimal>("purcpridoctiestotal");
         entity.purcprinormalcnt = row.IsNull("purcprinormalcnt") ? 0 : row.Field<int>("purcprinormalcnt");
         entity.purcprinormaltotal = row.IsNull("purcprinormaltotal") ? decimal.Zero : row.Field<decimal>("purcprinormaltotal");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarrepttotals(ref DataRow row, Porrarrepttotals entity)
      {
         row.SetField("mergeamount", entity.mergeamount);
         row.SetField("mergecubes", entity.mergecubes);
         row.SetField("mergeweight", entity.mergeweight);
         row.SetField("mergeqtyordered", entity.mergeqtyordered);
         row.SetField("totalamount", entity.totalamount);
         row.SetField("totalcubes", entity.totalcubes);
         row.SetField("totalweight", entity.totalweight);
         row.SetField("totalqtyordered", entity.totalqtyordered);
         row.SetField("nolineschanged", entity.nolineschanged);
         row.SetField("nolinesadded", entity.nolinesadded);
         row.SetField("nolinesdeleted", entity.nolinesdeleted);
         row.SetField("userfield", entity.userfield);
         row.SetField("purcprirushcnt", entity.purcprirushcnt);
         row.SetField("purcprirushtotal", entity.purcprirushtotal);
         row.SetField("purcpribelowopcnt", entity.purcpribelowopcnt);
         row.SetField("purcpribelowoptotal", entity.purcpribelowoptotal);
         row.SetField("purcpribelowcritcnt", entity.purcpribelowcritcnt);
         row.SetField("purcpribelowcrittotal", entity.purcpribelowcrittotal);
         row.SetField("purcprinegnetavlcnt", entity.purcprinegnetavlcnt);
         row.SetField("purcprinegnetavltotal", entity.purcprinegnetavltotal);
         row.SetField("purcpridoctiescnt", entity.purcpridoctiescnt);
         row.SetField("purcpridoctiestotal", entity.purcpridoctiestotal);
         row.SetField("purcprinormalcnt", entity.purcprinormalcnt);
         row.SetField("purcprinormaltotal", entity.purcprinormaltotal);

      }
   
   }
}
#pragma warning restore 1591
