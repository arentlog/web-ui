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
   using Models.PdsrtnCtnDet;

   public partial class RtnCtnDetAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsrtn_ctn_det";
      private TWLProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> rtnCtnDetTableControlKey;
		
      private pdsrtn_ctn_detDataSet dataSet;
        
      public RtnCtnDetAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new TWLProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsrtn_ctn_detDataSet() { DataSetName = DataSetName };
            this.rtnCtnDetTableControlKey = this.dataSet.ttblrtn_ctn_det.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.rtnCtnDetTableControlKey))
            {
               this.CreateTableControlParameters(this.rtnCtnDetTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in RtnCtnDetAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Rtn_ctn_detproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poRtn_ctn_detproxy = this.proxyAppObject.CreatePO_rtn_ctn_detproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poRtn_ctn_detproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Rtn_ctn_detproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.rtnCtnDetTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.rtnCtnDetTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Rtn_ctn_detproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poRtn_ctn_detproxy = this.proxyAppObject.CreatePO_rtn_ctn_detproxy())
               {
                  this.SetRequiredContextParameters();
                  poRtn_ctn_detproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Rtn_ctn_detproxy - After Call");
      }
   

      public RtnCtnDet GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         RtnCtnDet rtnCtnDet = null;
         if (row != null)
         {
             rtnCtnDet = this.BuildFromRow(row);
         }
         return rtnCtnDet;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(rtn_ctn_det) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblrtn_ctn_det.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<RtnCtnDet> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(rtn_ctn_det)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected RtnCtnDet Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblrtn_ctn_det.AsEnumerable().SingleOrDefault();
         RtnCtnDet rtnCtnDet = null;
         if (row != null)
         {
             rtnCtnDet = this.BuildFromRow(row);
         }
         return rtnCtnDet;
      }
	  
	  

      public IEnumerable<RtnCtnDet> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblrtn_ctn_det.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public RtnCtnDet Get(int cartonNum, string absNum, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (cartonNum != int.MinValue) 
         {
             sb.AppendFormatWithEscape("rtn_ctn_det.carton_num = {0}", cartonNum);
         }
         if (!string.IsNullOrEmpty(absNum)) 
         {
             sb.AppendFormatWithEscape(" AND rtn_ctn_det.abs_num = '{0}'", absNum);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public RtnCtnDet BuildFromRow(DataRow row)
      {
         var returnRecord = RtnCtnDet.BuildRtnCtnDetFromRow(row);
         returnRecord = this.BuildExtraFromRow<RtnCtnDet>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, RtnCtnDet record)
      {
         RtnCtnDet.UpdateRowFromRtnCtnDet(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public RtnCtnDet Insert(RtnCtnDet record)
      {
         DataRow row = this.dataSet.ttblrtn_ctn_det.Newttblrtn_ctn_detRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblrtn_ctn_det.Addttblrtn_ctn_detRow((pdsrtn_ctn_detDataSet.ttblrtn_ctn_detRow)row);
         this.SaveChanges();
         return this.dataSet.ttblrtn_ctn_det.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrtn_ctn_det.Rows[0]) : null;
      }
  

      public RtnCtnDet Update(RtnCtnDet record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblrtn_ctn_det.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrtn_ctn_det.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(RtnCtnDet record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblrtn_ctn_det.Newttblrtn_ctn_detRow();
            RtnCtnDet.BuildMinimalRow(ref row, record);
            this.dataSet.ttblrtn_ctn_det.Addttblrtn_ctn_detRow((pdsrtn_ctn_detDataSet.ttblrtn_ctn_detRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new RtnCtnDet() { rowID = selectRowId }).ToList();
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
  