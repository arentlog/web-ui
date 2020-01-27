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
    
namespace Infor.Sxe.SA.Data.Adapters
{
   using com.infor.sxproxy.saproxy;
   using com.infor.sxproxy.saproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdssasgm;
   using Models.Pdssataxmasterlookup;
   using Models.Complex;

   public partial class SasgmAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssasgm";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sasgmTableControlKey;
		
      private pdssasgmDataSet dataSet;
        
      public SasgmAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssasgmDataSet() { DataSetName = DataSetName };
            this.sasgmTableControlKey = this.dataSet.ttblsasgm.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sasgmTableControlKey))
            {
               this.CreateTableControlParameters(this.sasgmTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SasgmAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sasgmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSasgmproxy = this.proxyAppObject.CreatePO_sasgmproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSasgmproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sasgmproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sasgmTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sasgmTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sasgmproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSasgmproxy = this.proxyAppObject.CreatePO_sasgmproxy())
               {
                  this.SetRequiredContextParameters();
                  poSasgmproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sasgmproxy - After Call");
      }
   

      public Sasgm GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sasgm sasgm = null;
         if (row != null)
         {
             sasgm = this.BuildFromRow(row);
         }
         return sasgm;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sasgm) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsasgm.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sasgm> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sasgm)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sasgm Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsasgm.AsEnumerable().SingleOrDefault();
         Sasgm sasgm = null;
         if (row != null)
         {
             sasgm = this.BuildFromRow(row);
         }
         return sasgm;
      }
	  
	  
      public IEnumerable<Sasgm> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sasgm.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sasgm> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsasgm.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sasgm Get(int cono, int recty, int taxgroup, string statecd, string countycd, string citycd, string othercd, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sasgm.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (recty != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasgm.recty = {0}", recty);
         }
         if (taxgroup != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sasgm.taxgroup = {0}", taxgroup);
         }
         if (!string.IsNullOrEmpty(statecd)) 
         {
             sb.AppendFormatWithEscape(" AND sasgm.statecd = '{0}'", statecd);
         }
         if (!string.IsNullOrEmpty(countycd)) 
         {
             sb.AppendFormatWithEscape(" AND sasgm.countycd = '{0}'", countycd);
         }
         if (!string.IsNullOrEmpty(citycd)) 
         {
             sb.AppendFormatWithEscape(" AND sasgm.citycd = '{0}'", citycd);
         }
         if (!string.IsNullOrEmpty(othercd)) 
         {
             sb.AppendFormatWithEscape(" AND sasgm.othercd = '{0}'", othercd);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Sasgm BuildFromRow(DataRow row)
      {
         var returnRecord = Sasgm.BuildSasgmFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sasgm>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sasgm record)
      {
         Sasgm.UpdateRowFromSasgm(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sasgm Insert(Sasgm record)
      {
         DataRow row = this.dataSet.ttblsasgm.NewttblsasgmRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsasgm.AddttblsasgmRow((pdssasgmDataSet.ttblsasgmRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsasgm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasgm.Rows[0]) : null;
      }
  

      public Sasgm Update(Sasgm record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsasgm.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsasgm.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sasgm record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsasgm.NewttblsasgmRow();
            Sasgm.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsasgm.AddttblsasgmRow((pdssasgmDataSet.ttblsasgmRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sasgm() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public SasgmLookupResponseAPI Lookup(Sataxmasterlookupcriteria sataxmasterlookupcriteria)
      {   
         var result = new SasgmLookupResponseAPI();
         
         var pdssataxmasterlookup = new pdssataxmasterlookupDataSet();
            
         DataRow ttblsataxmasterlookupcriteriaCriteria = pdssataxmasterlookup.ttblsataxmasterlookupcriteria.NewttblsataxmasterlookupcriteriaRow();
         Sataxmasterlookupcriteria.UpdateRowFromSataxmasterlookupcriteria(ref ttblsataxmasterlookupcriteriaCriteria, sataxmasterlookupcriteria);
         pdssataxmasterlookup.ttblsataxmasterlookupcriteria.AddttblsataxmasterlookupcriteriaRow((pdssataxmasterlookupDataSet.ttblsataxmasterlookupcriteriaRow)ttblsataxmasterlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Sasgm - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSasgmproxy = this.proxyAppObject.CreatePO_sasgmproxy())
               {
                   this.SetRequiredContextParameters();
                   poSasgmproxy.Lookup(ref pdsContext, ref pdssataxmasterlookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Sasgm - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdssataxmasterlookup); 
    
         foreach (DataRow row in pdssataxmasterlookup.ttblsataxmasterlookupresults)
         {
            result.sataxmasterlookupresults.Add(Sataxmasterlookupresults.BuildSataxmasterlookupresultsFromRow(row));
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
  