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
    
namespace Infor.Sxe.PV.Data.Adapters
{
   using com.infor.sxproxy.pvproxy;
   using com.infor.sxproxy.pvproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.PdspvJmln;

   public partial class PvJmlnAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_jmln";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvJmlnTableControlKey;
		
      private pdspv_jmlnDataSet dataSet;
        
      public PvJmlnAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_jmlnDataSet() { DataSetName = DataSetName };
            this.pvJmlnTableControlKey = this.dataSet.ttblpv_jmln.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvJmlnTableControlKey))
            {
               this.CreateTableControlParameters(this.pvJmlnTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvJmlnAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_jmlnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_jmlnproxy = this.proxyAppObject.CreatePO_pv_jmlnproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_jmlnproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_jmlnproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvJmlnTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvJmlnTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_jmlnproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_jmlnproxy = this.proxyAppObject.CreatePO_pv_jmlnproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_jmlnproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_jmlnproxy - After Call");
      }
   

      public PvJmln GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvJmln pvJmln = null;
         if (row != null)
         {
             pvJmln = this.BuildFromRow(row);
         }
         return pvJmln;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_jmln) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_jmln.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvJmln> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_jmln)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvJmln Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_jmln.AsEnumerable().SingleOrDefault();
         PvJmln pvJmln = null;
         if (row != null)
         {
             pvJmln = this.BuildFromRow(row);
         }
         return pvJmln;
      }
	  
	  
      public IEnumerable<PvJmln> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pv_jmln.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<PvJmln> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_jmln.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvJmln Get(int cono, string jobid, int jobrevno, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_jmln.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND pv_jmln.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_jmln.jobrevno = {0}", jobrevno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_jmln.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public PvJmln BuildFromRow(DataRow row)
      {
         var returnRecord = PvJmln.BuildPvJmlnFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvJmln>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvJmln record)
      {
         PvJmln.UpdateRowFromPvJmln(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvJmln Insert(PvJmln record)
      {
         DataRow row = this.dataSet.ttblpv_jmln.Newttblpv_jmlnRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_jmln.Addttblpv_jmlnRow((pdspv_jmlnDataSet.ttblpv_jmlnRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_jmln.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_jmln.Rows[0]) : null;
      }
  

      public PvJmln Update(PvJmln record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_jmln.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_jmln.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvJmln record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_jmln.Newttblpv_jmlnRow();
            PvJmln.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_jmln.Addttblpv_jmlnRow((pdspv_jmlnDataSet.ttblpv_jmlnRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvJmln() { rowID = selectRowId }).ToList();
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
  