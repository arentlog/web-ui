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
    
namespace Infor.Sxe.PV.Data.Adapters
{
   using com.infor.sxproxy.pvproxy;
   using com.infor.sxproxy.pvproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.PdspvSecure;

   public partial class PvSecureAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdspv_secure";
      private PVProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> pvSecureTableControlKey;
		
      private pdspv_secureDataSet dataSet;
        
      public PvSecureAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new PVProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdspv_secureDataSet() { DataSetName = DataSetName };
            this.pvSecureTableControlKey = this.dataSet.ttblpv_secure.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.pvSecureTableControlKey))
            {
               this.CreateTableControlParameters(this.pvSecureTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in PvSecureAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Pv_secureproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poPv_secureproxy = this.proxyAppObject.CreatePO_pv_secureproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poPv_secureproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Pv_secureproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.pvSecureTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.pvSecureTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Pv_secureproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poPv_secureproxy = this.proxyAppObject.CreatePO_pv_secureproxy())
               {
                  this.SetRequiredContextParameters();
                  poPv_secureproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Pv_secureproxy - After Call");
      }
   

      public PvSecure GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         PvSecure pvSecure = null;
         if (row != null)
         {
             pvSecure = this.BuildFromRow(row);
         }
         return pvSecure;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(pv_secure) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblpv_secure.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<PvSecure> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(pv_secure)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected PvSecure Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblpv_secure.AsEnumerable().SingleOrDefault();
         PvSecure pvSecure = null;
         if (row != null)
         {
             pvSecure = this.BuildFromRow(row);
         }
         return pvSecure;
      }
	  
	  
      public IEnumerable<PvSecure> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("pv_secure.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<PvSecure> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblpv_secure.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public PvSecure Get(int cono, string oper2, string functionName, string menuSet, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("pv_secure.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND pv_secure.oper2 = '{0}'", oper2);
         }
         if (!string.IsNullOrEmpty(functionName)) 
         {
             sb.AppendFormatWithEscape(" AND pv_secure.FunctionName = '{0}'", functionName);
         }
         if (!string.IsNullOrEmpty(menuSet)) 
         {
             sb.AppendFormatWithEscape(" AND pv_secure.MenuSet = '{0}'", menuSet);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<PvSecure> GetListByPvFunction(string menuSet, string functionName, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(menuSet)) 
         {
             sb.AppendFormatWithEscape("pv_secure.MenuSet = '{0}'", menuSet);
         }
         if (!string.IsNullOrEmpty(functionName)) 
         {
             sb.AppendFormatWithEscape(" AND pv_secure.FunctionName = '{0}'", functionName);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public PvSecure BuildFromRow(DataRow row)
      {
         var returnRecord = PvSecure.BuildPvSecureFromRow(row);
         returnRecord = this.BuildExtraFromRow<PvSecure>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, PvSecure record)
      {
         PvSecure.UpdateRowFromPvSecure(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public PvSecure Insert(PvSecure record)
      {
         DataRow row = this.dataSet.ttblpv_secure.Newttblpv_secureRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblpv_secure.Addttblpv_secureRow((pdspv_secureDataSet.ttblpv_secureRow)row);
         this.SaveChanges();
         return this.dataSet.ttblpv_secure.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_secure.Rows[0]) : null;
      }
  

      public PvSecure Update(PvSecure record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblpv_secure.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblpv_secure.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(PvSecure record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblpv_secure.Newttblpv_secureRow();
            PvSecure.BuildMinimalRow(ref row, record);
            this.dataSet.ttblpv_secure.Addttblpv_secureRow((pdspv_secureDataSet.ttblpv_secureRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new PvSecure() { rowID = selectRowId }).ToList();
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
  