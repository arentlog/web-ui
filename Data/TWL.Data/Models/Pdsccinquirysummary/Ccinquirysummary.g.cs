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

namespace Infor.Sxe.TWL.Data.Models.Pdsccinquirysummary
{
   [ModelName("Infor.Sxe.TWL.Data.Models.Pdsccinquirysummary.Ccinquirysummary")]
   public partial class Ccinquirysummary : ModelBase
   {
      public int totalWaves { get; set; }
      public decimal areOpen { get; set; }
      public decimal areCounted { get; set; }
      public decimal totalCounts { get; set; }
      public decimal cycleDisc { get; set; }
      [StringValidationAttribute]
      public string completed { get; set; }
      [StringValidationAttribute]
      public string customData1 { get; set; }
      [StringValidationAttribute]
      public string customData2 { get; set; }
      [StringValidationAttribute]
      public string customData3 { get; set; }
      [StringValidationAttribute]
      public string customData4 { get; set; }
      [StringValidationAttribute]
      public string customData5 { get; set; }
      [StringValidationAttribute]
      public string cycleString { get; set; }
      [StringValidationAttribute]
      public string cycleType { get; set; }
      public int id { get; set; }
      [StringValidationAttribute]
      public string requested { get; set; }
      public bool rowStatus { get; set; }
      [StringValidationAttribute]
      public string started { get; set; }
      public int taskId { get; set; }
      [StringValidationAttribute]
      public string transDate { get; set; }
      [StringValidationAttribute]
      public string transProc { get; set; }
      [StringValidationAttribute]
      public string transUser { get; set; }
      public bool transEnabled { get; set; }
      public bool invEnabled { get; set; }
      [StringValidationAttribute]
      public string userfield { get; set; }


      public static Ccinquirysummary BuildCcinquirysummaryFromRow(DataRow row)
      {
         Ccinquirysummary entity = new Ccinquirysummary();
         entity.totalWaves = row.IsNull("total_waves") ? 0 : row.Field<int>("total_waves");
         entity.areOpen = row.IsNull("are_open") ? decimal.Zero : row.Field<decimal>("are_open");
         entity.areCounted = row.IsNull("are_counted") ? decimal.Zero : row.Field<decimal>("are_counted");
         entity.totalCounts = row.IsNull("total_counts") ? decimal.Zero : row.Field<decimal>("total_counts");
         entity.cycleDisc = row.IsNull("cycle_disc") ? decimal.Zero : row.Field<decimal>("cycle_disc");
         entity.completed = row.IsNull("completed") ? string.Empty : row.Field<string>("completed");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.cycleString = row.IsNull("cycle_string") ? string.Empty : row.Field<string>("cycle_string");
         entity.cycleType = row.IsNull("cycle_type") ? string.Empty : row.Field<string>("cycle_type");
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.requested = row.IsNull("requested") ? string.Empty : row.Field<string>("requested");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.started = row.IsNull("started") ? string.Empty : row.Field<string>("started");
         entity.taskId = row.IsNull("task_id") ? 0 : row.Field<int>("task_id");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transEnabled = row.Field<bool>("trans_enabled");
         entity.invEnabled = row.Field<bool>("inv_enabled");
         entity.userfield = row.IsNull("userfield") ? string.Empty : row.Field<string>("userfield");
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCcinquirysummary(ref DataRow row, Ccinquirysummary entity)
      {
         row.SetField("total_waves", entity.totalWaves);
         row.SetField("are_open", entity.areOpen);
         row.SetField("are_counted", entity.areCounted);
         row.SetField("total_counts", entity.totalCounts);
         row.SetField("cycle_disc", entity.cycleDisc);
         row.SetField("completed", entity.completed);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("cycle_string", entity.cycleString);
         row.SetField("cycle_type", entity.cycleType);
         row.SetField("id", entity.id);
         row.SetField("requested", entity.requested);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("started", entity.started);
         row.SetField("task_id", entity.taskId);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_enabled", entity.transEnabled);
         row.SetField("inv_enabled", entity.invEnabled);
         row.SetField("userfield", entity.userfield);

      }
   
   }
}
#pragma warning restore 1591
