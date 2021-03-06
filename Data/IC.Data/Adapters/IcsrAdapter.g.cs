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
   using Models.Pdsicsr;
   using Models.Pdsicsrlookup;

   public partial class IcsrAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsr";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsrTableControlKey;
		
      private pdsicsrDataSet dataSet;
        
      public IcsrAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsrDataSet() { DataSetName = DataSetName };
            this.icsrTableControlKey = this.dataSet.ttblicsr.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsrTableControlKey))
            {
               this.CreateTableControlParameters(this.icsrTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsrAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsrproxy = this.proxyAppObject.CreatePO_icsrproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsrproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsrproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsrTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsrTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsrproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsrproxy = this.proxyAppObject.CreatePO_icsrproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsrproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsrproxy - After Call");
      }
   

      public Icsr GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsr icsr = null;
         if (row != null)
         {
             icsr = this.BuildFromRow(row);
         }
         return icsr;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsr) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsr.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsr> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsr)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsr Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsr.AsEnumerable().SingleOrDefault();
         Icsr icsr = null;
         if (row != null)
         {
             icsr = this.BuildFromRow(row);
         }
         return icsr;
      }
	  
	  
      public IEnumerable<Icsr> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsr.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsr> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsr.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsr Get(int cono, decimal vendno, string whse, string prodline, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsr.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (vendno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND icsr.vendno = {0}", vendno);
         }
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND icsr.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prodline)) 
         {
             sb.AppendFormatWithEscape(" AND icsr.prodline = '{0}'", prodline);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Icsr BuildFromRow(DataRow row)
      {
         var returnRecord = Icsr.BuildIcsrFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsr>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsr record)
      {
         Icsr.UpdateRowFromIcsr(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsr Insert(Icsr record)
      {
         DataRow row = this.dataSet.ttblicsr.NewttblicsrRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsr.AddttblicsrRow((pdsicsrDataSet.ttblicsrRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsr.Rows[0]) : null;
      }
  

      public Icsr Update(Icsr record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsr.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsr.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsr record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsr.NewttblicsrRow();
            Icsr.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsr.AddttblicsrRow((pdsicsrDataSet.ttblicsrRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsr() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public IEnumerable<Icsrlookupresults> Lookup(Icsrlookupcriteria icsrlookupcriteria)
      {   
         var results = new List<Icsrlookupresults>();
         
         var pdsicsrlookup = new pdsicsrlookupDataSet();
            
         DataRow ttblicsrlookupcriteriaCriteria = pdsicsrlookup.ttblicsrlookupcriteria.NewttblicsrlookupcriteriaRow();
         Icsrlookupcriteria.UpdateRowFromIcsrlookupcriteria(ref ttblicsrlookupcriteriaCriteria, icsrlookupcriteria);
         pdsicsrlookup.ttblicsrlookupcriteria.AddttblicsrlookupcriteriaRow((pdsicsrlookupDataSet.ttblicsrlookupcriteriaRow)ttblicsrlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
   
         
         NLogLoggerP.Trace("Lookup - Icsr - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsrproxy = this.proxyAppObject.CreatePO_icsrproxy())
               {
                   this.SetRequiredContextParameters();
                   poIcsrproxy.Lookup(ref pdsContext, ref pdsicsrlookup, out cErrorMessage);
               }
            });
         NLogLoggerP.Info("Lookup - Icsr - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsicsrlookup); 
    
            foreach (DataRow row in pdsicsrlookup.ttblicsrlookupresults)
            {
                results.Add(Icsrlookupresults.BuildIcsrlookupresultsFromRow(row));
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
  