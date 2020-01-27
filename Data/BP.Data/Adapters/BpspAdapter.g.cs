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
   using Models.Pdsbpsp;

   public partial class BpspAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsbpsp";
      private BPProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> bpspTableControlKey;
		
      private pdsbpspDataSet dataSet;
        
      public BpspAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new BPProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsbpspDataSet() { DataSetName = DataSetName };
            this.bpspTableControlKey = this.dataSet.ttblbpsp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.bpspTableControlKey))
            {
               this.CreateTableControlParameters(this.bpspTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in BpspAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Bpspproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poBpspproxy = this.proxyAppObject.CreatePO_bpspproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poBpspproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Bpspproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.bpspTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.bpspTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Bpspproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poBpspproxy = this.proxyAppObject.CreatePO_bpspproxy())
               {
                  this.SetRequiredContextParameters();
                  poBpspproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Bpspproxy - After Call");
      }
   

      public Bpsp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Bpsp bpsp = null;
         if (row != null)
         {
             bpsp = this.BuildFromRow(row);
         }
         return bpsp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(bpsp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblbpsp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Bpsp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(bpsp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Bpsp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblbpsp.AsEnumerable().SingleOrDefault();
         Bpsp bpsp = null;
         if (row != null)
         {
             bpsp = this.BuildFromRow(row);
         }
         return bpsp;
      }
	  
	  
      public IEnumerable<Bpsp> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("bpsp.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Bpsp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblbpsp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Bpsp Get(int cono, string phaseid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("bpsp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(phaseid)) 
         {
             sb.AppendFormatWithEscape(" AND bpsp.phaseid = '{0}'", phaseid);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Bpsp BuildFromRow(DataRow row)
      {
         var returnRecord = Bpsp.BuildBpspFromRow(row);
         returnRecord = this.BuildExtraFromRow<Bpsp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Bpsp record)
      {
         Bpsp.UpdateRowFromBpsp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Bpsp Insert(Bpsp record)
      {
         DataRow row = this.dataSet.ttblbpsp.NewttblbpspRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblbpsp.AddttblbpspRow((pdsbpspDataSet.ttblbpspRow)row);
         this.SaveChanges();
         return this.dataSet.ttblbpsp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbpsp.Rows[0]) : null;
      }
  

      public Bpsp Update(Bpsp record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblbpsp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblbpsp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Bpsp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblbpsp.NewttblbpspRow();
            Bpsp.BuildMinimalRow(ref row, record);
            this.dataSet.ttblbpsp.AddttblbpspRow((pdsbpspDataSet.ttblbpspRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Bpsp() { rowID = selectRowId }).ToList();
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
  