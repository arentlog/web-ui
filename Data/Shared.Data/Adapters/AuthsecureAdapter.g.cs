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
   using Models.Pdsauthsecure;

   public partial class AuthsecureAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsauthsecure";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> authsecureTableControlKey;
		
      private pdsauthsecureDataSet dataSet;
        
      public AuthsecureAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsauthsecureDataSet() { DataSetName = DataSetName };
            this.authsecureTableControlKey = this.dataSet.ttblauthsecure.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.authsecureTableControlKey))
            {
               this.CreateTableControlParameters(this.authsecureTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in AuthsecureAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Authsecureproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poAuthsecureproxy = this.proxyAppObject.CreatePO_authsecureproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poAuthsecureproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Authsecureproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.authsecureTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.authsecureTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Authsecureproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poAuthsecureproxy = this.proxyAppObject.CreatePO_authsecureproxy())
               {
                  this.SetRequiredContextParameters();
                  poAuthsecureproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Authsecureproxy - After Call");
      }
   

      public Authsecure GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Authsecure authsecure = null;
         if (row != null)
         {
             authsecure = this.BuildFromRow(row);
         }
         return authsecure;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(authsecure) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblauthsecure.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Authsecure> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(authsecure)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Authsecure Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblauthsecure.AsEnumerable().SingleOrDefault();
         Authsecure authsecure = null;
         if (row != null)
         {
             authsecure = this.BuildFromRow(row);
         }
         return authsecure;
      }
	  
	  
      public IEnumerable<Authsecure> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("authsecure.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Authsecure> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblauthsecure.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Authsecure Get(int cono, string oper2, string ourproc, string key1, string key2, string mode, string transtype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("authsecure.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(oper2)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.oper2 = '{0}'", oper2);
         }
         if (!string.IsNullOrEmpty(ourproc)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.ourproc = '{0}'", ourproc);
         }
         if (!string.IsNullOrEmpty(key1)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.key1 = '{0}'", key1);
         }
         if (!string.IsNullOrEmpty(key2)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.key2 = '{0}'", key2);
         }
         if (!string.IsNullOrEmpty(mode)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.mode = '{0}'", mode);
         }
         if (!string.IsNullOrEmpty(transtype)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.transtype = '{0}'", transtype);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Authsecure> GetListBySecurecd(int cono, int securcd, string ourproc, string key1, string key2, string mode, string transtype, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("authsecure.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (securcd != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.securcd = {0}", securcd);
         }
         if (!string.IsNullOrEmpty(ourproc)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.ourproc = '{0}'", ourproc);
         }
         if (!string.IsNullOrEmpty(key1)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.key1 = '{0}'", key1);
         }
         if (!string.IsNullOrEmpty(key2)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.key2 = '{0}'", key2);
         }
         if (!string.IsNullOrEmpty(mode)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.mode = '{0}'", mode);
         }
         if (!string.IsNullOrEmpty(transtype)) 
         {
             sb.AppendFormatWithEscape(" AND authsecure.transtype = '{0}'", transtype);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Authsecure BuildFromRow(DataRow row)
      {
         var returnRecord = Authsecure.BuildAuthsecureFromRow(row);
         returnRecord = this.BuildExtraFromRow<Authsecure>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Authsecure record)
      {
         Authsecure.UpdateRowFromAuthsecure(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Authsecure Insert(Authsecure record)
      {
         DataRow row = this.dataSet.ttblauthsecure.NewttblauthsecureRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblauthsecure.AddttblauthsecureRow((pdsauthsecureDataSet.ttblauthsecureRow)row);
         this.SaveChanges();
         return this.dataSet.ttblauthsecure.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblauthsecure.Rows[0]) : null;
      }
  

      public Authsecure Update(Authsecure record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblauthsecure.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblauthsecure.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Authsecure record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblauthsecure.NewttblauthsecureRow();
            Authsecure.BuildMinimalRow(ref row, record);
            this.dataSet.ttblauthsecure.AddttblauthsecureRow((pdsauthsecureDataSet.ttblauthsecureRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Authsecure() { rowID = selectRowId }).ToList();
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
  