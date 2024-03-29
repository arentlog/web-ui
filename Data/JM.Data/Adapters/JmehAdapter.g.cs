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
    
namespace Infor.Sxe.JM.Data.Adapters
{
   using com.infor.sxproxy.jmproxy;
   using com.infor.sxproxy.jmproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsjmeh;
   using Models.Pdsjmjobheaderlookup;
   using Models.Complex;

   public partial class JmehAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsjmeh";
      private JMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> jmehTableControlKey;
		
      private pdsjmehDataSet dataSet;
        
      public JmehAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new JMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsjmehDataSet() { DataSetName = DataSetName };
            this.jmehTableControlKey = this.dataSet.ttbljmeh.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.jmehTableControlKey))
            {
               this.CreateTableControlParameters(this.jmehTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in JmehAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Jmehproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poJmehproxy = this.proxyAppObject.CreatePO_jmehproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poJmehproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Jmehproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.jmehTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.jmehTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Jmehproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poJmehproxy = this.proxyAppObject.CreatePO_jmehproxy())
               {
                  this.SetRequiredContextParameters();
                  poJmehproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Jmehproxy - After Call");
      }
   

      public Jmeh GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Jmeh jmeh = null;
         if (row != null)
         {
             jmeh = this.BuildFromRow(row);
         }
         return jmeh;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(jmeh) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbljmeh.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Jmeh> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(jmeh)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Jmeh Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbljmeh.AsEnumerable().SingleOrDefault();
         Jmeh jmeh = null;
         if (row != null)
         {
             jmeh = this.BuildFromRow(row);
         }
         return jmeh;
      }
	  
	  
      public IEnumerable<Jmeh> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("jmeh.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Jmeh> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbljmeh.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Jmeh Get(int cono, string jobid, int jobrevno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.jobrevno = {0}", jobrevno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Jmeh> GetListByEnterdt(int cono, DateTime? enterdt, string jobid, int jobrevno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (enterdt != null) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.enterdt = '{0}'", enterdt);
         }
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.jobrevno = {0}", jobrevno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Jmeh> GetListByQuoteno(int cono, int quoteno, int jobrevno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmeh.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (quoteno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.quoteno = {0}", quoteno);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmeh.jobrevno = {0}", jobrevno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Jmeh BuildFromRow(DataRow row)
      {
         var returnRecord = Jmeh.BuildJmehFromRow(row);
         returnRecord = this.BuildExtraFromRow<Jmeh>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Jmeh record)
      {
         Jmeh.UpdateRowFromJmeh(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Jmeh Insert(Jmeh record)
      {
         DataRow row = this.dataSet.ttbljmeh.NewttbljmehRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbljmeh.AddttbljmehRow((pdsjmehDataSet.ttbljmehRow)row);
         this.SaveChanges();
         return this.dataSet.ttbljmeh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbljmeh.Rows[0]) : null;
      }
  

      public Jmeh Update(Jmeh record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbljmeh.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbljmeh.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Jmeh record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbljmeh.NewttbljmehRow();
            Jmeh.BuildMinimalRow(ref row, record);
            this.dataSet.ttbljmeh.AddttbljmehRow((pdsjmehDataSet.ttbljmehRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Jmeh() { rowID = selectRowId }).ToList();
            foreach (var rec in recList)
            {
               this.Delete(rec);
            }
         }
      }
	  

      public JmehLookupResponseAPI Lookup(Jmjobheaderlookupcriteria jmjobheaderlookupcriteria)
      {   
         var result = new JmehLookupResponseAPI();
         
         var pdsjmjobheaderlookup = new pdsjmjobheaderlookupDataSet();
            
         DataRow ttbljmjobheaderlookupcriteriaCriteria = pdsjmjobheaderlookup.ttbljmjobheaderlookupcriteria.NewttbljmjobheaderlookupcriteriaRow();
         Jmjobheaderlookupcriteria.UpdateRowFromJmjobheaderlookupcriteria(ref ttbljmjobheaderlookupcriteriaCriteria, jmjobheaderlookupcriteria);
         pdsjmjobheaderlookup.ttbljmjobheaderlookupcriteria.AddttbljmjobheaderlookupcriteriaRow((pdsjmjobheaderlookupDataSet.ttbljmjobheaderlookupcriteriaRow)ttbljmjobheaderlookupcriteriaCriteria);
            
         string cErrorMessage = string.Empty;
         bool lMoreRecords = false;
   
         
         NLogLoggerP.Trace("Lookup - Jmeh - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poJmehproxy = this.proxyAppObject.CreatePO_jmehproxy())
               {
                   this.SetRequiredContextParameters();
                   poJmehproxy.Lookup(ref pdsContext, ref pdsjmjobheaderlookup, out cErrorMessage, out lMoreRecords);
               }
            });
         NLogLoggerP.Info("Lookup - Jmeh - After Call");

         
         this.ReportErrors(cErrorMessage);
         this.ReportErrors(this.pdsContext);
         this.ReportErrors(pdsjmjobheaderlookup); 
    
         foreach (DataRow row in pdsjmjobheaderlookup.ttbljmjobheaderlookupresults)
         {
            result.jmjobheaderlookupresults.Add(Jmjobheaderlookupresults.BuildJmjobheaderlookupresultsFromRow(row));
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
  