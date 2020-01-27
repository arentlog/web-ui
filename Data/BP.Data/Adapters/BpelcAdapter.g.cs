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
    
namespace Infor.Sxe.BP.Data.Adapters
{
   using com.infor.sxproxy.bpproxy;
   using com.infor.sxproxy.bpproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsbpelc;

   public partial class BpelcAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsbpelc";
      private BPProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> bpelcTableControlKey;
		
      private pdsbpelcDataSet dataSet;
        
      public BpelcAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new BPProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsbpelcDataSet() { DataSetName = DataSetName };
            this.bpelcTableControlKey = this.dataSet.ttblbpelc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.bpelcTableControlKey))
            {
               this.CreateTableControlParameters(this.bpelcTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in BpelcAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Bpelcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poBpelcproxy = this.proxyAppObject.CreatePO_bpelcproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poBpelcproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Bpelcproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.bpelcTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.bpelcTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Bpelcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poBpelcproxy = this.proxyAppObject.CreatePO_bpelcproxy())
               {
                  this.SetRequiredContextParameters();
                  poBpelcproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Bpelcproxy - After Call");
      }
   

      public Bpelc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Bpelc bpelc = null;
         if (row != null)
         {
             bpelc = this.BuildFromRow(row);
         }
         return bpelc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(bpelc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblbpelc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Bpelc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(bpelc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Bpelc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblbpelc.AsEnumerable().SingleOrDefault();
         Bpelc bpelc = null;
         if (row != null)
         {
             bpelc = this.BuildFromRow(row);
         }
         return bpelc;
      }
	  
	  
      public IEnumerable<Bpelc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("bpelc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Bpelc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblbpelc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Bpelc Get(int cono, string bpid, int revno, int lineno, string convertty, int convertno, int ordersuf, int oelineno, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("bpelc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(bpid)) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.bpid = '{0}'", bpid);
         }
         if (revno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.revno = {0}", revno);
         }
         if (lineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.lineno = {0}", lineno);
         }
         if (!string.IsNullOrEmpty(convertty)) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.convertty = '{0}'", convertty);
         }
         if (convertno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.convertno = {0}", convertno);
         }
         if (ordersuf != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.ordersuf = {0}", ordersuf);
         }
         if (oelineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.oelineno = {0}", oelineno);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Bpelc> GetListByBpelcoe(int cono, string convertty, int convertno, int oelineno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("bpelc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(convertty)) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.convertty = '{0}'", convertty);
         }
         if (convertno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.convertno = {0}", convertno);
         }
         if (oelineno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND bpelc.oelineno = {0}", oelineno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Bpelc BuildFromRow(DataRow row)
      {
         var returnRecord = Bpelc.BuildBpelcFromRow(row);
         returnRecord = this.BuildExtraFromRow<Bpelc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Bpelc record)
      {
         Bpelc.UpdateRowFromBpelc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Bpelc Insert(Bpelc record)
      {
         DataRow row = this.dataSet.ttblbpelc.NewttblbpelcRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblbpelc.AddttblbpelcRow((pdsbpelcDataSet.ttblbpelcRow)row);
         this.SaveChanges();
         return this.dataSet.ttblbpelc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbpelc.Rows[0]) : null;
      }
  

      public Bpelc Update(Bpelc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblbpelc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbpelc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Bpelc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblbpelc.NewttblbpelcRow();
            Bpelc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblbpelc.AddttblbpelcRow((pdsbpelcDataSet.ttblbpelcRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Bpelc() { rowID = selectRowId }).ToList();
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
  