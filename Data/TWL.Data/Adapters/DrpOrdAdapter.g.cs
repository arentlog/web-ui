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
   using Models.PdsdrpOrd;

   public partial class DrpOrdAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsdrp_ord";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> drpOrdTableControlKey;
		
      private pdsdrp_ordDataSet dataSet;
        
      public DrpOrdAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsdrp_ordDataSet() { DataSetName = DataSetName };
            this.drpOrdTableControlKey = this.dataSet.ttbldrp_ord.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.drpOrdTableControlKey))
            {
               this.CreateTableControlParameters(this.drpOrdTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in DrpOrdAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Drp_ordproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poDrp_ordproxy = this.proxyAppObject.CreatePO_drp_ordproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poDrp_ordproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Drp_ordproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.drpOrdTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.drpOrdTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Drp_ordproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poDrp_ordproxy = this.proxyAppObject.CreatePO_drp_ordproxy())
               {
                  this.SetRequiredContextParameters();
                  poDrp_ordproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Drp_ordproxy - After Call");
      }
   

      public DrpOrd GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         DrpOrd drpOrd = null;
         if (row != null)
         {
             drpOrd = this.BuildFromRow(row);
         }
         return drpOrd;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(drp_ord) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbldrp_ord.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<DrpOrd> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(drp_ord)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected DrpOrd Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbldrp_ord.AsEnumerable().SingleOrDefault();
         DrpOrd drpOrd = null;
         if (row != null)
         {
             drpOrd = this.BuildFromRow(row);
         }
         return drpOrd;
      }
	  
	  

      public IEnumerable<DrpOrd> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbldrp_ord.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public DrpOrd Get(string coNum, string whNum, string ruleCode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("drp_ord.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(ruleCode)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.rule_code = '{0}'", ruleCode);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<DrpOrd> GetListByBatch(int batch, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (batch != int.MinValue) 
         {
             sb.AppendFormatWithEscape("drp_ord.batch = {0}", batch);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<DrpOrd> GetListByCoWhDtTmRl(string coNum, string whNum, DateTime? dropDate, int dropTime, string ruleCode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("drp_ord.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.wh_num = '{0}'", whNum);
         }
         if (dropDate != null) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.drop_date = '{0}'", dropDate);
         }
         if (dropTime != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.drop_time = {0}", dropTime);
         }
         if (!string.IsNullOrEmpty(ruleCode)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.rule_code = '{0}'", ruleCode);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<DrpOrd> GetListByCoWhOrdSufRl(string coNum, string whNum, string order, string orderSuffix, string ruleCode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("drp_ord.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(order)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.order = '{0}'", order);
         }
         if (!string.IsNullOrEmpty(orderSuffix)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.order_suffix = '{0}'", orderSuffix);
         }
         if (!string.IsNullOrEmpty(ruleCode)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.rule_code = '{0}'", ruleCode);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<DrpOrd> GetListByOrderSuffix(string order, string orderSuffix, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(order)) 
         {
             sb.AppendFormatWithEscape("drp_ord.order = '{0}'", order);
         }
         if (!string.IsNullOrEmpty(orderSuffix)) 
         {
             sb.AppendFormatWithEscape(" AND drp_ord.order_suffix = '{0}'", orderSuffix);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public DrpOrd BuildFromRow(DataRow row)
      {
         var returnRecord = DrpOrd.BuildDrpOrdFromRow(row);
         returnRecord = this.BuildExtraFromRow<DrpOrd>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, DrpOrd record)
      {
         DrpOrd.UpdateRowFromDrpOrd(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public DrpOrd Insert(DrpOrd record)
      {
         DataRow row = this.dataSet.ttbldrp_ord.Newttbldrp_ordRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbldrp_ord.Addttbldrp_ordRow((pdsdrp_ordDataSet.ttbldrp_ordRow)row);
         this.SaveChanges();
         return this.dataSet.ttbldrp_ord.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldrp_ord.Rows[0]) : null;
      }
  

      public DrpOrd Update(DrpOrd record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbldrp_ord.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbldrp_ord.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(DrpOrd record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbldrp_ord.Newttbldrp_ordRow();
            DrpOrd.BuildMinimalRow(ref row, record);
            this.dataSet.ttbldrp_ord.Addttbldrp_ordRow((pdsdrp_ordDataSet.ttbldrp_ordRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new DrpOrd() { rowID = selectRowId }).ToList();
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
  