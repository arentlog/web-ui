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
   using Models.Pdssapb;

   public partial class SapbAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdssapb";
      private SAProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> sapbTableControlKey;
		
      private pdssapbDataSet dataSet;
        
      public SapbAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SAProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdssapbDataSet() { DataSetName = DataSetName };
            this.sapbTableControlKey = this.dataSet.ttblsapb.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.sapbTableControlKey))
            {
               this.CreateTableControlParameters(this.sapbTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in SapbAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Sapbproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poSapbproxy = this.proxyAppObject.CreatePO_sapbproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poSapbproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Sapbproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.sapbTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.sapbTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Sapbproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poSapbproxy = this.proxyAppObject.CreatePO_sapbproxy())
               {
                  this.SetRequiredContextParameters();
                  poSapbproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Sapbproxy - After Call");
      }
   

      public Sapb GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Sapb sapb = null;
         if (row != null)
         {
             sapb = this.BuildFromRow(row);
         }
         return sapb;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(sapb) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblsapb.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Sapb> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(sapb)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Sapb Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblsapb.AsEnumerable().SingleOrDefault();
         Sapb sapb = null;
         if (row != null)
         {
             sapb = this.BuildFromRow(row);
         }
         return sapb;
      }
	  
	  
      public IEnumerable<Sapb> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("sapb.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sapb> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblsapb.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Sapb Get(int cono, string reportnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("sapb.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND sapb.reportnm = '{0}'", reportnm);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Sapb> GetListByBatch(DateTime? startdt, int starttm, int priority, string batchnm, string currproc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape("sapb.startdt = '{0}'", startdt);
         }
         if (starttm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapb.starttm = {0}", starttm);
         }
         if (priority != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapb.priority = {0}", priority);
         }
         if (!string.IsNullOrEmpty(batchnm)) 
         {
             sb.AppendFormatWithEscape(" AND sapb.batchnm = '{0}'", batchnm);
         }
         if (!string.IsNullOrEmpty(currproc)) 
         {
             sb.AppendFormatWithEscape(" AND sapb.currproc = '{0}'", currproc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sapb> GetListByCurrproc(string currproc, string reportnm, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(currproc)) 
         {
             sb.AppendFormatWithEscape("sapb.currproc = '{0}'", currproc);
         }
         if (!string.IsNullOrEmpty(reportnm)) 
         {
             sb.AppendFormatWithEscape(" AND sapb.reportnm = '{0}'", reportnm);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sapb> GetListByGroup(string batchnm, int priority, DateTime? startdt, int starttm, string currproc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(batchnm)) 
         {
             sb.AppendFormatWithEscape("sapb.batchnm = '{0}'", batchnm);
         }
         if (priority != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapb.priority = {0}", priority);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND sapb.startdt = '{0}'", startdt);
         }
         if (starttm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapb.starttm = {0}", starttm);
         }
         if (!string.IsNullOrEmpty(currproc)) 
         {
             sb.AppendFormatWithEscape(" AND sapb.currproc = '{0}'", currproc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Sapb> GetListByRptmgr(string inusecd, bool demandfl, string queueName, DateTime? startdt, int starttm, int priority, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(inusecd)) 
         {
             sb.AppendFormatWithEscape("sapb.inusecd = '{0}'", inusecd);
         }
         sb.AppendFormatWithEscape(" AND sapb.demandfl = {0}", demandfl);
         if (!string.IsNullOrEmpty(queueName)) 
         {
             sb.AppendFormatWithEscape(" AND sapb.queue_name = '{0}'", queueName);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND sapb.startdt = '{0}'", startdt);
         }
         if (starttm != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapb.starttm = {0}", starttm);
         }
         if (priority != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND sapb.priority = {0}", priority);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Sapb BuildFromRow(DataRow row)
      {
         var returnRecord = Sapb.BuildSapbFromRow(row);
         returnRecord = this.BuildExtraFromRow<Sapb>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Sapb record)
      {
         Sapb.UpdateRowFromSapb(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Sapb Insert(Sapb record)
      {
         DataRow row = this.dataSet.ttblsapb.NewttblsapbRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblsapb.AddttblsapbRow((pdssapbDataSet.ttblsapbRow)row);
         this.SaveChanges();
         return this.dataSet.ttblsapb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsapb.Rows[0]) : null;
      }
  

      public Sapb Update(Sapb record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblsapb.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblsapb.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Sapb record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblsapb.NewttblsapbRow();
            Sapb.BuildMinimalRow(ref row, record);
            this.dataSet.ttblsapb.AddttblsapbRow((pdssapbDataSet.ttblsapbRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Sapb() { rowID = selectRowId }).ToList();
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
  