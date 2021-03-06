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
    
namespace Infor.Sxe.BI.Data.Adapters
{
   using com.infor.sxproxy.biproxy;
   using com.infor.sxproxy.biproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsbisv;

   public partial class BisvAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsbisv";
      private BIProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> bisvTableControlKey;
		
      private pdsbisvDataSet dataSet;
        
      public BisvAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new BIProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsbisvDataSet() { DataSetName = DataSetName };
            this.bisvTableControlKey = this.dataSet.ttblbisv.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.bisvTableControlKey))
            {
               this.CreateTableControlParameters(this.bisvTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in BisvAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Bisvproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poBisvproxy = this.proxyAppObject.CreatePO_bisvproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poBisvproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Bisvproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.bisvTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.bisvTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Bisvproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poBisvproxy = this.proxyAppObject.CreatePO_bisvproxy())
               {
                  this.SetRequiredContextParameters();
                  poBisvproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Bisvproxy - After Call");
      }
   

      public Bisv GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Bisv bisv = null;
         if (row != null)
         {
             bisv = this.BuildFromRow(row);
         }
         return bisv;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(bisv) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblbisv.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Bisv> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(bisv)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Bisv Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblbisv.AsEnumerable().SingleOrDefault();
         Bisv bisv = null;
         if (row != null)
         {
             bisv = this.BuildFromRow(row);
         }
         return bisv;
      }
	  
	  
      public IEnumerable<Bisv> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("bisv.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Bisv> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblbisv.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Bisv Get(int cono, string valueName, string key1, string whse, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("bisv.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(valueName)) 
         {
             sb.AppendFormatWithEscape(" AND bisv.value_name = '{0}'", valueName);
         }
         if (!string.IsNullOrEmpty(key1)) 
         {
             sb.AppendFormatWithEscape(" AND bisv.key1 = '{0}'", key1);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND bisv.whse = '{0}'", whse);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Bisv BuildFromRow(DataRow row)
      {
         var returnRecord = Bisv.BuildBisvFromRow(row);
         returnRecord = this.BuildExtraFromRow<Bisv>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Bisv record)
      {
         Bisv.UpdateRowFromBisv(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Bisv Insert(Bisv record)
      {
         DataRow row = this.dataSet.ttblbisv.NewttblbisvRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblbisv.AddttblbisvRow((pdsbisvDataSet.ttblbisvRow)row);
         this.SaveChanges();
         return this.dataSet.ttblbisv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbisv.Rows[0]) : null;
      }
  

      public Bisv Update(Bisv record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblbisv.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbisv.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Bisv record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblbisv.NewttblbisvRow();
            Bisv.BuildMinimalRow(ref row, record);
            this.dataSet.ttblbisv.AddttblbisvRow((pdsbisvDataSet.ttblbisvRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Bisv() { rowID = selectRowId }).ToList();
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
  