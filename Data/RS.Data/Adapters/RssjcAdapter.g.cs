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
    
namespace Infor.Sxe.RS.Data.Adapters
{
   using com.infor.sxproxy.rsproxy;
   using com.infor.sxproxy.rsproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsrssjc;

   public partial class RssjcAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsrssjc";
      private RSProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> rssjcTableControlKey;
		
      private pdsrssjcDataSet dataSet;
        
      public RssjcAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new RSProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsrssjcDataSet() { DataSetName = DataSetName };
            this.rssjcTableControlKey = this.dataSet.ttblrssjc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.rssjcTableControlKey))
            {
               this.CreateTableControlParameters(this.rssjcTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in RssjcAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Rssjcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poRssjcproxy = this.proxyAppObject.CreatePO_rssjcproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poRssjcproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Rssjcproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.rssjcTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.rssjcTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Rssjcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poRssjcproxy = this.proxyAppObject.CreatePO_rssjcproxy())
               {
                  this.SetRequiredContextParameters();
                  poRssjcproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Rssjcproxy - After Call");
      }
   

      public Rssjc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Rssjc rssjc = null;
         if (row != null)
         {
             rssjc = this.BuildFromRow(row);
         }
         return rssjc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(rssjc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblrssjc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Rssjc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(rssjc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Rssjc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblrssjc.AsEnumerable().SingleOrDefault();
         Rssjc rssjc = null;
         if (row != null)
         {
             rssjc = this.BuildFromRow(row);
         }
         return rssjc;
      }
	  
	  
      public IEnumerable<Rssjc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("rssjc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Rssjc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblrssjc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Rssjc Get(string groupnm, int posno, string componentnm, int cono, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape("rssjc.groupnm = '{0}'", groupnm);
         }
         if (posno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND rssjc.posno = {0}", posno);
         }
         if (!string.IsNullOrEmpty(componentnm)) 
         {
             sb.AppendFormatWithEscape(" AND rssjc.componentnm = '{0}'", componentnm);
         }
         sb.AppendFormatWithEscape(" AND rssjc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Rssjc> GetListByComp(string componentnm, int cono, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(componentnm)) 
         {
             sb.AppendFormatWithEscape("rssjc.componentnm = '{0}'", componentnm);
         }
         sb.AppendFormatWithEscape(" AND rssjc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Rssjc> GetListByPriority(string groupnm, int posno, int priority, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(groupnm)) 
         {
             sb.AppendFormatWithEscape("rssjc.groupnm = '{0}'", groupnm);
         }
         if (posno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND rssjc.posno = {0}", posno);
         }
         if (priority != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND rssjc.priority = {0}", priority);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Rssjc> GetListByStatus(string inusety, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(inusety)) 
         {
             sb.AppendFormatWithEscape("rssjc.inusety = '{0}'", inusety);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Rssjc BuildFromRow(DataRow row)
      {
         var returnRecord = Rssjc.BuildRssjcFromRow(row);
         returnRecord = this.BuildExtraFromRow<Rssjc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Rssjc record)
      {
         Rssjc.UpdateRowFromRssjc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Rssjc Insert(Rssjc record)
      {
         DataRow row = this.dataSet.ttblrssjc.NewttblrssjcRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblrssjc.AddttblrssjcRow((pdsrssjcDataSet.ttblrssjcRow)row);
         this.SaveChanges();
         return this.dataSet.ttblrssjc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrssjc.Rows[0]) : null;
      }
  

      public Rssjc Update(Rssjc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblrssjc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblrssjc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Rssjc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblrssjc.NewttblrssjcRow();
            Rssjc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblrssjc.AddttblrssjcRow((pdsrssjcDataSet.ttblrssjcRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Rssjc() { rowID = selectRowId }).ToList();
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
  