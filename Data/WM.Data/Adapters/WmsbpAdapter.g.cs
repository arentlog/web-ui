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
    
namespace Infor.Sxe.WM.Data.Adapters
{
   using com.infor.sxproxy.wmproxy;
   using com.infor.sxproxy.wmproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdswmsbp;

   public partial class WmsbpAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdswmsbp";
      private WMProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> wmsbpTableControlKey;
		
      private pdswmsbpDataSet dataSet;
        
      public WmsbpAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new WMProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdswmsbpDataSet() { DataSetName = DataSetName };
            this.wmsbpTableControlKey = this.dataSet.ttblwmsbp.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.wmsbpTableControlKey))
            {
               this.CreateTableControlParameters(this.wmsbpTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in WmsbpAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Wmsbpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poWmsbpproxy = this.proxyAppObject.CreatePO_wmsbpproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poWmsbpproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Wmsbpproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.wmsbpTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.wmsbpTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Wmsbpproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poWmsbpproxy = this.proxyAppObject.CreatePO_wmsbpproxy())
               {
                  this.SetRequiredContextParameters();
                  poWmsbpproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Wmsbpproxy - After Call");
      }
   

      public Wmsbp GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Wmsbp wmsbp = null;
         if (row != null)
         {
             wmsbp = this.BuildFromRow(row);
         }
         return wmsbp;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(wmsbp) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblwmsbp.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Wmsbp> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(wmsbp)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Wmsbp Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblwmsbp.AsEnumerable().SingleOrDefault();
         Wmsbp wmsbp = null;
         if (row != null)
         {
             wmsbp = this.BuildFromRow(row);
         }
         return wmsbp;
      }
	  
	  
      public IEnumerable<Wmsbp> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("wmsbp.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Wmsbp> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblwmsbp.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Wmsbp Get(int cono, string whse, string binloc, string prod, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wmsbp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.binloc = '{0}'", binloc);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.prod = '{0}'", prod);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Wmsbp> GetListByWmfifo(int cono, string whse, string prod, DateTime? lstoredt, string binloc, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("wmsbp.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(whse)) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.whse = '{0}'", whse);
         }
         if (!string.IsNullOrEmpty(prod)) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.prod = '{0}'", prod);
         }
         if (lstoredt != null) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.lstoredt = '{0}'", lstoredt);
         }
         if (!string.IsNullOrEmpty(binloc)) 
         {
             sb.AppendFormatWithEscape(" AND wmsbp.binloc = '{0}'", binloc);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Wmsbp BuildFromRow(DataRow row)
      {
         var returnRecord = Wmsbp.BuildWmsbpFromRow(row);
         returnRecord = this.BuildExtraFromRow<Wmsbp>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Wmsbp record)
      {
         Wmsbp.UpdateRowFromWmsbp(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Wmsbp Insert(Wmsbp record)
      {
         DataRow row = this.dataSet.ttblwmsbp.NewttblwmsbpRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblwmsbp.AddttblwmsbpRow((pdswmsbpDataSet.ttblwmsbpRow)row);
         this.SaveChanges();
         return this.dataSet.ttblwmsbp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblwmsbp.Rows[0]) : null;
      }
  

      public Wmsbp Update(Wmsbp record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblwmsbp.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblwmsbp.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Wmsbp record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblwmsbp.NewttblwmsbpRow();
            Wmsbp.BuildMinimalRow(ref row, record);
            this.dataSet.ttblwmsbp.AddttblwmsbpRow((pdswmsbpDataSet.ttblwmsbpRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Wmsbp() { rowID = selectRowId }).ToList();
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
  