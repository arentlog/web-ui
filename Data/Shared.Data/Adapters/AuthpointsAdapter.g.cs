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
    
namespace Infor.Sxe.Shared.Data.Adapters
{
   using com.infor.sxproxy.sharedproxy;
   using com.infor.sxproxy.sharedproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsauthpoints;

   public partial class AuthpointsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsauthpoints";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> authpointsTableControlKey;
		
      private pdsauthpointsDataSet dataSet;
        
      public AuthpointsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsauthpointsDataSet() { DataSetName = DataSetName };
            this.authpointsTableControlKey = this.dataSet.ttblauthpoints.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.authpointsTableControlKey))
            {
               this.CreateTableControlParameters(this.authpointsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AuthpointsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Authpointsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poAuthpointsproxy = this.proxyAppObject.CreatePO_authpointsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poAuthpointsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Authpointsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.authpointsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.authpointsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Authpointsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAuthpointsproxy = this.proxyAppObject.CreatePO_authpointsproxy())
               {
                  this.SetRequiredContextParameters();
                  poAuthpointsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Authpointsproxy - After Call");
      }
   

      public Authpoints GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Authpoints authpoints = null;
         if (row != null)
         {
             authpoints = this.BuildFromRow(row);
         }
         return authpoints;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(authpoints) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblauthpoints.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Authpoints> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(authpoints)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Authpoints Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblauthpoints.AsEnumerable().SingleOrDefault();
         Authpoints authpoints = null;
         if (row != null)
         {
             authpoints = this.BuildFromRow(row);
         }
         return authpoints;
      }
	  
	  

      public IEnumerable<Authpoints> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblauthpoints.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Authpoints Get(string ourproc, string key1, string key2, string mode, string transtype, string trmgrlang, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         if (!string.IsNullOrEmpty(ourproc)) 
         {
             sb.AppendFormatWithEscape("authpoints.ourproc = '{0}'", ourproc);
         }
         if (!string.IsNullOrEmpty(key1)) 
         {
             sb.AppendFormatWithEscape(" AND authpoints.key1 = '{0}'", key1);
         }
         if (!string.IsNullOrEmpty(key2)) 
         {
             sb.AppendFormatWithEscape(" AND authpoints.key2 = '{0}'", key2);
         }
         if (!string.IsNullOrEmpty(mode)) 
         {
             sb.AppendFormatWithEscape(" AND authpoints.mode = '{0}'", mode);
         }
         if (!string.IsNullOrEmpty(transtype)) 
         {
             sb.AppendFormatWithEscape(" AND authpoints.transtype = '{0}'", transtype);
         }
         if (!string.IsNullOrEmpty(trmgrlang)) 
         {
             sb.AppendFormatWithEscape(" AND authpoints.trmgrlang = '{0}'", trmgrlang);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public Authpoints BuildFromRow(DataRow row)
      {
         var returnRecord = Authpoints.BuildAuthpointsFromRow(row);
         returnRecord = this.BuildExtraFromRow<Authpoints>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Authpoints record)
      {
         Authpoints.UpdateRowFromAuthpoints(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Authpoints Insert(Authpoints record)
      {
         DataRow row = this.dataSet.ttblauthpoints.NewttblauthpointsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblauthpoints.AddttblauthpointsRow((pdsauthpointsDataSet.ttblauthpointsRow)row);
         this.SaveChanges();
         return this.dataSet.ttblauthpoints.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblauthpoints.Rows[0]) : null;
      }
  

      public Authpoints Update(Authpoints record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblauthpoints.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblauthpoints.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Authpoints record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblauthpoints.NewttblauthpointsRow();
            Authpoints.BuildMinimalRow(ref row, record);
            this.dataSet.ttblauthpoints.AddttblauthpointsRow((pdsauthpointsDataSet.ttblauthpointsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Authpoints() { rowID = selectRowId }).ToList();
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
  