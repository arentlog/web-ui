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
    
namespace Infor.Sxe.RS.Data.Adapters
{
   using com.infor.sxproxy.rsproxy;
   using com.infor.sxproxy.rsproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsrses;

   public partial class RsesAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsrses";
      private RSProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> rsesTableControlKey;
		
      private pdsrsesDataSet dataSet;
        
      public RsesAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new RSProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsrsesDataSet() { DataSetName = DataSetName };
            this.rsesTableControlKey = this.dataSet.ttblrses.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.rsesTableControlKey))
            {
               this.CreateTableControlParameters(this.rsesTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in RsesAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Rsesproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poRsesproxy = this.proxyAppObject.CreatePO_rsesproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poRsesproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Rsesproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.rsesTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.rsesTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Rsesproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poRsesproxy = this.proxyAppObject.CreatePO_rsesproxy())
               {
                  this.SetRequiredContextParameters();
                  poRsesproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Rsesproxy - After Call");
      }
   

      public Rses GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Rses rses = null;
         if (row != null)
         {
             rses = this.BuildFromRow(row);
         }
         return rses;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(rses) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblrses.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Rses> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(rses)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Rses Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblrses.AsEnumerable().SingleOrDefault();
         Rses rses = null;
         if (row != null)
         {
             rses = this.BuildFromRow(row);
         }
         return rses;
      }
	  
	  
      public IEnumerable<Rses> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("rses.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Rses> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblrses.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Rses Get(string queuenm, DateTime? startdt, int starttm, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(queuenm)) 
         {
             sb.AppendFormatWithEscape("rses.queuenm = '{0}'", queuenm);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND rses.startdt = '{0}'", startdt);
         }
         if (starttm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND rses.starttm = {0}", starttm);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND rses.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Rses> GetListByDatetm(DateTime? startdt, int starttm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape("rses.startdt = '{0}'", startdt);
         }
         if (starttm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND rses.starttm = {0}", starttm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Rses> GetListByJobnm(string jobnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(jobnm)) 
         {
             sb.AppendFormatWithEscape("rses.jobnm = '{0}'", jobnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Rses> GetListByStatus(string inusety, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(inusety)) 
         {
             sb.AppendFormatWithEscape("rses.inusety = '{0}'", inusety);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Rses BuildFromRow(DataRow row)
      {
         var returnRecord = Rses.BuildRsesFromRow(row);
         returnRecord = this.BuildExtraFromRow<Rses>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Rses record)
      {
         Rses.UpdateRowFromRses(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Rses Insert(Rses record)
      {
         DataRow row = this.dataSet.ttblrses.NewttblrsesRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblrses.AddttblrsesRow((pdsrsesDataSet.ttblrsesRow)row);
         this.SaveChanges();
         return this.dataSet.ttblrses.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrses.Rows[0]) : null;
      }
  

      public Rses Update(Rses record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblrses.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrses.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Rses record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblrses.NewttblrsesRow();
            Rses.BuildMinimalRow(ref row, record);
            this.dataSet.ttblrses.AddttblrsesRow((pdsrsesDataSet.ttblrsesRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Rses() { rowID = selectRowId }).ToList();
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
  