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
   using Models.PdssysparValue;

   public partial class SysparValueAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssyspar_value";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sysparValueTableControlKey;
		
      private pdssyspar_valueDataSet dataSet;
        
      public SysparValueAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssyspar_valueDataSet() { DataSetName = DataSetName };
            this.sysparValueTableControlKey = this.dataSet.ttblsyspar_value.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sysparValueTableControlKey))
            {
               this.CreateTableControlParameters(this.sysparValueTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SysparValueAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Syspar_valueproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSyspar_valueproxy = this.proxyAppObject.CreatePO_syspar_valueproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSyspar_valueproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Syspar_valueproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sysparValueTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sysparValueTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Syspar_valueproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSyspar_valueproxy = this.proxyAppObject.CreatePO_syspar_valueproxy())
               {
                  this.SetRequiredContextParameters();
                  poSyspar_valueproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Syspar_valueproxy - After Call");
      }
   

      public SysparValue GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         SysparValue sysparValue = null;
         if (row != null)
         {
             sysparValue = this.BuildFromRow(row);
         }
         return sysparValue;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(syspar_value) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsyspar_value.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<SysparValue> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(syspar_value)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected SysparValue Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsyspar_value.AsEnumerable().SingleOrDefault();
         SysparValue sysparValue = null;
         if (row != null)
         {
             sysparValue = this.BuildFromRow(row);
         }
         return sysparValue;
      }
	  
	  

      public IEnumerable<SysparValue> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsyspar_value.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public SysparValue Get(int parameterId, string coNum, string whNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (parameterId != int.MinValue) 
         {
             sb.AppendFormatWithEscape("syspar_value.parameter_id = {0}", parameterId);
         }
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape(" AND syspar_value.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND syspar_value.wh_num = '{0}'", whNum);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public SysparValue BuildFromRow(DataRow row)
      {
         var returnRecord = SysparValue.BuildSysparValueFromRow(row);
         returnRecord = this.BuildExtraFromRow<SysparValue>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, SysparValue record)
      {
         SysparValue.UpdateRowFromSysparValue(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public SysparValue Insert(SysparValue record)
      {
         DataRow row = this.dataSet.ttblsyspar_value.Newttblsyspar_valueRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsyspar_value.Addttblsyspar_valueRow((pdssyspar_valueDataSet.ttblsyspar_valueRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsyspar_value.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsyspar_value.Rows[0]) : null;
      }
  

      public SysparValue Update(SysparValue record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsyspar_value.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsyspar_value.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(SysparValue record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsyspar_value.Newttblsyspar_valueRow();
            SysparValue.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsyspar_value.Addttblsyspar_valueRow((pdssyspar_valueDataSet.ttblsyspar_valueRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new SysparValue() { rowID = selectRowId }).ToList();
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
  