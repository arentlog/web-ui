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
    
namespace Infor.Sxe.KP.Data.Adapters
{
   using com.infor.sxproxy.kpproxy;
   using com.infor.sxproxy.kpproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdskpsk;
   using Models.Pdskpcomponentslookup;

   public partial class KpskAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdskpsk";
      private KPProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> kpskTableControlKey;
		
      private pdskpskDataSet dataSet;
        
      public KpskAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new KPProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdskpskDataSet() { DataSetName = DataSetName };
            this.kpskTableControlKey = this.dataSet.ttblkpsk.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.kpskTableControlKey))
            {
               this.CreateTableControlParameters(this.kpskTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in KpskAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Kpskproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poKpskproxy = this.proxyAppObject.CreatePO_kpskproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poKpskproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Kpskproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.kpskTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.kpskTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Kpskproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poKpskproxy = this.proxyAppObject.CreatePO_kpskproxy())
               {
                  this.SetRequiredContextParameters();
                  poKpskproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Kpskproxy - After Call");
      }
   

      public Kpsk GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Kpsk kpsk = null;
         if (row != null)
         {
             kpsk = this.BuildFromRow(row);
         }
         return kpsk;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(kpsk) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblkpsk.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Kpsk> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(kpsk)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Kpsk Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblkpsk.AsEnumerable().SingleOrDefault();
         Kpsk kpsk = null;
         if (row != null)
         {
             kpsk = this.BuildFromRow(row);
         }
         return kpsk;
      }
	  
	  
      public IEnumerable<Kpsk> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("kpsk.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Kpsk> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblkpsk.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Kpsk Get(int cono, string prod, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpsk.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND kpsk.prod = '{0}'", prod);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND kpsk.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Kpsk> GetListByComprod(int cono, string comptype, string comprod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpsk.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(comptype)) 
         {
             sb.AppendFormatWithEscape(" AND kpsk.comptype = '{0}'", comptype);
         }
         if (!string.IsNullOrEmpty(comprod)) 
         {
             sb.AppendFormatWithEscape(" AND kpsk.comprod = '{0}'", comprod);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Kpsk> GetListByComptype(int cono, string prod, string comptype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("kpsk.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND kpsk.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(comptype)) 
         {
             sb.AppendFormatWithEscape(" AND kpsk.comptype = '{0}'", comptype);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Kpsk BuildFromRow(DataRow row)
      {
         var returnRecord = Kpsk.BuildKpskFromRow(row);
         returnRecord = this.BuildExtraFromRow<Kpsk>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Kpsk record)
      {
         Kpsk.UpdateRowFromKpsk(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Kpsk Insert(Kpsk record)
      {
         DataRow row = this.dataSet.ttblkpsk.NewttblkpskRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblkpsk.AddttblkpskRow((pdskpskDataSet.ttblkpskRow)row);
         this.SaveChanges();
         return this.dataSet.ttblkpsk.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblkpsk.Rows[0]) : null;
      }
  

      public Kpsk Update(Kpsk record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblkpsk.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblkpsk.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Kpsk record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblkpsk.NewttblkpskRow();
            Kpsk.BuildMinimalRow(ref row, record);
            this.dataSet.ttblkpsk.AddttblkpskRow((pdskpskDataSet.ttblkpskRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Kpsk() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public IEnumerable<Kpcomponentslookupresults> Lookup(Kpcomponentslookupcriteria kpcomponentslookupcriteria)
      {   
         var results = new List<Kpcomponentslookupresults>();
         
         var pdskpcomponentslookup = new pdskpcomponentslookupDataSet();
            
         DataRow ttblkpcomponentslookupcriteriaCriteria = pdskpcomponentslookup.ttblkpcomponentslookupcriteria.NewttblkpcomponentslookupcriteriaRow();
         Kpcomponentslookupcriteria.UpdateRowFromKpcomponentslookupcriteria(ref ttblkpcomponentslookupcriteriaCriteria, kpcomponentslookupcriteria);
         pdskpcomponentslookup.ttblkpcomponentslookupcriteria.AddttblkpcomponentslookupcriteriaRow((pdskpcomponentslookupDataSet.ttblkpcomponentslookupcriteriaRow)ttblkpcomponentslookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("Lookup - Kpsk - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poKpskproxy = this.proxyAppObject.CreatePO_kpskproxy())
               {
                   this.SetRequiredContextParameters();
                   poKpskproxy.Lookup(ref pdsContext, ref pdskpcomponentslookup, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("Lookup - Kpsk - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdskpcomponentslookup); 
    
            foreach (DataRow row in pdskpcomponentslookup.ttblkpcomponentslookupresults)
            {
                results.Add(Kpcomponentslookupresults.BuildKpcomponentslookupresultsFromRow(row));
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
  