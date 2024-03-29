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
   using Models.Pdsjmelp;

   public partial class JmelpAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsjmelp";
      private JMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> jmelpTableControlKey;
		
      private pdsjmelpDataSet dataSet;
        
      public JmelpAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new JMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsjmelpDataSet() { DataSetName = DataSetName };
            this.jmelpTableControlKey = this.dataSet.ttbljmelp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.jmelpTableControlKey))
            {
               this.CreateTableControlParameters(this.jmelpTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in JmelpAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Jmelpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poJmelpproxy = this.proxyAppObject.CreatePO_jmelpproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poJmelpproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Jmelpproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.jmelpTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.jmelpTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Jmelpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poJmelpproxy = this.proxyAppObject.CreatePO_jmelpproxy())
               {
                  this.SetRequiredContextParameters();
                  poJmelpproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Jmelpproxy - After Call");
      }
   

      public Jmelp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Jmelp jmelp = null;
         if (row != null)
         {
             jmelp = this.BuildFromRow(row);
         }
         return jmelp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(jmelp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttbljmelp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Jmelp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(jmelp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Jmelp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttbljmelp.AsEnumerable().SingleOrDefault();
         Jmelp jmelp = null;
         if (row != null)
         {
             jmelp = this.BuildFromRow(row);
         }
         return jmelp;
      }
	  
	  
      public IEnumerable<Jmelp> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("jmelp.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Jmelp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttbljmelp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Jmelp Get(int cono, string jobid, int jobrevno, int lineno, DateTime? startdt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmelp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.jobrevno = {0}", jobrevno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.lineno = {0}", lineno);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.startdt = '{0}'", startdt);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Jmelp> GetListByLineprod(int cono, string jobid, int jobrevno, string prod, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmelp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.jobrevno = {0}", jobrevno);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.prod = '{0}'", prod);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Jmelp> GetListByProd(int cono, string prod, string jobid, int jobrevno, int lineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("jmelp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.prod = '{0}'", prod);
         }
         if (!string.IsNullOrEmpty(jobid)) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.jobid = '{0}'", jobid);
         }
         if (jobrevno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.jobrevno = {0}", jobrevno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND jmelp.lineno = {0}", lineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Jmelp BuildFromRow(DataRow row)
      {
         var returnRecord = Jmelp.BuildJmelpFromRow(row);
         returnRecord = this.BuildExtraFromRow<Jmelp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Jmelp record)
      {
         Jmelp.UpdateRowFromJmelp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Jmelp Insert(Jmelp record)
      {
         DataRow row = this.dataSet.ttbljmelp.NewttbljmelpRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttbljmelp.AddttbljmelpRow((pdsjmelpDataSet.ttbljmelpRow)row);
         this.SaveChanges();
         return this.dataSet.ttbljmelp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbljmelp.Rows[0]) : null;
      }
  

      public Jmelp Update(Jmelp record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttbljmelp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttbljmelp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Jmelp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttbljmelp.NewttbljmelpRow();
            Jmelp.BuildMinimalRow(ref row, record);
            this.dataSet.ttbljmelp.AddttbljmelpRow((pdsjmelpDataSet.ttbljmelpRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Jmelp() { rowID = selectRowId }).ToList();
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
  