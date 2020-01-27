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
   using Models.PdspvPdsps;
   using Models.Pdspvpdspslookup;
   using Models.Complex;

   public partial class PvPdspsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_pdsps";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvPdspsTableControlKey;
		
      private pdspv_pdspsDataSet dataSet;
        
      public PvPdspsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_pdspsDataSet() { DataSetName = DataSetName };
            this.pvPdspsTableControlKey = this.dataSet.ttblpv_pdsps.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvPdspsTableControlKey))
            {
               this.CreateTableControlParameters(this.pvPdspsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvPdspsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_pdspsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_pdspsproxy = this.proxyAppObject.CreatePO_pv_pdspsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_pdspsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_pdspsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvPdspsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvPdspsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_pdspsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_pdspsproxy = this.proxyAppObject.CreatePO_pv_pdspsproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_pdspsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_pdspsproxy - After Call");
      }
   

      public PvPdsps GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvPdsps pvPdsps = null;
         if (row != null)
         {
             pvPdsps = this.BuildFromRow(row);
         }
         return pvPdsps;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_pdsps) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_pdsps.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvPdsps> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_pdsps)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvPdsps Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_pdsps.AsEnumerable().SingleOrDefault();
         PvPdsps pvPdsps = null;
         if (row != null)
         {
             pvPdsps = this.BuildFromRow(row);
         }
         return pvPdsps;
      }
	  
	  
      public IEnumerable<PvPdsps> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pv_pdsps.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<PvPdsps> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_pdsps.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvPdsps Get(int cono, string whse, string prod, string pricesheet, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_pdsps.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pv_pdsps.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pv_pdsps.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(pricesheet)) 
         {
             sb.AppendFormatWithEscape(" AND pv_pdsps.pricesheet = '{0}'", pricesheet);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<PvPdsps> GetListByEffectivedt(int cono, string whse, string prod, DateTime? effectivedt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_pdsps.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND pv_pdsps.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND pv_pdsps.prod = '{0}'", prod);
         }
         if (effectivedt != null) 
         {
             sb.AppendFormatWithEscape(" AND pv_pdsps.effectivedt = '{0}'", effectivedt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public PvPdsps BuildFromRow(DataRow row)
      {
         var returnRecord = PvPdsps.BuildPvPdspsFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvPdsps>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvPdsps record)
      {
         PvPdsps.UpdateRowFromPvPdsps(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvPdsps Insert(PvPdsps record)
      {
         DataRow row = this.dataSet.ttblpv_pdsps.Newttblpv_pdspsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_pdsps.Addttblpv_pdspsRow((pdspv_pdspsDataSet.ttblpv_pdspsRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_pdsps.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_pdsps.Rows[0]) : null;
      }
  

      public PvPdsps Update(PvPdsps record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_pdsps.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_pdsps.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvPdsps record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_pdsps.Newttblpv_pdspsRow();
            PvPdsps.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_pdsps.Addttblpv_pdspsRow((pdspv_pdspsDataSet.ttblpv_pdspsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvPdsps() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public PvPdspsLookupResponseAPI Lookup(Pvpdspslookupcriteria pvpdspslookupcriteria)
      {   
         var result = new PvPdspsLookupResponseAPI();
         
         var pdspvpdspslookup = new pdspvpdspslookupDataSet();
            
         DataRow ttblpvpdspslookupcriteriaCriteria = pdspvpdspslookup.ttblpvpdspslookupcriteria.NewttblpvpdspslookupcriteriaRow();
         Pvpdspslookupcriteria.UpdateRowFromPvpdspslookupcriteria(ref ttblpvpdspslookupcriteriaCriteria, pvpdspslookupcriteria);
         pdspvpdspslookup.ttblpvpdspslookupcriteria.AddttblpvpdspslookupcriteriaRow((pdspvpdspslookupDataSet.ttblpvpdspslookupcriteriaRow)ttblpvpdspslookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - PvPdsps - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPvPdspsproxy = this.proxyAppObject.CreatePO_pv_pdspsproxy())
               {
                   this.SetRequiredContextParameters();
                   poPvPdspsproxy.Lookup(ref pdsContext, ref pdspvpdspslookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - PvPdsps - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdspvpdspslookup); 
    
         foreach (DataRow row in pdspvpdspslookup.ttblpvpdspslookupresults)
         {
            result.pvpdspslookupresults.Add(Pvpdspslookupresults.BuildPvpdspslookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
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
  