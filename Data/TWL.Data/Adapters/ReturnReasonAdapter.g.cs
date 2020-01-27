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
   using Models.PdsreturnReason;

   public partial class ReturnReasonAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsreturn_reason";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> returnReasonTableControlKey;
		
      private pdsreturn_reasonDataSet dataSet;
        
      public ReturnReasonAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsreturn_reasonDataSet() { DataSetName = DataSetName };
            this.returnReasonTableControlKey = this.dataSet.ttblreturn_reason.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.returnReasonTableControlKey))
            {
               this.CreateTableControlParameters(this.returnReasonTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ReturnReasonAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Return_reasonproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poReturn_reasonproxy = this.proxyAppObject.CreatePO_return_reasonproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poReturn_reasonproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Return_reasonproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.returnReasonTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.returnReasonTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Return_reasonproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poReturn_reasonproxy = this.proxyAppObject.CreatePO_return_reasonproxy())
               {
                  this.SetRequiredContextParameters();
                  poReturn_reasonproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Return_reasonproxy - After Call");
      }
   

      public ReturnReason GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         ReturnReason returnReason = null;
         if (row != null)
         {
             returnReason = this.BuildFromRow(row);
         }
         return returnReason;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(return_reason) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblreturn_reason.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<ReturnReason> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(return_reason)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected ReturnReason Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblreturn_reason.AsEnumerable().SingleOrDefault();
         ReturnReason returnReason = null;
         if (row != null)
         {
             returnReason = this.BuildFromRow(row);
         }
         return returnReason;
      }
	  
	  

      public IEnumerable<ReturnReason> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblreturn_reason.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public ReturnReason Get(string coNum, string whNum, string type, string code, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("return_reason.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND return_reason.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND return_reason.type = '{0}'", type);
         }
         if (!string.IsNullOrEmpty(code)) 
         {
             sb.AppendFormatWithEscape(" AND return_reason.code = '{0}'", code);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<ReturnReason> GetListByCoWhCode(string coNum, string whNum, string code, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("return_reason.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND return_reason.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(code)) 
         {
             sb.AppendFormatWithEscape(" AND return_reason.code = '{0}'", code);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public ReturnReason BuildFromRow(DataRow row)
      {
         var returnRecord = ReturnReason.BuildReturnReasonFromRow(row);
         returnRecord = this.BuildExtraFromRow<ReturnReason>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, ReturnReason record)
      {
         ReturnReason.UpdateRowFromReturnReason(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public ReturnReason Insert(ReturnReason record)
      {
         DataRow row = this.dataSet.ttblreturn_reason.Newttblreturn_reasonRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblreturn_reason.Addttblreturn_reasonRow((pdsreturn_reasonDataSet.ttblreturn_reasonRow)row);
         this.SaveChanges();
         return this.dataSet.ttblreturn_reason.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblreturn_reason.Rows[0]) : null;
      }
  

      public ReturnReason Update(ReturnReason record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblreturn_reason.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblreturn_reason.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(ReturnReason record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblreturn_reason.Newttblreturn_reasonRow();
            ReturnReason.BuildMinimalRow(ref row, record);
            this.dataSet.ttblreturn_reason.Addttblreturn_reasonRow((pdsreturn_reasonDataSet.ttblreturn_reasonRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new ReturnReason() { rowID = selectRowId }).ToList();
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
  