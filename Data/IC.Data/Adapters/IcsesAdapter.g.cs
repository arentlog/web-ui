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
    
namespace Infor.Sxe.IC.Data.Adapters
{
   using com.infor.sxproxy.icproxy;
   using com.infor.sxproxy.icproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsicses;
   using Models.Pdsicseriallookup;
   using Models.Complex;

   public partial class IcsesAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicses";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsesTableControlKey;
		
      private pdsicsesDataSet dataSet;
        
      public IcsesAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsesDataSet() { DataSetName = DataSetName };
            this.icsesTableControlKey = this.dataSet.ttblicses.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsesTableControlKey))
            {
               this.CreateTableControlParameters(this.icsesTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsesAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsesproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsesproxy = this.proxyAppObject.CreatePO_icsesproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsesproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsesproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsesTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsesTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsesproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsesproxy = this.proxyAppObject.CreatePO_icsesproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsesproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsesproxy - After Call");
      }
   

      public Icses GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icses icses = null;
         if (row != null)
         {
             icses = this.BuildFromRow(row);
         }
         return icses;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icses) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicses.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icses> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icses)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icses Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicses.AsEnumerable().SingleOrDefault();
         Icses icses = null;
         if (row != null)
         {
             icses = this.BuildFromRow(row);
         }
         return icses;
      }
	  
	  
	  public IEnumerable<Icses> GetListByRowpointers(List<string> rowpointers, string fldList)
      {
         var where = new StringBuilder();
         if (rowpointers != null && rowpointers.Count > 0)
         {
           foreach (var rowpointer in rowpointers)
           {
              if (where.ToString().Length > 0)
              {
                 where.Append(" OR ");
              }
              where.AppendFormat("icses.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("icses.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicses.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Icses> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icses.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icses> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicses.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icses Get(int cono, string prod, string whse, string serialno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icses.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icses.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icses.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(serialno)) 
         {
             sb.AppendFormatWithEscape(" AND icses.serialno = '{0}'", serialno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icses> GetListByAvail(int cono, string whse, string prod, string currstatus, DateTime? receiptdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icses.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icses.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icses.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(currstatus)) 
         {
             sb.AppendFormatWithEscape(" AND icses.currstatus = '{0}'", currstatus);
         }
         if (receiptdt != null) 
         {
             sb.AppendFormatWithEscape(" AND icses.receiptdt = '{0}'", receiptdt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icses GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("icses.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Icses> GetListBySerialno(int cono, string whse, string serialno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icses.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icses.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(serialno)) 
         {
             sb.AppendFormatWithEscape(" AND icses.serialno = '{0}'", serialno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icses> GetListByZprod(int cono, string prod, string serialno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icses.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND icses.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(serialno)) 
         {
             sb.AppendFormatWithEscape(" AND icses.serialno = '{0}'", serialno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icses BuildFromRow(DataRow row)
      {
         var returnRecord = Icses.BuildIcsesFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icses>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icses record)
      {
         Icses.UpdateRowFromIcses(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icses Insert(Icses record)
      {
         DataRow row = this.dataSet.ttblicses.NewttblicsesRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicses.AddttblicsesRow((pdsicsesDataSet.ttblicsesRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicses.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicses.Rows[0]) : null;
      }
  

      public Icses Update(Icses record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicses.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicses.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icses record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicses.NewttblicsesRow();
            Icses.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicses.AddttblicsesRow((pdsicsesDataSet.ttblicsesRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Icses record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblicses.NewttblicsesRow();
            Icses.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicses.AddttblicsesRow((pdsicsesDataSet.ttblicsesRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icses() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.DeleteUseRowID(rec);
            }
         }
      }
	  
 
      public void DeleteListByRowPointers(List<string> rowpointers)
      {
         if (rowpointers != null)
         {
            var recList = rowpointers.Select(selectRowpointer => new Icses() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public IcsesLookupResponseAPI Lookup(Icseriallookupcriteria icseriallookupcriteria)
      {   
         var result = new IcsesLookupResponseAPI();
         
         var pdsicseriallookup = new pdsicseriallookupDataSet();
            
         DataRow ttblicseriallookupcriteriaCriteria = pdsicseriallookup.ttblicseriallookupcriteria.NewttblicseriallookupcriteriaRow();
         Icseriallookupcriteria.UpdateRowFromIcseriallookupcriteria(ref ttblicseriallookupcriteriaCriteria, icseriallookupcriteria);
         pdsicseriallookup.ttblicseriallookupcriteria.AddttblicseriallookupcriteriaRow((pdsicseriallookupDataSet.ttblicseriallookupcriteriaRow)ttblicseriallookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Icses - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsesproxy = this.proxyAppObject.CreatePO_icsesproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcsesproxy.Lookup(ref pdsContext, ref pdsicseriallookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Icses - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicseriallookup); 
    
         foreach (DataRow row in pdsicseriallookup.ttblicseriallookupresults)
         {
            result.icseriallookupresults.Add(Icseriallookupresults.BuildIcseriallookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Icses> GetListByWordIndex(string searchTerm, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttblicses.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Icses - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsesProxy = this.proxyAppObject.CreatePO_icsesproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcsesProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Icses - After Call");
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
  