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
   using Models.PdsserialHistory;

   public partial class SerialHistoryAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsserial_history";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> serialHistoryTableControlKey;
		
      private pdsserial_historyDataSet dataSet;
        
      public SerialHistoryAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsserial_historyDataSet() { DataSetName = DataSetName };
            this.serialHistoryTableControlKey = this.dataSet.ttblserial_history.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.serialHistoryTableControlKey))
            {
               this.CreateTableControlParameters(this.serialHistoryTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SerialHistoryAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Serial_historyproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSerial_historyproxy = this.proxyAppObject.CreatePO_serial_historyproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSerial_historyproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Serial_historyproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.serialHistoryTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.serialHistoryTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Serial_historyproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSerial_historyproxy = this.proxyAppObject.CreatePO_serial_historyproxy())
               {
                  this.SetRequiredContextParameters();
                  poSerial_historyproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Serial_historyproxy - After Call");
      }
   

      public SerialHistory GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         SerialHistory serialHistory = null;
         if (row != null)
         {
             serialHistory = this.BuildFromRow(row);
         }
         return serialHistory;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(serial_history) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblserial_history.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<SerialHistory> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(serial_history)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected SerialHistory Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblserial_history.AsEnumerable().SingleOrDefault();
         SerialHistory serialHistory = null;
         if (row != null)
         {
             serialHistory = this.BuildFromRow(row);
         }
         return serialHistory;
      }
	  
	  

      public IEnumerable<SerialHistory> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblserial_history.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public SerialHistory Get(string coNum, string whNum, string order, string orderSuffix, int line, int lineSequence, string serialNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("serial_history.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(order)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.order = '{0}'", order);
         }
         if (!string.IsNullOrEmpty(orderSuffix)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.order_suffix = '{0}'", orderSuffix);
         }
         if (line != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.line = {0}", line);
         }
         if (lineSequence != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.line_sequence = {0}", lineSequence);
         }
         if (!string.IsNullOrEmpty(serialNum)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.serial_num = '{0}'", serialNum);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<SerialHistory> GetListByAbsSerial(string absNum, string serialNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape("serial_history.abs_num = '{0}'", absNum);
         }
         if (!string.IsNullOrEmpty(serialNum)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.serial_num = '{0}'", serialNum);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<SerialHistory> GetListByCOWHABSSERIAL(string coNum, string whNum, string absNum, string serialNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("serial_history.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.abs_num = '{0}'", absNum);
         }
         if (!string.IsNullOrEmpty(serialNum)) 
         {
             sb.AppendFormatWithEscape(" AND serial_history.serial_num = '{0}'", serialNum);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<SerialHistory> GetListByRma(string rma, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rma)) 
         {
             sb.AppendFormatWithEscape("serial_history.rma = '{0}'", rma);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public SerialHistory BuildFromRow(DataRow row)
      {
         var returnRecord = SerialHistory.BuildSerialHistoryFromRow(row);
         returnRecord = this.BuildExtraFromRow<SerialHistory>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, SerialHistory record)
      {
         SerialHistory.UpdateRowFromSerialHistory(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public SerialHistory Insert(SerialHistory record)
      {
         DataRow row = this.dataSet.ttblserial_history.Newttblserial_historyRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblserial_history.Addttblserial_historyRow((pdsserial_historyDataSet.ttblserial_historyRow)row);
         this.SaveChanges();
         return this.dataSet.ttblserial_history.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblserial_history.Rows[0]) : null;
      }
  

      public SerialHistory Update(SerialHistory record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblserial_history.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblserial_history.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(SerialHistory record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblserial_history.Newttblserial_historyRow();
            SerialHistory.BuildMinimalRow(ref row, record);
            this.dataSet.ttblserial_history.Addttblserial_historyRow((pdsserial_historyDataSet.ttblserial_historyRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new SerialHistory() { rowID = selectRowId }).ToList();
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
  