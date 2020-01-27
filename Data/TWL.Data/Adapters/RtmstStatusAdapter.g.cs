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
   using Models.PdsrtmstStatus;

   public partial class RtmstStatusAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsrtmst_status";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> rtmstStatusTableControlKey;
		
      private pdsrtmst_statusDataSet dataSet;
        
      public RtmstStatusAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsrtmst_statusDataSet() { DataSetName = DataSetName };
            this.rtmstStatusTableControlKey = this.dataSet.ttblrtmst_status.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.rtmstStatusTableControlKey))
            {
               this.CreateTableControlParameters(this.rtmstStatusTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in RtmstStatusAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Rtmst_statusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poRtmst_statusproxy = this.proxyAppObject.CreatePO_rtmst_statusproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poRtmst_statusproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Rtmst_statusproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.rtmstStatusTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.rtmstStatusTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Rtmst_statusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poRtmst_statusproxy = this.proxyAppObject.CreatePO_rtmst_statusproxy())
               {
                  this.SetRequiredContextParameters();
                  poRtmst_statusproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Rtmst_statusproxy - After Call");
      }
   

      public RtmstStatus GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         RtmstStatus rtmstStatus = null;
         if (row != null)
         {
             rtmstStatus = this.BuildFromRow(row);
         }
         return rtmstStatus;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(rtmst_status) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblrtmst_status.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<RtmstStatus> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(rtmst_status)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected RtmstStatus Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblrtmst_status.AsEnumerable().SingleOrDefault();
         RtmstStatus rtmstStatus = null;
         if (row != null)
         {
             rtmstStatus = this.BuildFromRow(row);
         }
         return rtmstStatus;
      }
	  
	  

      public IEnumerable<RtmstStatus> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblrtmst_status.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public RtmstStatus Get(string code, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(code)) 
         {
             sb.AppendFormatWithEscape("rtmst_status.code = '{0}'", code);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<RtmstStatus> GetListByName(string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape("rtmst_status.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public RtmstStatus BuildFromRow(DataRow row)
      {
         var returnRecord = RtmstStatus.BuildRtmstStatusFromRow(row);
         returnRecord = this.BuildExtraFromRow<RtmstStatus>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, RtmstStatus record)
      {
         RtmstStatus.UpdateRowFromRtmstStatus(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public RtmstStatus Insert(RtmstStatus record)
      {
         DataRow row = this.dataSet.ttblrtmst_status.Newttblrtmst_statusRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblrtmst_status.Addttblrtmst_statusRow((pdsrtmst_statusDataSet.ttblrtmst_statusRow)row);
         this.SaveChanges();
         return this.dataSet.ttblrtmst_status.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrtmst_status.Rows[0]) : null;
      }
  

      public RtmstStatus Update(RtmstStatus record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblrtmst_status.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrtmst_status.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(RtmstStatus record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblrtmst_status.Newttblrtmst_statusRow();
            RtmstStatus.BuildMinimalRow(ref row, record);
            this.dataSet.ttblrtmst_status.Addttblrtmst_statusRow((pdsrtmst_statusDataSet.ttblrtmst_statusRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new RtmstStatus() { rowID = selectRowId }).ToList();
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
  