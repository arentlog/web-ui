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

namespace Infor.Sxe.PO.Data.Models.Pdsporrarlinetotals
{
   [ModelName("Infor.Sxe.PO.Data.Models.Pdsporrarlinetotals.Porrarlinetotals")]
   public partial class Porrarlinetotals : ModelBase
   {
      public int reportno { get; set; }
      public decimal targetbuy { get; set; }
      [StringValidationAttribute]
      public string currencydesc { get; set; }
      [StringValidationAttribute]
      public string purchprio { get; set; }
      [StringValidationAttribute]
      public string totqtyorderedtarget { get; set; }
      [StringValidationAttribute]
      public string totlineamounttarget { get; set; }
      [StringValidationAttribute]
      public string totweighttarget { get; set; }
      [StringValidationAttribute]
      public string totcubestarget { get; set; }
      public decimal totqtyordered { get; set; }
      public decimal totlineamount { get; set; }
      public decimal totweight { get; set; }
      public decimal totcubes { get; set; }


      public static Porrarlinetotals BuildPorrarlinetotalsFromRow(DataRow row)
      {
         Porrarlinetotals entity = new Porrarlinetotals();
         entity.reportno = row.IsNull("reportno") ? 0 : row.Field<int>("reportno");
         entity.targetbuy = row.IsNull("targetbuy") ? decimal.Zero : row.Field<decimal>("targetbuy");
         entity.currencydesc = row.IsNull("currencydesc") ? string.Empty : row.Field<string>("currencydesc");
         entity.purchprio = row.IsNull("purchprio") ? string.Empty : row.Field<string>("purchprio");
         entity.totqtyorderedtarget = row.IsNull("totqtyorderedtarget") ? string.Empty : row.Field<string>("totqtyorderedtarget");
         entity.totlineamounttarget = row.IsNull("totlineamounttarget") ? string.Empty : row.Field<string>("totlineamounttarget");
         entity.totweighttarget = row.IsNull("totweighttarget") ? string.Empty : row.Field<string>("totweighttarget");
         entity.totcubestarget = row.IsNull("totcubestarget") ? string.Empty : row.Field<string>("totcubestarget");
         entity.totqtyordered = row.IsNull("totqtyordered") ? decimal.Zero : row.Field<decimal>("totqtyordered");
         entity.totlineamount = row.IsNull("totlineamount") ? decimal.Zero : row.Field<decimal>("totlineamount");
         entity.totweight = row.IsNull("totweight") ? decimal.Zero : row.Field<decimal>("totweight");
         entity.totcubes = row.IsNull("totcubes") ? decimal.Zero : row.Field<decimal>("totcubes");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromPorrarlinetotals(ref DataRow row, Porrarlinetotals entity)
      {
         row.SetField("reportno", entity.reportno);
         row.SetField("targetbuy", entity.targetbuy);
         row.SetField("currencydesc", entity.currencydesc);
         row.SetField("purchprio", entity.purchprio);
         row.SetField("totqtyorderedtarget", entity.totqtyorderedtarget);
         row.SetField("totlineamounttarget", entity.totlineamounttarget);
         row.SetField("totweighttarget", entity.totweighttarget);
         row.SetField("totcubestarget", entity.totcubestarget);
         row.SetField("totqtyordered", entity.totqtyordered);
         row.SetField("totlineamount", entity.totlineamount);
         row.SetField("totweight", entity.totweight);
         row.SetField("totcubes", entity.totcubes);

      }
   
   }
}
#pragma warning restore 1591
