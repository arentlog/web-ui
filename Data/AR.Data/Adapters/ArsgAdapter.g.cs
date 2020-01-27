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
    
namespace Infor.Sxe.AR.Data.Adapters
{
   using com.infor.sxproxy.arproxy;
   using com.infor.sxproxy.arproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsarsg;
   using Models.Pdsargrouplookup;
   using Models.Complex;

   public partial class ArsgAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsarsg";
      private ARProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> arsgTableControlKey;
		
      private pdsarsgDataSet dataSet;
        
      public ArsgAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ARProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsarsgDataSet() { DataSetName = DataSetName };
            this.arsgTableControlKey = this.dataSet.ttblarsg.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.arsgTableControlKey))
            {
               this.CreateTableControlParameters(this.arsgTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ArsgAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Arsgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poArsgproxy = this.proxyAppObject.CreatePO_arsgproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poArsgproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Arsgproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.arsgTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.arsgTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Arsgproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsgproxy = this.proxyAppObject.CreatePO_arsgproxy())
               {
                  this.SetRequiredContextParameters();
                  poArsgproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Arsgproxy - After Call");
      }
   

      public Arsg GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Arsg arsg = null;
         if (row != null)
         {
             arsg = this.BuildFromRow(row);
         }
         return arsg;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(arsg) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblarsg.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Arsg> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(arsg)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Arsg Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblarsg.AsEnumerable().SingleOrDefault();
         Arsg arsg = null;
         if (row != null)
         {
             arsg = this.BuildFromRow(row);
         }
         return arsg;
      }
	  
	  
	  public IEnumerable<Arsg> GetListByRowpointers(List<string> rowpointers, string fldList)
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
              where.AppendFormat("arsg.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("arsg.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblarsg.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Arsg> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("arsg.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsg> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblarsg.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Arsg Get(int cono, string groupid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(groupid)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.groupid = '{0}'", groupid);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Arsg> GetListByAddr(int cono, string state, string city, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(state)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.state = '{0}'", state);
         }
         if (!string.IsNullOrEmpty(city)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.city = '{0}'", city);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsg> GetListByCredit(int cono, string creditmgr, string groupid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(creditmgr)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.creditmgr = '{0}'", creditmgr);
         }
         if (!string.IsNullOrEmpty(groupid)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.groupid = '{0}'", groupid);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsg> GetListByLkup(int cono, string lookupnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(lookupnm)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.lookupnm = '{0}'", lookupnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsg> GetListByPhone(int cono, string phoneno, string groupid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(phoneno)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.phoneno = '{0}'", phoneno);
         }
         if (!string.IsNullOrEmpty(groupid)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.groupid = '{0}'", groupid);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Arsg GetByRowpointer(string rowpointer, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("arsg.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, 1, fldList);
      }

      public IEnumerable<Arsg> GetListByStatus(int cono, bool statustype, string groupid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         sb.AppendFormatWithEscape(" AND arsg.statustype = {0}", statustype);
         if (!string.IsNullOrEmpty(groupid)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.groupid = '{0}'", groupid);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsg> GetListByTransdttmz(DateTime? transdttmz, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("arsg.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Arsg> GetListByZipcd(int cono, string zipcd, string lookupnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("arsg.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(zipcd)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.zipcd = '{0}'", zipcd);
         }
         if (!string.IsNullOrEmpty(lookupnm)) 
         {
             sb.AppendFormatWithEscape(" AND arsg.lookupnm = '{0}'", lookupnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Arsg BuildFromRow(DataRow row)
      {
         var returnRecord = Arsg.BuildArsgFromRow(row);
         returnRecord = this.BuildExtraFromRow<Arsg>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Arsg record)
      {
         Arsg.UpdateRowFromArsg(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Arsg Insert(Arsg record)
      {
         DataRow row = this.dataSet.ttblarsg.NewttblarsgRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblarsg.AddttblarsgRow((pdsarsgDataSet.ttblarsgRow)row);
         this.SaveChanges();
         return this.dataSet.ttblarsg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsg.Rows[0]) : null;
      }
  

      public Arsg Update(Arsg record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblarsg.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblarsg.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Arsg record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblarsg.NewttblarsgRow();
            Arsg.BuildMinimalRow(ref row, record);
            this.dataSet.ttblarsg.AddttblarsgRow((pdsarsgDataSet.ttblarsgRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Arsg record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttblarsg.NewttblarsgRow();
            Arsg.BuildMinimalRow(ref row, record);
            this.dataSet.ttblarsg.AddttblarsgRow((pdsarsgDataSet.ttblarsgRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Arsg() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Arsg() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public ArsgLookupResponseAPI Lookup(Argrouplookupcriteria argrouplookupcriteria)
      {   
         var result = new ArsgLookupResponseAPI();
         
         var pdsargrouplookup = new pdsargrouplookupDataSet();
            
         DataRow ttblargrouplookupcriteriaCriteria = pdsargrouplookup.ttblargrouplookupcriteria.NewttblargrouplookupcriteriaRow();
         Argrouplookupcriteria.UpdateRowFromArgrouplookupcriteria(ref ttblargrouplookupcriteriaCriteria, argrouplookupcriteria);
         pdsargrouplookup.ttblargrouplookupcriteria.AddttblargrouplookupcriteriaRow((pdsargrouplookupDataSet.ttblargrouplookupcriteriaRow)ttblargrouplookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Arsg - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsgproxy = this.proxyAppObject.CreatePO_arsgproxy())
               {
                   this.SetRequiredContextParameters();
                   poArsgproxy.Lookup(ref pdsContext, ref pdsargrouplookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Arsg - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsargrouplookup); 
    
         foreach (DataRow row in pdsargrouplookup.ttblargrouplookupresults)
         {
            result.argrouplookupresults.Add(Argrouplookupresults.BuildArgrouplookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Arsg> GetListByWordIndex(string searchTerm, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttblarsg.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Arsg - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poArsgProxy = this.proxyAppObject.CreatePO_arsgproxy())
               {
                   this.SetRequiredContextParameters();
                   poArsgProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Arsg - After Call");
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
  