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
   using Models.PdsendOfDay;

   public partial class EndOfDayAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsend_of_day";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> endOfDayTableControlKey;
		
      private pdsend_of_dayDataSet dataSet;
        
      public EndOfDayAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsend_of_dayDataSet() { DataSetName = DataSetName };
            this.endOfDayTableControlKey = this.dataSet.ttblend_of_day.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.endOfDayTableControlKey))
            {
               this.CreateTableControlParameters(this.endOfDayTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EndOfDayAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - End_of_dayproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEnd_of_dayproxy = this.proxyAppObject.CreatePO_end_of_dayproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEnd_of_dayproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - End_of_dayproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.endOfDayTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.endOfDayTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - End_of_dayproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEnd_of_dayproxy = this.proxyAppObject.CreatePO_end_of_dayproxy())
               {
                  this.SetRequiredContextParameters();
                  poEnd_of_dayproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - End_of_dayproxy - After Call");
      }
   

      public EndOfDay GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         EndOfDay endOfDay = null;
         if (row != null)
         {
             endOfDay = this.BuildFromRow(row);
         }
         return endOfDay;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(end_of_day) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblend_of_day.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<EndOfDay> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(end_of_day)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected EndOfDay Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblend_of_day.AsEnumerable().SingleOrDefault();
         EndOfDay endOfDay = null;
         if (row != null)
         {
             endOfDay = this.BuildFromRow(row);
         }
         return endOfDay;
      }
	  
	  

      public IEnumerable<EndOfDay> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblend_of_day.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public EndOfDay Get(string coNum, string whNum, string dateTime, string recType, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("end_of_day.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND end_of_day.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(dateTime)) 
         {
             sb.AppendFormatWithEscape(" AND end_of_day.date_time = '{0}'", dateTime);
         }
         if (!string.IsNullOrEmpty(recType)) 
         {
             sb.AppendFormatWithEscape(" AND end_of_day.rec_type = '{0}'", recType);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<EndOfDay> GetListByDateType(string dateTime, string recType, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(dateTime)) 
         {
             sb.AppendFormatWithEscape("end_of_day.date_time = '{0}'", dateTime);
         }
         if (!string.IsNullOrEmpty(recType)) 
         {
             sb.AppendFormatWithEscape(" AND end_of_day.rec_type = '{0}'", recType);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public EndOfDay BuildFromRow(DataRow row)
      {
         var returnRecord = EndOfDay.BuildEndOfDayFromRow(row);
         returnRecord = this.BuildExtraFromRow<EndOfDay>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, EndOfDay record)
      {
         EndOfDay.UpdateRowFromEndOfDay(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public EndOfDay Insert(EndOfDay record)
      {
         DataRow row = this.dataSet.ttblend_of_day.Newttblend_of_dayRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblend_of_day.Addttblend_of_dayRow((pdsend_of_dayDataSet.ttblend_of_dayRow)row);
         this.SaveChanges();
         return this.dataSet.ttblend_of_day.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblend_of_day.Rows[0]) : null;
      }
  

      public EndOfDay Update(EndOfDay record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblend_of_day.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblend_of_day.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(EndOfDay record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblend_of_day.Newttblend_of_dayRow();
            EndOfDay.BuildMinimalRow(ref row, record);
            this.dataSet.ttblend_of_day.Addttblend_of_dayRow((pdsend_of_dayDataSet.ttblend_of_dayRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new EndOfDay() { rowID = selectRowId }).ToList();
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
  