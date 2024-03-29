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

namespace Infor.Sxe.TWL.Data.Models.Pdsorderavailsummary
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsorderavailsummary.Orderavailsummary")]
   public partial class Orderavailsummary : ModelBase
   {
      public decimal percentLinesComplete { get; set; }
      public decimal percentUnitsComplete { get; set; }
      [StringValidationAttribute]
      public string orderavailsummaryuserfield { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Orderavailsummary BuildOrderavailsummaryFromRow(DataRow row)
      {
         Orderavailsummary entity = new Orderavailsummary();
         entity.percentLinesComplete = row.IsNull("percent_lines_complete") ? decimal.Zero : row.Field<decimal>("percent_lines_complete");
         entity.percentUnitsComplete = row.IsNull("percent_units_complete") ? decimal.Zero : row.Field<decimal>("percent_units_complete");
         entity.orderavailsummaryuserfield = row.IsNull("orderavailsummaryuserfield") ? string.Empty : row.Field<string>("orderavailsummaryuserfield");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromOrderavailsummary(ref DataRow row, Orderavailsummary entity)
      {
         row.SetField("percent_lines_complete", entity.percentLinesComplete);
         row.SetField("percent_units_complete", entity.percentUnitsComplete);
         row.SetField("orderavailsummaryuserfield", entity.orderavailsummaryuserfield);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
