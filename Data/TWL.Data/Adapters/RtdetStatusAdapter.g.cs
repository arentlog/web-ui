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
   using Models.PdsrtdetStatus;

   public partial class RtdetStatusAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsrtdet_status";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> rtdetStatusTableControlKey;
		
      private pdsrtdet_statusDataSet dataSet;
        
      public RtdetStatusAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsrtdet_statusDataSet() { DataSetName = DataSetName };
            this.rtdetStatusTableControlKey = this.dataSet.ttblrtdet_status.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.rtdetStatusTableControlKey))
            {
               this.CreateTableControlParameters(this.rtdetStatusTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in RtdetStatusAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Rtdet_statusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poRtdet_statusproxy = this.proxyAppObject.CreatePO_rtdet_statusproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poRtdet_statusproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Rtdet_statusproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.rtdetStatusTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.rtdetStatusTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Rtdet_statusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poRtdet_statusproxy = this.proxyAppObject.CreatePO_rtdet_statusproxy())
               {
                  this.SetRequiredContextParameters();
                  poRtdet_statusproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Rtdet_statusproxy - After Call");
      }
   

      public RtdetStatus GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         RtdetStatus rtdetStatus = null;
         if (row != null)
         {
             rtdetStatus = this.BuildFromRow(row);
         }
         return rtdetStatus;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(rtdet_status) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblrtdet_status.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<RtdetStatus> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(rtdet_status)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected RtdetStatus Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblrtdet_status.AsEnumerable().SingleOrDefault();
         RtdetStatus rtdetStatus = null;
         if (row != null)
         {
             rtdetStatus = this.BuildFromRow(row);
         }
         return rtdetStatus;
      }
	  
	  

      public IEnumerable<RtdetStatus> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblrtdet_status.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public RtdetStatus Get(string code, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(code)) 
         {
             sb.AppendFormatWithEscape("rtdet_status.code = '{0}'", code);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<RtdetStatus> GetListByName(string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape("rtdet_status.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public RtdetStatus BuildFromRow(DataRow row)
      {
         var returnRecord = RtdetStatus.BuildRtdetStatusFromRow(row);
         returnRecord = this.BuildExtraFromRow<RtdetStatus>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, RtdetStatus record)
      {
         RtdetStatus.UpdateRowFromRtdetStatus(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public RtdetStatus Insert(RtdetStatus record)
      {
         DataRow row = this.dataSet.ttblrtdet_status.Newttblrtdet_statusRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblrtdet_status.Addttblrtdet_statusRow((pdsrtdet_statusDataSet.ttblrtdet_statusRow)row);
         this.SaveChanges();
         return this.dataSet.ttblrtdet_status.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrtdet_status.Rows[0]) : null;
      }
  

      public RtdetStatus Update(RtdetStatus record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblrtdet_status.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrtdet_status.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(RtdetStatus record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblrtdet_status.Newttblrtdet_statusRow();
            RtdetStatus.BuildMinimalRow(ref row, record);
            this.dataSet.ttblrtdet_status.Addttblrtdet_statusRow((pdsrtdet_statusDataSet.ttblrtdet_statusRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new RtdetStatus() { rowID = selectRowId }).ToList();
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
  