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
    
namespace Infor.Sxe.AP.Data.Adapters
{
   using com.infor.sxproxy.approxy;
   using com.infor.sxproxy.approxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsapemm;

   public partial class ApemmAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsapemm";
      private APProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> apemmTableControlKey;
		
      private pdsapemmDataSet dataSet;
        
      public ApemmAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new APProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsapemmDataSet() { DataSetName = DataSetName };
            this.apemmTableControlKey = this.dataSet.ttblapemm.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.apemmTableControlKey))
            {
               this.CreateTableControlParameters(this.apemmTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ApemmAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Apemmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poApemmproxy = this.proxyAppObject.CreatePO_apemmproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poApemmproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Apemmproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.apemmTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.apemmTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Apemmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poApemmproxy = this.proxyAppObject.CreatePO_apemmproxy())
               {
                  this.SetRequiredContextParameters();
                  poApemmproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Apemmproxy - After Call");
      }
   

      public Apemm GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Apemm apemm = null;
         if (row != null)
         {
             apemm = this.BuildFromRow(row);
         }
         return apemm;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(apemm) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblapemm.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Apemm> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(apemm)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Apemm Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblapemm.AsEnumerable().SingleOrDefault();
         Apemm apemm = null;
         if (row != null)
         {
             apemm = this.BuildFromRow(row);
         }
         return apemm;
      }
	  
	  
      public IEnumerable<Apemm> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("apemm.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Apemm> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblapemm.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Apemm Get(int cono, int jrnlno, int setno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("apemm.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apemm.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND apemm.setno = {0}", setno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Apemm BuildFromRow(DataRow row)
      {
         var returnRecord = Apemm.BuildApemmFromRow(row);
         returnRecord = this.BuildExtraFromRow<Apemm>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Apemm record)
      {
         Apemm.UpdateRowFromApemm(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Apemm Insert(Apemm record)
      {
         DataRow row = this.dataSet.ttblapemm.NewttblapemmRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblapemm.AddttblapemmRow((pdsapemmDataSet.ttblapemmRow)row);
         this.SaveChanges();
         return this.dataSet.ttblapemm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapemm.Rows[0]) : null;
      }
  

      public Apemm Update(Apemm record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblapemm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblapemm.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Apemm record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblapemm.NewttblapemmRow();
            Apemm.BuildMinimalRow(ref row, record);
            this.dataSet.ttblapemm.AddttblapemmRow((pdsapemmDataSet.ttblapemmRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Apemm() { rowID = selectRowId }).ToList();
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
  