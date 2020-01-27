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
   using Models.Pdsjmehc;

   public partial class JmehcAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsjmehc";
      private JMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> jmehcTableControlKey;
		
      private pdsjmehcDataSet dataSet;
        
      public JmehcAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new JMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsjmehcDataSet() { DataSetName = DataSetName };
            this.jmehcTableControlKey = this.dataSet.ttbljmehc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.jmehcTableControlKey))
            {
               this.CreateTableControlParameters(this.jmehcTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in JmehcAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Jmehcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poJmehcproxy = this.proxyAppObject.CreatePO_jmehcproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poJmehcproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Jmehcproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.jmehcTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.jmehcTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Jmehcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poJmehcproxy = this.proxyAppObject.CreatePO_jmehcproxy())
               {
                  this.SetRequiredContextParameters();
                  poJmehcproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Jmehcproxy - After Call");
      }
   

      public Jmehc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Jmehc jmehc = null;
         if (row != null)
         {
             jmehc = this.BuildFromRow(row);
         }
         return jmehc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(jmehc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbljmehc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Jmehc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(jmehc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Jmehc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbljmehc.AsEnumerable().SingleOrDefault();
         Jmehc jmehc = null;
         if (row != null)
         {
             jmehc = this.BuildFromRow(row);
         }
         return jmehc;
      }
	  
	  
      public IEnumerable<Jmehc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("jmehc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Jmehc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbljmehc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Jmehc Get(int cono, string jobid, int jobrevno, decimal custno, string name, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmehc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.jobrevno = {0}", jobrevno);
         }
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.name = '{0}'", name);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Jmehc> GetListByCustjob(int cono, decimal custno, string name, string jobid, int jobrevno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmehc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (custno != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.custno = {0}", custno);
         }
         if (!string.IsNullOrEmpty(name)) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.name = '{0}'", name);
         }
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmehc.jobrevno = {0}", jobrevno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Jmehc BuildFromRow(DataRow row)
      {
         var returnRecord = Jmehc.BuildJmehcFromRow(row);
         returnRecord = this.BuildExtraFromRow<Jmehc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Jmehc record)
      {
         Jmehc.UpdateRowFromJmehc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Jmehc Insert(Jmehc record)
      {
         DataRow row = this.dataSet.ttbljmehc.NewttbljmehcRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbljmehc.AddttbljmehcRow((pdsjmehcDataSet.ttbljmehcRow)row);
         this.SaveChanges();
         return this.dataSet.ttbljmehc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbljmehc.Rows[0]) : null;
      }
  

      public Jmehc Update(Jmehc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbljmehc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbljmehc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Jmehc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbljmehc.NewttbljmehcRow();
            Jmehc.BuildMinimalRow(ref row, record);
            this.dataSet.ttbljmehc.AddttbljmehcRow((pdsjmehcDataSet.ttbljmehcRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Jmehc() { rowID = selectRowId }).ToList();
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
  