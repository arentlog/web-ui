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
   using Models.PdsitemHistory;

   public partial class ItemHistoryAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsitem_history";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> itemHistoryTableControlKey;
		
      private pdsitem_historyDataSet dataSet;
        
      public ItemHistoryAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsitem_historyDataSet() { DataSetName = DataSetName };
            this.itemHistoryTableControlKey = this.dataSet.ttblitem_history.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.itemHistoryTableControlKey))
            {
               this.CreateTableControlParameters(this.itemHistoryTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ItemHistoryAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Item_historyproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poItem_historyproxy = this.proxyAppObject.CreatePO_item_historyproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poItem_historyproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Item_historyproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.itemHistoryTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.itemHistoryTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Item_historyproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poItem_historyproxy = this.proxyAppObject.CreatePO_item_historyproxy())
               {
                  this.SetRequiredContextParameters();
                  poItem_historyproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Item_historyproxy - After Call");
      }
   

      public ItemHistory GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         ItemHistory itemHistory = null;
         if (row != null)
         {
             itemHistory = this.BuildFromRow(row);
         }
         return itemHistory;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(item_history) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblitem_history.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<ItemHistory> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(item_history)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected ItemHistory Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblitem_history.AsEnumerable().SingleOrDefault();
         ItemHistory itemHistory = null;
         if (row != null)
         {
             itemHistory = this.BuildFromRow(row);
         }
         return itemHistory;
      }
	  
	  

      public IEnumerable<ItemHistory> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblitem_history.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public ItemHistory Get(string coNum, string whNum, string recType, string absNum, string stockStat, DateTime? recDate, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_history.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(recType)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.rec_type = '{0}'", recType);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.abs_num = '{0}'", absNum);
         }
         if (!string.IsNullOrEmpty(stockStat)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.stock_stat = '{0}'", stockStat);
         }
         if (recDate != null) 
         {
             sb.AppendFormatWithEscape(" AND item_history.rec_date = '{0}'", recDate);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<ItemHistory> GetListByCoWhAbsLot(string coNum, string whNum, string absNum, string lot, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_history.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.abs_num = '{0}'", absNum);
         }
         if (!string.IsNullOrEmpty(lot)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.lot = '{0}'", lot);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ItemHistory> GetListByCoWhDateType(string coNum, string whNum, DateTime? recDate, string recType, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_history.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.wh_num = '{0}'", whNum);
         }
         if (recDate != null) 
         {
             sb.AppendFormatWithEscape(" AND item_history.rec_date = '{0}'", recDate);
         }
         if (!string.IsNullOrEmpty(recType)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.rec_type = '{0}'", recType);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ItemHistory> GetListByCoWhTypeDateAbsStatus(string coNum, string whNum, string recType, DateTime? recDate, string absNum, string stockStat, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_history.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(recType)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.rec_type = '{0}'", recType);
         }
         if (recDate != null) 
         {
             sb.AppendFormatWithEscape(" AND item_history.rec_date = '{0}'", recDate);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.abs_num = '{0}'", absNum);
         }
         if (!string.IsNullOrEmpty(stockStat)) 
         {
             sb.AppendFormatWithEscape(" AND item_history.stock_stat = '{0}'", stockStat);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ItemHistory> GetListById(int recId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (recId != int.MinValue) 
         {
             sb.AppendFormatWithEscape("item_history.rec_id = {0}", recId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public ItemHistory BuildFromRow(DataRow row)
      {
         var returnRecord = ItemHistory.BuildItemHistoryFromRow(row);
         returnRecord = this.BuildExtraFromRow<ItemHistory>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, ItemHistory record)
      {
         ItemHistory.UpdateRowFromItemHistory(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public ItemHistory Insert(ItemHistory record)
      {
         DataRow row = this.dataSet.ttblitem_history.Newttblitem_historyRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblitem_history.Addttblitem_historyRow((pdsitem_historyDataSet.ttblitem_historyRow)row);
         this.SaveChanges();
         return this.dataSet.ttblitem_history.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblitem_history.Rows[0]) : null;
      }
  

      public ItemHistory Update(ItemHistory record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblitem_history.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblitem_history.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(ItemHistory record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblitem_history.Newttblitem_historyRow();
            ItemHistory.BuildMinimalRow(ref row, record);
            this.dataSet.ttblitem_history.Addttblitem_historyRow((pdsitem_historyDataSet.ttblitem_historyRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new ItemHistory() { rowID = selectRowId }).ToList();
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
  