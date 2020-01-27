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
    
namespace Infor.Sxe.Shared.Data.Adapters
{
   using com.infor.sxproxy.sharedproxy;
   using com.infor.sxproxy.sharedproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.PdseventSetupFlds;

   public partial class EventSetupFldsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsevent_setup_flds";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> eventSetupFldsTableControlKey;
		
      private pdsevent_setup_fldsDataSet dataSet;
        
      public EventSetupFldsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsevent_setup_fldsDataSet() { DataSetName = DataSetName };
            this.eventSetupFldsTableControlKey = this.dataSet.ttblevent_setup_flds.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.eventSetupFldsTableControlKey))
            {
               this.CreateTableControlParameters(this.eventSetupFldsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EventSetupFldsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Event_setup_fldsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEvent_setup_fldsproxy = this.proxyAppObject.CreatePO_event_setup_fldsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEvent_setup_fldsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Event_setup_fldsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.eventSetupFldsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.eventSetupFldsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Event_setup_fldsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEvent_setup_fldsproxy = this.proxyAppObject.CreatePO_event_setup_fldsproxy())
               {
                  this.SetRequiredContextParameters();
                  poEvent_setup_fldsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Event_setup_fldsproxy - After Call");
      }
   

      public EventSetupFlds GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         EventSetupFlds eventSetupFlds = null;
         if (row != null)
         {
             eventSetupFlds = this.BuildFromRow(row);
         }
         return eventSetupFlds;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(event_setup_flds) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblevent_setup_flds.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<EventSetupFlds> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(event_setup_flds)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected EventSetupFlds Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblevent_setup_flds.AsEnumerable().SingleOrDefault();
         EventSetupFlds eventSetupFlds = null;
         if (row != null)
         {
             eventSetupFlds = this.BuildFromRow(row);
         }
         return eventSetupFlds;
      }
	  
	  

      public IEnumerable<EventSetupFlds> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblevent_setup_flds.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public EventSetupFlds Get(string eventname, string dataty, int arraypos, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(eventname)) 
         {
             sb.AppendFormatWithEscape("event_setup_flds.eventname = '{0}'", eventname);
         }
         if (!string.IsNullOrEmpty(dataty)) 
         {
             sb.AppendFormatWithEscape(" AND event_setup_flds.dataty = '{0}'", dataty);
         }
         if (arraypos != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND event_setup_flds.arraypos = {0}", arraypos);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<EventSetupFlds> GetListByFldname(string fieldname, string dataty, string eventname, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(fieldname)) 
         {
             sb.AppendFormatWithEscape("event_setup_flds.fieldname = '{0}'", fieldname);
         }
         if (!string.IsNullOrEmpty(dataty)) 
         {
             sb.AppendFormatWithEscape(" AND event_setup_flds.dataty = '{0}'", dataty);
         }
         if (!string.IsNullOrEmpty(eventname)) 
         {
             sb.AppendFormatWithEscape(" AND event_setup_flds.eventname = '{0}'", eventname);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public EventSetupFlds BuildFromRow(DataRow row)
      {
         var returnRecord = EventSetupFlds.BuildEventSetupFldsFromRow(row);
         returnRecord = this.BuildExtraFromRow<EventSetupFlds>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, EventSetupFlds record)
      {
         EventSetupFlds.UpdateRowFromEventSetupFlds(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public EventSetupFlds Insert(EventSetupFlds record)
      {
         DataRow row = this.dataSet.ttblevent_setup_flds.Newttblevent_setup_fldsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblevent_setup_flds.Addttblevent_setup_fldsRow((pdsevent_setup_fldsDataSet.ttblevent_setup_fldsRow)row);
         this.SaveChanges();
         return this.dataSet.ttblevent_setup_flds.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblevent_setup_flds.Rows[0]) : null;
      }
  

      public EventSetupFlds Update(EventSetupFlds record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblevent_setup_flds.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblevent_setup_flds.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(EventSetupFlds record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblevent_setup_flds.Newttblevent_setup_fldsRow();
            EventSetupFlds.BuildMinimalRow(ref row, record);
            this.dataSet.ttblevent_setup_flds.Addttblevent_setup_fldsRow((pdsevent_setup_fldsDataSet.ttblevent_setup_fldsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new EventSetupFlds() { rowID = selectRowId }).ToList();
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
  