//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 12700 $
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
using ServiceInterfaceClient.Attributes;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Interfaces;
       
namespace Infor.Sxe.Common.Data.Models.TWL
{
   /// <summary>
   /// Table used by the warehouse administrator to set up automatic cycle counts
   /// </summary>
   
   public partial class CycleCntBase: ModelBase
   {

      /// <summary>
      /// Id
      /// </summary>
      [Key,Order]
      public int id { get; set; }

      /// <summary>
      /// Company
      /// </summary>
      [StringValidationAttribute]
      public string coNum { get; set; }

      /// <summary>
      /// Warehouse
      /// </summary>
      [StringValidationAttribute]
      public string whNum { get; set; }

      /// <summary>
      /// Type of Cycle Count
      /// </summary>
      [StringValidationAttribute]
      public string cycleType { get; set; }

      /// <summary>
      /// Level of Cycle Count
      /// </summary>
      [StringValidationAttribute]
      public string cycleString { get; set; }

      /// <summary>
      /// Requested
      /// </summary>
      [StringValidationAttribute]
      public string requested { get; set; }

      /// <summary>
      /// Started
      /// </summary>
      [StringValidationAttribute]
      public string started { get; set; }

      /// <summary>
      /// Completed
      /// </summary>
      [StringValidationAttribute]
      public string completed { get; set; }

      /// <summary>
      /// Task Id
      /// </summary>
      public int taskId { get; set; }

      /// <summary>
      /// Employee Number
      /// </summary>
      [StringValidationAttribute]
      public string empNum { get; set; }

      /// <summary>
      /// custom_data1
      /// </summary>
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

      /// <summary>
      /// Active
      /// </summary>
      public bool rowStatus { get; set; }

      /// <summary>
      /// trans_user
      /// </summary>
      [StringValidationAttribute]
      public string transUser { get; set; }

      /// <summary>
      /// trans_date
      /// </summary>
      [StringValidationAttribute]
      public string transDate { get; set; }

      /// <summary>
      /// trans_proc
      /// </summary>
      [StringValidationAttribute]
      public string transProc { get; set; }
      
      /// <summary>
      /// Row ID
      /// </summary>
      [StringValidationAttribute]
      public string rowID { get; set; }



      /// <summary>
      /// Build a class from a database row
      /// </summary>
      public static T BuildCycleCntBaseFromRow<T>(DataRow row) where T:CycleCntBase, new()
      {
         T entity = new T();
         entity.id = row.IsNull("id") ? 0 : row.Field<int>("id");
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.cycleType = row.IsNull("cycle_type") ? string.Empty : row.Field<string>("cycle_type");
         entity.cycleString = row.IsNull("cycle_string") ? string.Empty : row.Field<string>("cycle_string");
         entity.requested = row.IsNull("requested") ? string.Empty : row.Field<string>("requested");
         entity.started = row.IsNull("started") ? string.Empty : row.Field<string>("started");
         entity.completed = row.IsNull("completed") ? string.Empty : row.Field<string>("completed");
         entity.taskId = row.IsNull("task_id") ? 0 : row.Field<int>("task_id");
         entity.empNum = row.IsNull("emp_num") ? string.Empty : row.Field<string>("emp_num");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.rowStatus = row.Field<bool>("row_status");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("cycle_cntRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromCycleCntBase(ref DataRow row, CycleCntBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("cycle_type", entity.cycleType);
         row.SetField("cycle_string", entity.cycleString);
         row.SetField("requested", entity.requested);
         row.SetField("started", entity.started);
         row.SetField("completed", entity.completed);
         row.SetField("task_id", entity.taskId);
         row.SetField("emp_num", entity.empNum);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("cycle_cntRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, CycleCntBase entity)
      {
         row.SetField("id", entity.id);
         row.SetField("cycle_cntRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	