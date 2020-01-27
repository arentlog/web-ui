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
    
namespace Infor.Sxe.OT.Data.Adapters
{
   using com.infor.sxproxy.otproxy;
   using com.infor.sxproxy.otproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsotevh;
   using Models.Pdsotvessellookup;
   using Models.Complex;

   public partial class OtevhAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsotevh";
      private OTProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> otevhTableControlKey;
		
      private pdsotevhDataSet dataSet;
        
      public OtevhAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OTProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsotevhDataSet() { DataSetName = DataSetName };
            this.otevhTableControlKey = this.dataSet.ttblotevh.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.otevhTableControlKey))
            {
               this.CreateTableControlParameters(this.otevhTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OtevhAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Otevhproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOtevhproxy = this.proxyAppObject.CreatePO_otevhproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOtevhproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Otevhproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.otevhTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.otevhTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Otevhproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOtevhproxy = this.proxyAppObject.CreatePO_otevhproxy())
               {
                  this.SetRequiredContextParameters();
                  poOtevhproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Otevhproxy - After Call");
      }
   

      public Otevh GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Otevh otevh = null;
         if (row != null)
         {
             otevh = this.BuildFromRow(row);
         }
         return otevh;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(otevh) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblotevh.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Otevh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(otevh)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Otevh Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblotevh.AsEnumerable().SingleOrDefault();
         Otevh otevh = null;
         if (row != null)
         {
             otevh = this.BuildFromRow(row);
         }
         return otevh;
      }
	  
	  
      public IEnumerable<Otevh> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("otevh.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Otevh> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblotevh.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Otevh Get(int cono, int vesselno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("otevh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vesselno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND otevh.vesselno = {0}", vesselno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Otevh> GetListByStagecd(int cono, int stagecd, int vesselno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("otevh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (stagecd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND otevh.stagecd = {0}", stagecd);
         }
         if (vesselno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND otevh.vesselno = {0}", vesselno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Otevh BuildFromRow(DataRow row)
      {
         var returnRecord = Otevh.BuildOtevhFromRow(row);
         returnRecord = this.BuildExtraFromRow<Otevh>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Otevh record)
      {
         Otevh.UpdateRowFromOtevh(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Otevh Insert(Otevh record)
      {
         DataRow row = this.dataSet.ttblotevh.NewttblotevhRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblotevh.AddttblotevhRow((pdsotevhDataSet.ttblotevhRow)row);
         this.SaveChanges();
         return this.dataSet.ttblotevh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblotevh.Rows[0]) : null;
      }
  

      public Otevh Update(Otevh record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblotevh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblotevh.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Otevh record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblotevh.NewttblotevhRow();
            Otevh.BuildMinimalRow(ref row, record);
            this.dataSet.ttblotevh.AddttblotevhRow((pdsotevhDataSet.ttblotevhRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Otevh() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public OtevhLookupResponseAPI Lookup(Otvessellookupcriteria otvessellookupcriteria)
      {   
         var result = new OtevhLookupResponseAPI();
         
         var pdsotvessellookup = new pdsotvessellookupDataSet();
            
         DataRow ttblotvessellookupcriteriaCriteria = pdsotvessellookup.ttblotvessellookupcriteria.NewttblotvessellookupcriteriaRow();
         Otvessellookupcriteria.UpdateRowFromOtvessellookupcriteria(ref ttblotvessellookupcriteriaCriteria, otvessellookupcriteria);
         pdsotvessellookup.ttblotvessellookupcriteria.AddttblotvessellookupcriteriaRow((pdsotvessellookupDataSet.ttblotvessellookupcriteriaRow)ttblotvessellookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Otevh - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOtevhproxy = this.proxyAppObject.CreatePO_otevhproxy())
               {
                   this.SetRequiredContextParameters();
                   poOtevhproxy.Lookup(ref pdsContext, ref pdsotvessellookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Otevh - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsotvessellookup); 
    
         foreach (DataRow row in pdsotvessellookup.ttblotvessellookupresults)
         {
            result.otvessellookupresults.Add(Otvessellookupresults.BuildOtvessellookupresultsFromRow(row));
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
  