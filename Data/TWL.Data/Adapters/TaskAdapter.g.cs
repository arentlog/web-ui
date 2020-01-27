//------------------------------------------------------------------------------
// 
//     This code was generated by a tool.
//     Template version $Rev: 21496 $
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//
//     (c) Infor Global Solutions 2018
// 
//------------------------------------------------------------------------------

#pragma warning disable 1591
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using NLog;
using ServiceInterfaceClient.BaseClasses;
using ServiceInterfaceClient.Extensions;
using ServiceInterfaceClient.Helpers;
using ServiceInterfaceClient.Progress;
    
namespace Infor.Sxe.TWL.Data.Adapters
{
   using com.infor.sxproxy.twlproxy;
   using com.infor.sxproxy.twlproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdstask;

   public partial class TaskAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdstask";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> taskTableControlKey;
		
      private pdstaskDataSet dataSet;
        
      public TaskAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdstaskDataSet() { DataSetName = DataSetName };
            this.taskTableControlKey = this.dataSet.ttbltask.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.taskTableControlKey))
            {
               this.CreateTableControlParameters(this.taskTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in TaskAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Taskproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poTaskproxy = this.proxyAppObject.CreatePO_taskproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poTaskproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Taskproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.taskTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.taskTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Taskproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poTaskproxy = this.proxyAppObject.CreatePO_taskproxy())
               {
                  this.SetRequiredContextParameters();
                  poTaskproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Taskproxy - After Call");
      }
   

      public Task GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Task task = null;
         if (row != null)
         {
             task = this.BuildFromRow(row);
         }
         return task;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(task) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbltask.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Task> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         if (rowIds != null && rowIds.Count > 0)
         {
           foreach (var rowId in rowIds)
           {
              if (where.ToString().Length > 0)
              {
                 where.Append(" OR ");
              }
              where.AppendFormat("rowid(task)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Task Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbltask.AsEnumerable().SingleOrDefault();
         Task task = null;
         if (row != null)
         {
             task = this.BuildFromRow(row);
         }
         return task;
      }
	  
	  

      public IEnumerable<Task> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbltask.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Task Get(string coNum, string whNum, string transType, string requested, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("task.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND task.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(transType)) 
         {
             sb.AppendFormatWithEscape(" AND task.trans_type = '{0}'", transType);
         }
         if (!string.IsNullOrEmpty(requested)) 
         {
             sb.AppendFormatWithEscape(" AND task.requested = '{0}'", requested);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Task> GetListByCoWhId(string coNum, string whNum, int taskId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("task.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND task.wh_num = '{0}'", whNum);
         }
         if (taskId != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND task.task_id = {0}", taskId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Task> GetListByCoWhStatusType(string coNum, string whNum, string taskStatus, string transType, string requested, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("task.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND task.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(taskStatus)) 
         {
             sb.AppendFormatWithEscape(" AND task.task_status = '{0}'", taskStatus);
         }
         if (!string.IsNullOrEmpty(transType)) 
         {
             sb.AppendFormatWithEscape(" AND task.trans_type = '{0}'", transType);
         }
         if (!string.IsNullOrEmpty(requested)) 
         {
             sb.AppendFormatWithEscape(" AND task.requested = '{0}'", requested);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Task> GetListById(int taskId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (taskId != int.MinValue) 
         {
             sb.AppendFormatWithEscape("task.task_id = {0}", taskId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Task BuildFromRow(DataRow row)
      {
         var returnRecord = Task.BuildTaskFromRow(row);
         returnRecord = this.BuildExtraFromRow<Task>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Task record)
      {
         Task.UpdateRowFromTask(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Task Insert(Task record)
      {
         DataRow row = this.dataSet.ttbltask.NewttbltaskRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbltask.AddttbltaskRow((pdstaskDataSet.ttbltaskRow)row);
         this.SaveChanges();
         return this.dataSet.ttbltask.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbltask.Rows[0]) : null;
      }
  

      public Task Update(Task record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbltask.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbltask.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Task record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbltask.NewttbltaskRow();
            Task.BuildMinimalRow(ref row, record);
            this.dataSet.ttbltask.AddttbltaskRow((pdstaskDataSet.ttbltaskRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Task() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      protected override void Dispose(bool disposing)
      {
         if (this.disposed) { return; }
         if (!disposing)
         {
            return;
         }	
         this.proxyAppObject?.Dispose();

         this.dataSet?.Dispose();
         base.Dispose(true);
      }
  
   }
}
#pragma warning restore 1591
  