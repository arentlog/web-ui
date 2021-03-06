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
   using Models.PdsorderClass;

   public partial class OrderClassAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsorder_class";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> orderClassTableControlKey;
		
      private pdsorder_classDataSet dataSet;
        
      public OrderClassAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsorder_classDataSet() { DataSetName = DataSetName };
            this.orderClassTableControlKey = this.dataSet.ttblorder_class.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.orderClassTableControlKey))
            {
               this.CreateTableControlParameters(this.orderClassTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OrderClassAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Order_classproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOrder_classproxy = this.proxyAppObject.CreatePO_order_classproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOrder_classproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Order_classproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.orderClassTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.orderClassTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Order_classproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOrder_classproxy = this.proxyAppObject.CreatePO_order_classproxy())
               {
                  this.SetRequiredContextParameters();
                  poOrder_classproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Order_classproxy - After Call");
      }
   

      public OrderClass GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         OrderClass orderClass = null;
         if (row != null)
         {
             orderClass = this.BuildFromRow(row);
         }
         return orderClass;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(order_class) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblorder_class.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<OrderClass> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(order_class)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected OrderClass Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblorder_class.AsEnumerable().SingleOrDefault();
         OrderClass orderClass = null;
         if (row != null)
         {
             orderClass = this.BuildFromRow(row);
         }
         return orderClass;
      }
	  
	  

      public IEnumerable<OrderClass> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblorder_class.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public OrderClass Get(string code, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(code)) 
         {
             sb.AppendFormatWithEscape("order_class.code = '{0}'", code);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<OrderClass> GetListByName(string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape("order_class.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public OrderClass BuildFromRow(DataRow row)
      {
         var returnRecord = OrderClass.BuildOrderClassFromRow(row);
         returnRecord = this.BuildExtraFromRow<OrderClass>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, OrderClass record)
      {
         OrderClass.UpdateRowFromOrderClass(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public OrderClass Insert(OrderClass record)
      {
         DataRow row = this.dataSet.ttblorder_class.Newttblorder_classRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblorder_class.Addttblorder_classRow((pdsorder_classDataSet.ttblorder_classRow)row);
         this.SaveChanges();
         return this.dataSet.ttblorder_class.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblorder_class.Rows[0]) : null;
      }
  

      public OrderClass Update(OrderClass record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblorder_class.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblorder_class.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(OrderClass record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblorder_class.Newttblorder_classRow();
            OrderClass.BuildMinimalRow(ref row, record);
            this.dataSet.ttblorder_class.Addttblorder_classRow((pdsorder_classDataSet.ttblorder_classRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new OrderClass() { rowID = selectRowId }).ToList();
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
  