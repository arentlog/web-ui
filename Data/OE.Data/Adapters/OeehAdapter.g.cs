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
    
namespace Infor.Sxe.OE.Data.Adapters
{
   using com.infor.sxproxy.oeproxy;
   using com.infor.sxproxy.oeproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsoeeh;
   using Models.Pdsoeorderlookup;
   using Models.Pdsoeehrecentvisit;
   using Models.Complex;

   public partial class OeehAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsoeeh";
      private OEProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> oeehTableControlKey;
		private readonly Tuple<string, string> arscTableControlKey;private readonly Tuple<string, string> arssTableControlKey;
      private pdsoeehDataSet dataSet;
        
      public OeehAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new OEProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsoeehDataSet() { DataSetName = DataSetName };
            this.oeehTableControlKey = this.dataSet.ttbloeeh.GetTableControlParametersKey();
            this.arscTableControlKey = this.dataSet.ttblarsc.GetTableControlParametersKey();this.arssTableControlKey = this.dataSet.ttblarss.GetTableControlParametersKey();
            if (!this.tempTableControlParameters.ContainsKey(this.oeehTableControlKey))
            {
               this.CreateTableControlParameters(this.oeehTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.arscTableControlKey))
            {
               this.CreateTableControlParameters(this.arscTableControlKey);
            }
            if (!this.tempTableControlParameters.ContainsKey(this.arssTableControlKey))
            {
               this.CreateTableControlParameters(this.arssTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in OeehAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, bool fillMode, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Oeehproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, fillMode, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poOeehproxy = this.proxyAppObject.CreatePO_oeehproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poOeehproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Oeehproxy - After Call");
      }
      
      private void SetAndFetch(string where, bool fillMode, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.oeehTableControlKey, where, batchsize, fldList);
         this.SetFetchWhereParameters(this.arscTableControlKey, fillMode);
         this.SetFetchWhereParameters(this.arssTableControlKey, fillMode);
         this.SetTableParametersOnContext(this.oeehTableControlKey, true);
         this.SetTableParametersOnContext(this.arscTableControlKey);
         this.SetTableParametersOnContext(this.arssTableControlKey);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Oeehproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehproxy = this.proxyAppObject.CreatePO_oeehproxy())
               {
                  this.SetRequiredContextParameters();
                  poOeehproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Oeehproxy - After Call");
      }
   

      public Oeeh GetByRowId(string rowId, bool fillMode, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fillMode, fldList);
         Oeeh oeeh = null;
         if (row != null)
         {
             oeeh = this.BuildFromRow(row);
         }
         return oeeh;
      }
   
      private DataRow GetRowByRowId(string rowId, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(oeeh) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttbloeeh.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Oeeh> GetListByRowIdList(List<string> rowIds, bool fillMode, int batchsize, string fldList)
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
              where.AppendFormat("rowid(oeeh)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), fillMode, batchsize, fldList);
      }

      protected Oeeh Fetch(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         var row = this.dataSet.ttbloeeh.AsEnumerable().SingleOrDefault();
         Oeeh oeeh = null;
         if (row != null)
         {
             oeeh = this.BuildFromRow(row);
         }
         return oeeh;
      }
	  
	  
	  public IEnumerable<Oeeh> GetListByRowpointers(List<string> rowpointers, bool fillMode, string fldList)
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
              where.AppendFormat("oeeh.rowpointer='{0}'", rowpointer);
           }
         }
         return this.GetList(where.ToString(), fillMode, rowpointers.Count, fldList);
      }
	  
	  private DataRow GetRowByRowpointer(string rowpointer, bool fillMode, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("oeeh.rowpointer = '{0}'", rowpointer);
         this.FetchWhere(where.ToString(), fillMode, 1, fldList);
         return this.dataSet.ttbloeeh.AsEnumerable().SingleOrDefault();
      }
      public IEnumerable<Oeeh> GetListAllByCono(int cono, bool fillMode, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("oeeh.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Oeeh> GetList(string where, bool fillMode, int batchsize, string fldList)
      {
         this.FetchWhere(where, fillMode, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbloeeh.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Oeeh Get(int cono, int orderno, int ordersuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, batchsize, fldList);
      }
  
      public IEnumerable<Oeeh> GetListByCustno(int cono, decimal custno, int stagecd, int orderno, int ordersuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.custno = {0}", custno);
         }
         if (stagecd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.stagecd = {0}", stagecd);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Oeeh> GetListByCustpo(int cono, string custpo, decimal custno, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(custpo)) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.custpo = '{0}'", custpo);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.custno = {0}", custno);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Oeeh> GetListByInvproc(int cono, string whse, DateTime? invoicedt, string updtype, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.whse = '{0}'", whse);
         }
         if (invoicedt != null) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.invoicedt = '{0}'", invoicedt);
         }
         if (!string.IsNullOrEmpty(updtype)) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.updtype = '{0}'", updtype);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Oeeh> GetListByJrnl(int cono, int jrnlno, int setno, int orderno, int ordersuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.jrnlno = {0}", jrnlno);
         }
         if (setno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.setno = {0}", setno);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Oeeh> GetListByJrnl2(int cono, int jrnlno2, decimal setno2, int orderno, int ordersuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (jrnlno2 != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.jrnlno2 = {0}", jrnlno2);
         }
         if (setno2 != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.setno2 = {0}", setno2);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Oeeh GetByRowpointer(string rowpointer, bool fillMode, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(rowpointer)) 
         {
             sb.AppendFormatWithEscape("oeeh.rowpointer = '{0}'", rowpointer);
         }
         var where = sb.ToString();
         return this.Fetch(where, fillMode, 1, fldList);
      }

      public IEnumerable<Oeeh> GetListByTransdttmz(DateTime? transdttmz, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (transdttmz != null) 
         {
             sb.AppendFormatWithEscape("oeeh.transdttmz = '{0}'", transdttmz);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public IEnumerable<Oeeh> GetListByWhsestagecd(int cono, string whse, int stagecd, int orderno, int ordersuf, bool fillMode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("oeeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.whse = '{0}'", whse);
         }
         if (stagecd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.stagecd = {0}", stagecd);
         }
         if (orderno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.orderno = {0}", orderno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND oeeh.ordersuf = {0}", ordersuf);
         }
         var where = sb.ToString();
         return this.GetList(where, fillMode, batchsize, fldList);
      }

      public Oeeh BuildFromRow(DataRow row)
      {
         var returnRecord = Oeeh.BuildOeehFromRow(row);
         returnRecord = this.BuildExtraFromRow<Oeeh>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Oeeh record)
      {
         Oeeh.UpdateRowFromOeeh(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Oeeh Insert(Oeeh record)
      {
         DataRow row = this.dataSet.ttbloeeh.NewttbloeehRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbloeeh.AddttbloeehRow((pdsoeehDataSet.ttbloeehRow)row);
         this.SaveChanges();
         return this.dataSet.ttbloeeh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeeh.Rows[0]) : null;
      }
  

      public Oeeh Update(Oeeh record)
      {
        var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbloeeh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbloeeh.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Oeeh record)
      {
         var row = this.GetRowByRowpointer(record.rowpointer, false, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbloeeh.NewttbloeehRow();
            Oeeh.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloeeh.AddttbloeehRow((pdsoeehDataSet.ttbloeehRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }
 
      private void DeleteUseRowID(Oeeh record)
      {
         var row = this.GetRowByRowId(record.rowID, false, string.Empty);
         if (row == null)
         {
            row = this.dataSet.ttbloeeh.NewttbloeehRow();
            Oeeh.BuildMinimalRow(ref row, record);
            this.dataSet.ttbloeeh.AddttbloeehRow((pdsoeehDataSet.ttbloeehRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Oeeh() { rowID = selectRowId }).ToList();
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
            var recList = rowpointers.Select(selectRowpointer => new Oeeh() { rowpointer = selectRowpointer }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }

      public OeehLookupResponseAPI Lookup(Oeorderlookupcriteria oeorderlookupcriteria)
      {   
         var result = new OeehLookupResponseAPI();
         
         var pdsoeorderlookup = new pdsoeorderlookupDataSet();
            
         DataRow ttbloeorderlookupcriteriaCriteria = pdsoeorderlookup.ttbloeorderlookupcriteria.NewttbloeorderlookupcriteriaRow();
         Oeorderlookupcriteria.UpdateRowFromOeorderlookupcriteria(ref ttbloeorderlookupcriteriaCriteria, oeorderlookupcriteria);
         pdsoeorderlookup.ttbloeorderlookupcriteria.AddttbloeorderlookupcriteriaRow((pdsoeorderlookupDataSet.ttbloeorderlookupcriteriaRow)ttbloeorderlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Oeeh - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehproxy = this.proxyAppObject.CreatePO_oeehproxy())
               {
                   this.SetRequiredContextParameters();
                   poOeehproxy.Lookup(ref pdsContext, ref pdsoeorderlookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Oeeh - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsoeorderlookup); 
    
         foreach (DataRow row in pdsoeorderlookup.ttbloeorderlookupresults)
         {
            result.oeorderlookupresults.Add(Oeorderlookupresults.BuildOeorderlookupresultsFromRow(row));
         }     
         result.lMoreRecords = lMoreRecords;
          
         return result;
          
      }

      public IEnumerable<Oeeh> GetListByWordIndex(string searchTerm, bool fillMode, int batchsize, string fldList)
      {
         var where = new StringBuilder();
         where.AppendKeywords(string.Empty, searchTerm, true, true, false);
         this.SetAndFetch(where.ToString(), fillMode, batchsize, fldList);
         this.SearchWordIndex(batchsize == 0 ? DefaultFetchWhereRowCount : batchsize , where.ToString());
         return (from DataRow row in this.dataSet.ttbloeeh.Rows select this.BuildFromRow(row)).ToList();
      }
  
      protected void SearchWordIndex(int batchSize, string searchTerm)
      {
         NLogLoggerP.Trace("SearchWordIndex - Oeeh - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehProxy = this.proxyAppObject.CreatePO_oeehproxy())
               {
                   this.SetRequiredContextParameters();
                   poOeehProxy.SearchWordIndex(batchSize, searchTerm, ref this.pdsContext, out this.dataSet, out string cErrorMessage, out bool moreRecords);
                   ErrorReportingHelper.ReportErrors(cErrorMessage);
                   this.ReportErrors(this.pdsContext);
                   this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SearchWordIndex - Oeeh - After Call");
      }
  
      public IEnumerable<Oeeh> GetRecentVisitList(OeehGetRecentVisitListRequestAPI OeehGetRecentVisitListRequestAPI)
      {   
         var results = new List<Oeeh>();
         
         var pdsoeehrecentvisit = new pdsoeehrecentvisitDataSet();
            
         var pdsoeeh = new pdsoeehDataSet();
            
         string cErrorMessage = string.Empty;
   
         foreach (var obj in OeehGetRecentVisitListRequestAPI.oeehrecentvisit)
         {
            DataRow ttbloeehrecentvisitRow = pdsoeehrecentvisit.ttbloeehrecentvisit.NewttbloeehrecentvisitRow();
            Oeehrecentvisit.UpdateRowFromOeehrecentvisit(ref ttbloeehrecentvisitRow, obj);
            pdsoeehrecentvisit.ttbloeehrecentvisit.AddttbloeehrecentvisitRow((pdsoeehrecentvisitDataSet.ttbloeehrecentvisitRow)ttbloeehrecentvisitRow);
         }
          
         var  fillMode = OeehGetRecentVisitListRequestAPI.fillMode;
            
         
         NLogLoggerP.Trace("GetRecentVisitList - Oeeh - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poOeehproxy = this.proxyAppObject.CreatePO_oeehproxy())
               {
                   this.SetRequiredContextParameters();
                   poOeehproxy.GetRecentVisitList(ref pdsContext,  pdsoeehrecentvisit, out pdsoeeh, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("GetRecentVisitList - Oeeh - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsoeehrecentvisit); 
    
            foreach (DataRow row in pdsoeeh.ttbloeeh)
            {
                results.Add(Oeeh.BuildOeehFromRow(row));
            }
            return results;
        
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
  