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
   using Models.PdsorddtlStatus;

   public partial class OrddtlStatusAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsorddtl_status";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> orddtlStatusTableControlKey;
		
      private pdsorddtl_statusDataSet dataSet;
        
      public OrddtlStatusAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsorddtl_statusDataSet() { DataSetName = DataSetName };
            this.orddtlStatusTableControlKey = this.dataSet.ttblorddtl_status.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.orddtlStatusTableControlKey))
            {
               this.CreateTableControlParameters(this.orddtlStatusTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OrddtlStatusAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Orddtl_statusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOrddtl_statusproxy = this.proxyAppObject.CreatePO_orddtl_statusproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOrddtl_statusproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Orddtl_statusproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.orddtlStatusTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.orddtlStatusTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Orddtl_statusproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOrddtl_statusproxy = this.proxyAppObject.CreatePO_orddtl_statusproxy())
               {
                  this.SetRequiredContextParameters();
                  poOrddtl_statusproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Orddtl_statusproxy - After Call");
      }
   

      public OrddtlStatus GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         OrddtlStatus orddtlStatus = null;
         if (row != null)
         {
             orddtlStatus = this.BuildFromRow(row);
         }
         return orddtlStatus;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(orddtl_status) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblorddtl_status.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<OrddtlStatus> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(orddtl_status)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected OrddtlStatus Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblorddtl_status.AsEnumerable().SingleOrDefault();
         OrddtlStatus orddtlStatus = null;
         if (row != null)
         {
             orddtlStatus = this.BuildFromRow(row);
         }
         return orddtlStatus;
      }
	  
	  

      public IEnumerable<OrddtlStatus> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblorddtl_status.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public OrddtlStatus Get(string code, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(code)) 
         {
             sb.AppendFormatWithEscape("orddtl_status.code = '{0}'", code);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<OrddtlStatus> GetListByName(string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape("orddtl_status.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<OrddtlStatus> GetListBySequence(int sequence, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (sequence != int.MinValue) 
         {
             sb.AppendFormatWithEscape("orddtl_status.sequence = {0}", sequence);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public OrddtlStatus BuildFromRow(DataRow row)
      {
         var returnRecord = OrddtlStatus.BuildOrddtlStatusFromRow(row);
         returnRecord = this.BuildExtraFromRow<OrddtlStatus>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, OrddtlStatus record)
      {
         OrddtlStatus.UpdateRowFromOrddtlStatus(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public OrddtlStatus Insert(OrddtlStatus record)
      {
         DataRow row = this.dataSet.ttblorddtl_status.Newttblorddtl_statusRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblorddtl_status.Addttblorddtl_statusRow((pdsorddtl_statusDataSet.ttblorddtl_statusRow)row);
         this.SaveChanges();
         return this.dataSet.ttblorddtl_status.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblorddtl_status.Rows[0]) : null;
      }
  

      public OrddtlStatus Update(OrddtlStatus record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblorddtl_status.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblorddtl_status.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(OrddtlStatus record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblorddtl_status.Newttblorddtl_statusRow();
            OrddtlStatus.BuildMinimalRow(ref row, record);
            this.dataSet.ttblorddtl_status.Addttblorddtl_statusRow((pdsorddtl_statusDataSet.ttblorddtl_statusRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new OrddtlStatus() { rowID = selectRowId }).ToList();
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
  