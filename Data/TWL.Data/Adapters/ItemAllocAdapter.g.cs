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
   using Models.PdsitemAlloc;

   public partial class ItemAllocAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsitem_alloc";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> itemAllocTableControlKey;
		
      private pdsitem_allocDataSet dataSet;
        
      public ItemAllocAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsitem_allocDataSet() { DataSetName = DataSetName };
            this.itemAllocTableControlKey = this.dataSet.ttblitem_alloc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.itemAllocTableControlKey))
            {
               this.CreateTableControlParameters(this.itemAllocTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ItemAllocAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Item_allocproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poItem_allocproxy = this.proxyAppObject.CreatePO_item_allocproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poItem_allocproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Item_allocproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.itemAllocTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.itemAllocTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Item_allocproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poItem_allocproxy = this.proxyAppObject.CreatePO_item_allocproxy())
               {
                  this.SetRequiredContextParameters();
                  poItem_allocproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Item_allocproxy - After Call");
      }
   

      public ItemAlloc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         ItemAlloc itemAlloc = null;
         if (row != null)
         {
             itemAlloc = this.BuildFromRow(row);
         }
         return itemAlloc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(item_alloc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblitem_alloc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<ItemAlloc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(item_alloc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected ItemAlloc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblitem_alloc.AsEnumerable().SingleOrDefault();
         ItemAlloc itemAlloc = null;
         if (row != null)
         {
             itemAlloc = this.BuildFromRow(row);
         }
         return itemAlloc;
      }
	  
	  

      public IEnumerable<ItemAlloc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblitem_alloc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public ItemAlloc Get(string coNum, string whNum, string dateTime, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_alloc.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(dateTime)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.date_time = '{0}'", dateTime);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<ItemAlloc> GetListByCoKeyType(string coNum, int key1, int key2, int key3, string type, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_alloc.co_num = '{0}'", coNum);
         }
         if (key1 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.key1 = {0}", key1);
         }
         if (key2 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.key2 = {0}", key2);
         }
         if (key3 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.key3 = {0}", key3);
         }
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.type = '{0}'", type);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ItemAlloc> GetListByCoWhAbsTypeTime(string coNum, string whNum, string absNum, string type, string dateTime, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_alloc.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.abs_num = '{0}'", absNum);
         }
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.type = '{0}'", type);
         }
         if (!string.IsNullOrEmpty(dateTime)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.date_time = '{0}'", dateTime);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ItemAlloc> GetListByCoWhTypeKeyLot(string coNum, string whNum, string type, int key1, int key2, int key3, string lot, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("item_alloc.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(type)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.type = '{0}'", type);
         }
         if (key1 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.key1 = {0}", key1);
         }
         if (key2 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.key2 = {0}", key2);
         }
         if (key3 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.key3 = {0}", key3);
         }
         if (!string.IsNullOrEmpty(lot)) 
         {
             sb.AppendFormatWithEscape(" AND item_alloc.lot = '{0}'", lot);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ItemAlloc> GetListById(int id, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (id != int.MinValue) 
         {
             sb.AppendFormatWithEscape("item_alloc.id = {0}", id);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public ItemAlloc BuildFromRow(DataRow row)
      {
         var returnRecord = ItemAlloc.BuildItemAllocFromRow(row);
         returnRecord = this.BuildExtraFromRow<ItemAlloc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, ItemAlloc record)
      {
         ItemAlloc.UpdateRowFromItemAlloc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public ItemAlloc Insert(ItemAlloc record)
      {
         DataRow row = this.dataSet.ttblitem_alloc.Newttblitem_allocRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblitem_alloc.Addttblitem_allocRow((pdsitem_allocDataSet.ttblitem_allocRow)row);
         this.SaveChanges();
         return this.dataSet.ttblitem_alloc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblitem_alloc.Rows[0]) : null;
      }
  

      public ItemAlloc Update(ItemAlloc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblitem_alloc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblitem_alloc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(ItemAlloc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblitem_alloc.Newttblitem_allocRow();
            ItemAlloc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblitem_alloc.Addttblitem_allocRow((pdsitem_allocDataSet.ttblitem_allocRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new ItemAlloc() { rowID = selectRowId }).ToList();
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
  