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
   /// Table contains rules used to determine automatic order dropping
   /// </summary>
   
   public partial class DrpRulesBase: ModelBase
   {

      /// <summary>
      /// Company
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string coNum { get; set; }

      /// <summary>
      /// Warehouse
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string whNum { get; set; }

      /// <summary>
      /// Rule Code
      /// </summary>
      [Key,Order,StringValidationAttribute]
      public string ruleCode { get; set; }

      /// <summary>
      /// Active
      /// </summary>
      public bool active { get; set; }

      /// <summary>
      /// Priority
      /// </summary>
      public int priority { get; set; }

      /// <summary>
      /// criteria
      /// </summary>
      [StringValidationAttribute]
      public string criteria { get; set; }

      /// <summary>
      /// Date and Time
      /// </summary>
      [StringValidationAttribute]
      public string dateTime { get; set; }

      /// <summary>
      /// Seconds Since Midnight
      /// </summary>
      public int dropSecTime { get; set; }

      /// <summary>
      /// Created by
      /// </summary>
      [StringValidationAttribute]
      public string procCreated { get; set; }

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
      /// Status
      /// </summary>
      [StringValidationAttribute]
      public string rowStatus { get; set; }

      /// <summary>
      /// drp_days1
      /// </summary>
      public bool drpDays1 { get; set; }
      public bool drpDays2 { get; set; }
      public bool drpDays3 { get; set; }
      public bool drpDays4 { get; set; }
      public bool drpDays5 { get; set; }
      public bool drpDays6 { get; set; }
      public bool drpDays7 { get; set; }
      public bool drpDays8 { get; set; }

      /// <summary>
      /// drp_now
      /// </summary>
      public bool drpNow { get; set; }

      /// <summary>
      /// spec_tm1
      /// </summary>
      public int specTm1 { get; set; }
      public int specTm2 { get; set; }
      public int specTm3 { get; set; }
      public int specTm4 { get; set; }
      public int specTm5 { get; set; }
      public int specTm6 { get; set; }

      /// <summary>
      /// Every ?
      /// </summary>
      public int everyNum { get; set; }

      /// <summary>
      /// Hrs/Mins
      /// </summary>
      [StringValidationAttribute]
      public string everyWhat { get; set; }

      /// <summary>
      /// starttm
      /// </summary>
      public int starttm { get; set; }

      /// <summary>
      /// stoptm
      /// </summary>
      public int stoptm { get; set; }

      /// <summary>
      /// criteria_list
      /// </summary>
      [StringValidationAttribute]
      public string criteriaList { get; set; }

      /// <summary>
      /// undo_list
      /// </summary>
      [StringValidationAttribute]
      public string undoList { get; set; }

      /// <summary>
      /// redo_list
      /// </summary>
      [StringValidationAttribute]
      public string redoList { get; set; }

      /// <summary>
      /// redo_criteria
      /// </summary>
      [StringValidationAttribute]
      public string redoCriteria { get; set; }

      /// <summary>
      /// lastrundt
      /// </summary>
      public DateTime? lastrundt { get; set; }

      /// <summary>
      /// lastruntm
      /// </summary>
      public int lastruntm { get; set; }

      /// <summary>
      /// nextrundt
      /// </summary>
      public DateTime? nextrundt { get; set; }

      /// <summary>
      /// nextruntm
      /// </summary>
      public int nextruntm { get; set; }

      /// <summary>
      /// employee
      /// </summary>
      [StringValidationAttribute]
      public string employee { get; set; }

      /// <summary>
      /// Employee Number
      /// </summary>
      [StringValidationAttribute]
      public string createby { get; set; }

      /// <summary>
      /// modifydt
      /// </summary>
      public DateTime? modifydt { get; set; }

      /// <summary>
      /// modifytm
      /// </summary>
      public int modifytm { get; set; }

      /// <summary>
      /// modifyby
      /// </summary>
      [StringValidationAttribute]
      public string modifyby { get; set; }

      /// <summary>
      /// processing
      /// </summary>
      public int processing { get; set; }

      /// <summary>
      /// The last query for this record
      /// </summary>
      [StringValidationAttribute]
      public string drpQuery { get; set; }

      /// <summary>
      /// Printer Id
      /// </summary>
      [StringValidationAttribute]
      public string printerId { get; set; }

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
      public static T BuildDrpRulesBaseFromRow<T>(DataRow row) where T:DrpRulesBase, new()
      {
         T entity = new T();
         entity.coNum = row.IsNull("co_num") ? string.Empty : row.Field<string>("co_num");
         entity.whNum = row.IsNull("wh_num") ? string.Empty : row.Field<string>("wh_num");
         entity.ruleCode = row.IsNull("rule_code") ? string.Empty : row.Field<string>("rule_code");
         entity.active = row.Field<bool>("active");
         entity.priority = row.IsNull("priority") ? 0 : row.Field<int>("priority");
         entity.criteria = row.IsNull("criteria") ? string.Empty : row.Field<string>("criteria");
         entity.dateTime = row.IsNull("date_time") ? string.Empty : row.Field<string>("date_time");
         entity.dropSecTime = row.IsNull("drop_sec_time") ? 0 : row.Field<int>("drop_sec_time");
         entity.procCreated = row.IsNull("proc_created") ? string.Empty : row.Field<string>("proc_created");
         entity.customData1 = row.IsNull("custom_data1") ? string.Empty : row.Field<string>("custom_data1");
         entity.customData2 = row.IsNull("custom_data2") ? string.Empty : row.Field<string>("custom_data2");
         entity.customData3 = row.IsNull("custom_data3") ? string.Empty : row.Field<string>("custom_data3");
         entity.customData4 = row.IsNull("custom_data4") ? string.Empty : row.Field<string>("custom_data4");
         entity.customData5 = row.IsNull("custom_data5") ? string.Empty : row.Field<string>("custom_data5");
         entity.rowStatus = row.IsNull("row_status") ? string.Empty : row.Field<string>("row_status");
         entity.drpDays1 = row.Field<bool>("drp_days1");
         entity.drpDays2 = row.Field<bool>("drp_days2");
         entity.drpDays3 = row.Field<bool>("drp_days3");
         entity.drpDays4 = row.Field<bool>("drp_days4");
         entity.drpDays5 = row.Field<bool>("drp_days5");
         entity.drpDays6 = row.Field<bool>("drp_days6");
         entity.drpDays7 = row.Field<bool>("drp_days7");
         entity.drpDays8 = row.Field<bool>("drp_days8");
         entity.drpNow = row.Field<bool>("drp_now");
         entity.specTm1 = row.IsNull("spec_tm1") ? 0 : row.Field<int>("spec_tm1");
         entity.specTm2 = row.IsNull("spec_tm2") ? 0 : row.Field<int>("spec_tm2");
         entity.specTm3 = row.IsNull("spec_tm3") ? 0 : row.Field<int>("spec_tm3");
         entity.specTm4 = row.IsNull("spec_tm4") ? 0 : row.Field<int>("spec_tm4");
         entity.specTm5 = row.IsNull("spec_tm5") ? 0 : row.Field<int>("spec_tm5");
         entity.specTm6 = row.IsNull("spec_tm6") ? 0 : row.Field<int>("spec_tm6");
         entity.everyNum = row.IsNull("every_num") ? 0 : row.Field<int>("every_num");
         entity.everyWhat = row.IsNull("every_what") ? string.Empty : row.Field<string>("every_what");
         entity.starttm = row.IsNull("starttm") ? 0 : row.Field<int>("starttm");
         entity.stoptm = row.IsNull("stoptm") ? 0 : row.Field<int>("stoptm");
         entity.criteriaList = row.IsNull("criteria_list") ? string.Empty : row.Field<string>("criteria_list");
         entity.undoList = row.IsNull("undo_list") ? string.Empty : row.Field<string>("undo_list");
         entity.redoList = row.IsNull("redo_list") ? string.Empty : row.Field<string>("redo_list");
         entity.redoCriteria = row.IsNull("redo_criteria") ? string.Empty : row.Field<string>("redo_criteria");
         entity.lastrundt = row.Field<DateTime?>("lastrundt");
         entity.lastruntm = row.IsNull("lastruntm") ? 0 : row.Field<int>("lastruntm");
         entity.nextrundt = row.Field<DateTime?>("nextrundt");
         entity.nextruntm = row.IsNull("nextruntm") ? 0 : row.Field<int>("nextruntm");
         entity.employee = row.IsNull("employee") ? string.Empty : row.Field<string>("employee");
         entity.createby = row.IsNull("createby") ? string.Empty : row.Field<string>("createby");
         entity.modifydt = row.Field<DateTime?>("modifydt");
         entity.modifytm = row.IsNull("modifytm") ? 0 : row.Field<int>("modifytm");
         entity.modifyby = row.IsNull("modifyby") ? string.Empty : row.Field<string>("modifyby");
         entity.processing = row.IsNull("processing") ? 0 : row.Field<int>("processing");
         entity.drpQuery = row.IsNull("drp_query") ? string.Empty : row.Field<string>("drp_query");
         entity.printerId = row.IsNull("printer_id") ? string.Empty : row.Field<string>("printer_id");
         entity.transUser = row.IsNull("trans_user") ? string.Empty : row.Field<string>("trans_user");
         entity.transDate = row.IsNull("trans_date") ? string.Empty : row.Field<string>("trans_date");
         entity.transProc = row.IsNull("trans_proc") ? string.Empty : row.Field<string>("trans_proc");
         entity.rowID = row.Field<byte[]>("drp_rulesRowID").ToStringEncoded();
         return entity;
      }

      /// <summary>
      /// Update a database row from a class
      /// </summary>
      public static void UpdateRowFromDrpRulesBase(ref DataRow row, DrpRulesBase entity)
      {
         row.SetField("co_num", entity.coNum);
         row.SetField("wh_num", entity.whNum);
         row.SetField("rule_code", entity.ruleCode);
         row.SetField("active", entity.active);
         row.SetField("priority", entity.priority);
         row.SetField("criteria", entity.criteria);
         row.SetField("date_time", entity.dateTime);
         row.SetField("drop_sec_time", entity.dropSecTime);
         row.SetField("proc_created", entity.procCreated);
         row.SetField("custom_data1", entity.customData1);
         row.SetField("custom_data2", entity.customData2);
         row.SetField("custom_data3", entity.customData3);
         row.SetField("custom_data4", entity.customData4);
         row.SetField("custom_data5", entity.customData5);
         row.SetField("row_status", entity.rowStatus);
         row.SetField("drp_days1", entity.drpDays1);
         row.SetField("drp_days2", entity.drpDays2);
         row.SetField("drp_days3", entity.drpDays3);
         row.SetField("drp_days4", entity.drpDays4);
         row.SetField("drp_days5", entity.drpDays5);
         row.SetField("drp_days6", entity.drpDays6);
         row.SetField("drp_days7", entity.drpDays7);
         row.SetField("drp_days8", entity.drpDays8);
         row.SetField("drp_now", entity.drpNow);
         row.SetField("spec_tm1", entity.specTm1);
         row.SetField("spec_tm2", entity.specTm2);
         row.SetField("spec_tm3", entity.specTm3);
         row.SetField("spec_tm4", entity.specTm4);
         row.SetField("spec_tm5", entity.specTm5);
         row.SetField("spec_tm6", entity.specTm6);
         row.SetField("every_num", entity.everyNum);
         row.SetField("every_what", entity.everyWhat);
         row.SetField("starttm", entity.starttm);
         row.SetField("stoptm", entity.stoptm);
         row.SetField("criteria_list", entity.criteriaList);
         row.SetField("undo_list", entity.undoList);
         row.SetField("redo_list", entity.redoList);
         row.SetField("redo_criteria", entity.redoCriteria);
         row.SetField("lastrundt", entity.lastrundt);
         row.SetField("lastruntm", entity.lastruntm);
         row.SetField("nextrundt", entity.nextrundt);
         row.SetField("nextruntm", entity.nextruntm);
         row.SetField("employee", entity.employee);
         row.SetField("createby", entity.createby);
         row.SetField("modifydt", entity.modifydt);
         row.SetField("modifytm", entity.modifytm);
         row.SetField("modifyby", entity.modifyby);
         row.SetField("processing", entity.processing);
         row.SetField("drp_query", entity.drpQuery);
         row.SetField("printer_id", entity.printerId);
         row.SetField("trans_user", entity.transUser);
         row.SetField("trans_date", entity.transDate);
         row.SetField("trans_proc", entity.transProc);
         row.SetField("drp_rulesRowID", entity.rowID.ToByteArray());
      }   
      
      /// <summary>
      /// Build a minimal row from a class (key fields only)
      /// </summary>
      public static void BuildMinimalRow(ref DataRow row, DrpRulesBase entity)
      {
         row.SetField("coNum", entity.coNum);
         row.SetField("whNum", entity.whNum);
         row.SetField("ruleCode", entity.ruleCode);
         row.SetField("drp_rulesRowID", entity.rowID.ToByteArray());
      }   
   }
}
#pragma warning restore 1591
	