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
   using Models.Pdsshpmst;

   public partial class ShpmstAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsshpmst";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> shpmstTableControlKey;
		
      private pdsshpmstDataSet dataSet;
        
      public ShpmstAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsshpmstDataSet() { DataSetName = DataSetName };
            this.shpmstTableControlKey = this.dataSet.ttblshpmst.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.shpmstTableControlKey))
            {
               this.CreateTableControlParameters(this.shpmstTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ShpmstAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Shpmstproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poShpmstproxy = this.proxyAppObject.CreatePO_shpmstproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poShpmstproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Shpmstproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.shpmstTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.shpmstTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Shpmstproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poShpmstproxy = this.proxyAppObject.CreatePO_shpmstproxy())
               {
                  this.SetRequiredContextParameters();
                  poShpmstproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Shpmstproxy - After Call");
      }
   

      public Shpmst GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Shpmst shpmst = null;
         if (row != null)
         {
             shpmst = this.BuildFromRow(row);
         }
         return shpmst;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(shpmst) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblshpmst.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Shpmst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(shpmst)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Shpmst Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblshpmst.AsEnumerable().SingleOrDefault();
         Shpmst shpmst = null;
         if (row != null)
         {
             shpmst = this.BuildFromRow(row);
         }
         return shpmst;
      }
	  
	  

      public IEnumerable<Shpmst> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblshpmst.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Shpmst Get(string coNum, string whNum, string carrierId, int manifestId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("shpmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(carrierId)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.carrier_id = '{0}'", carrierId);
         }
         if (manifestId != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.manifest_id = {0}", manifestId);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Shpmst> GetListByCoWhDockTrailerCarrier(string coNum, string whNum, string dockId, string trailerNum, string carrierId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("shpmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(dockId)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.dock_id = '{0}'", dockId);
         }
         if (!string.IsNullOrEmpty(trailerNum)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.trailer_num = '{0}'", trailerNum);
         }
         if (!string.IsNullOrEmpty(carrierId)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.carrier_id = '{0}'", carrierId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Shpmst> GetListByDockStatus(string dockId, bool rowStatus, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(dockId)) 
         {
             sb.AppendFormatWithEscape("shpmst.dock_id = '{0}'", dockId);
         }
         sb.AppendFormatWithEscape(" AND shpmst.row_status = {0}", rowStatus);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Shpmst> GetListById(int manifestId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (manifestId != int.MinValue) 
         {
             sb.AppendFormatWithEscape("shpmst.manifest_id = {0}", manifestId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Shpmst> GetListByStatusChrono(bool rowStatus, string dateTime, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("shpmst.row_status = {0}", rowStatus);
         if (!string.IsNullOrEmpty(dateTime)) 
         {
             sb.AppendFormatWithEscape(" AND shpmst.date_time = '{0}'", dateTime);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Shpmst> GetListByTrailerStatus(string trailerNum, bool rowStatus, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(trailerNum)) 
         {
             sb.AppendFormatWithEscape("shpmst.trailer_num = '{0}'", trailerNum);
         }
         sb.AppendFormatWithEscape(" AND shpmst.row_status = {0}", rowStatus);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Shpmst BuildFromRow(DataRow row)
      {
         var returnRecord = Shpmst.BuildShpmstFromRow(row);
         returnRecord = this.BuildExtraFromRow<Shpmst>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Shpmst record)
      {
         Shpmst.UpdateRowFromShpmst(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Shpmst Insert(Shpmst record)
      {
         DataRow row = this.dataSet.ttblshpmst.NewttblshpmstRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblshpmst.AddttblshpmstRow((pdsshpmstDataSet.ttblshpmstRow)row);
         this.SaveChanges();
         return this.dataSet.ttblshpmst.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblshpmst.Rows[0]) : null;
      }
  

      public Shpmst Update(Shpmst record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblshpmst.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblshpmst.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Shpmst record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblshpmst.NewttblshpmstRow();
            Shpmst.BuildMinimalRow(ref row, record);
            this.dataSet.ttblshpmst.AddttblshpmstRow((pdsshpmstDataSet.ttblshpmstRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Shpmst() { rowID = selectRowId }).ToList();
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
  