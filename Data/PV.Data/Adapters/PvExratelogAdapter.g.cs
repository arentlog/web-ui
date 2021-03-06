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
   using Models.PdspvExratelog;

   public partial class PvExratelogAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_exratelog";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvExratelogTableControlKey;
		
      private pdspv_exratelogDataSet dataSet;
        
      public PvExratelogAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_exratelogDataSet() { DataSetName = DataSetName };
            this.pvExratelogTableControlKey = this.dataSet.ttblpv_exratelog.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvExratelogTableControlKey))
            {
               this.CreateTableControlParameters(this.pvExratelogTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvExratelogAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_exratelogproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_exratelogproxy = this.proxyAppObject.CreatePO_pv_exratelogproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_exratelogproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_exratelogproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvExratelogTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvExratelogTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_exratelogproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_exratelogproxy = this.proxyAppObject.CreatePO_pv_exratelogproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_exratelogproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_exratelogproxy - After Call");
      }
   

      public PvExratelog GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvExratelog pvExratelog = null;
         if (row != null)
         {
             pvExratelog = this.BuildFromRow(row);
         }
         return pvExratelog;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_exratelog) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_exratelog.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvExratelog> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_exratelog)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvExratelog Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_exratelog.AsEnumerable().SingleOrDefault();
         PvExratelog pvExratelog = null;
         if (row != null)
         {
             pvExratelog = this.BuildFromRow(row);
         }
         return pvExratelog;
      }
	  
	  
      public IEnumerable<PvExratelog> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pv_exratelog.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<PvExratelog> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_exratelog.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvExratelog Get(int cono, string currencyty, string ratefield, DateTime? changedt, int changetm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_exratelog.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(currencyty)) 
         {
             sb.AppendFormatWithEscape(" AND pv_exratelog.currencyty = '{0}'", currencyty);
         }
         if (!string.IsNullOrEmpty(ratefield)) 
         {
             sb.AppendFormatWithEscape(" AND pv_exratelog.ratefield = '{0}'", ratefield);
         }
         if (changedt != null) 
         {
             sb.AppendFormatWithEscape(" AND pv_exratelog.changedt = '{0}'", changedt);
         }
         if (changetm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_exratelog.changetm = {0}", changetm);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<PvExratelog> GetListByTime(int cono, DateTime? changedt, int changetm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_exratelog.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (changedt != null) 
         {
             sb.AppendFormatWithEscape(" AND pv_exratelog.changedt = '{0}'", changedt);
         }
         if (changetm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND pv_exratelog.changetm = {0}", changetm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public PvExratelog BuildFromRow(DataRow row)
      {
         var returnRecord = PvExratelog.BuildPvExratelogFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvExratelog>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvExratelog record)
      {
         PvExratelog.UpdateRowFromPvExratelog(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvExratelog Insert(PvExratelog record)
      {
         DataRow row = this.dataSet.ttblpv_exratelog.Newttblpv_exratelogRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_exratelog.Addttblpv_exratelogRow((pdspv_exratelogDataSet.ttblpv_exratelogRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_exratelog.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_exratelog.Rows[0]) : null;
      }
  

      public PvExratelog Update(PvExratelog record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_exratelog.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_exratelog.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvExratelog record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_exratelog.Newttblpv_exratelogRow();
            PvExratelog.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_exratelog.Addttblpv_exratelogRow((pdspv_exratelogDataSet.ttblpv_exratelogRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvExratelog() { rowID = selectRowId }).ToList();
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
  