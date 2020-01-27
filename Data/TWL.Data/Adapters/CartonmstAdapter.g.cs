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
   using Models.Pdscartonmst;

   public partial class CartonmstAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscartonmst";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> cartonmstTableControlKey;
		
      private pdscartonmstDataSet dataSet;
        
      public CartonmstAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscartonmstDataSet() { DataSetName = DataSetName };
            this.cartonmstTableControlKey = this.dataSet.ttblcartonmst.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.cartonmstTableControlKey))
            {
               this.CreateTableControlParameters(this.cartonmstTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in CartonmstAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Cartonmstproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poCartonmstproxy = this.proxyAppObject.CreatePO_cartonmstproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poCartonmstproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Cartonmstproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.cartonmstTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.cartonmstTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Cartonmstproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poCartonmstproxy = this.proxyAppObject.CreatePO_cartonmstproxy())
               {
                  this.SetRequiredContextParameters();
                  poCartonmstproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Cartonmstproxy - After Call");
      }
   

      public Cartonmst GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Cartonmst cartonmst = null;
         if (row != null)
         {
             cartonmst = this.BuildFromRow(row);
         }
         return cartonmst;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(cartonmst) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcartonmst.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Cartonmst> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(cartonmst)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Cartonmst Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcartonmst.AsEnumerable().SingleOrDefault();
         Cartonmst cartonmst = null;
         if (row != null)
         {
             cartonmst = this.BuildFromRow(row);
         }
         return cartonmst;
      }
	  
	  

      public IEnumerable<Cartonmst> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcartonmst.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Cartonmst Get(int cartonNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (cartonNum != int.MinValue) 
         {
             sb.AppendFormatWithEscape("cartonmst.carton_num = {0}", cartonNum);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Cartonmst> GetListByCoWhBatchOrderSufSeq(string coNum, string whNum, int batch, string lastOrder, string lastOrderSuffix, int sequence, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (batch != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.batch = {0}", batch);
         }
         if (!string.IsNullOrEmpty(lastOrder)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.last_order = '{0}'", lastOrder);
         }
         if (!string.IsNullOrEmpty(lastOrderSuffix)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.last_order_suffix = '{0}'", lastOrderSuffix);
         }
         if (sequence != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.sequence = {0}", sequence);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhBatchSequence(string coNum, string whNum, int batch, int sequence, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (batch != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.batch = {0}", batch);
         }
         if (sequence != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.sequence = {0}", sequence);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhCarrier(string coNum, string whNum, string carrierId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(carrierId)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.carrier_id = '{0}'", carrierId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhCustCarrier(string coNum, string whNum, string custCode, string carrierId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(custCode)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.cust_code = '{0}'", custCode);
         }
         if (!string.IsNullOrEmpty(carrierId)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.carrier_id = '{0}'", carrierId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhId(string coNum, string whNum, string cartonId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(cartonId)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.carton_id = '{0}'", cartonId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhOrderSuffix(string coNum, string whNum, string lastOrder, string lastOrderSuffix, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(lastOrder)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.last_order = '{0}'", lastOrder);
         }
         if (!string.IsNullOrEmpty(lastOrderSuffix)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.last_order_suffix = '{0}'", lastOrderSuffix);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhReference(string coNum, string whNum, string reference, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(reference)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.reference = '{0}'", reference);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhStatus(string coNum, string whNum, string rowStatus, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(rowStatus)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.row_status = '{0}'", rowStatus);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Cartonmst> GetListByCoWhTracking(string coNum, string whNum, string trackingId, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(coNum)) 
         {
             sb.AppendFormatWithEscape("cartonmst.co_num = '{0}'", coNum);
         }
         if (!string.IsNullOrEmpty(whNum)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.wh_num = '{0}'", whNum);
         }
         if (!string.IsNullOrEmpty(trackingId)) 
         {
             sb.AppendFormatWithEscape(" AND cartonmst.tracking_id = '{0}'", trackingId);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Cartonmst BuildFromRow(DataRow row)
      {
         var returnRecord = Cartonmst.BuildCartonmstFromRow(row);
         returnRecord = this.BuildExtraFromRow<Cartonmst>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Cartonmst record)
      {
         Cartonmst.UpdateRowFromCartonmst(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Cartonmst Insert(Cartonmst record)
      {
         DataRow row = this.dataSet.ttblcartonmst.NewttblcartonmstRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcartonmst.AddttblcartonmstRow((pdscartonmstDataSet.ttblcartonmstRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcartonmst.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcartonmst.Rows[0]) : null;
      }
  

      public Cartonmst Update(Cartonmst record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcartonmst.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcartonmst.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Cartonmst record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcartonmst.NewttblcartonmstRow();
            Cartonmst.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcartonmst.AddttblcartonmstRow((pdscartonmstDataSet.ttblcartonmstRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Cartonmst() { rowID = selectRowId }).ToList();
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
  