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
   using Models.PdsemailLinks;

   public partial class EmailLinksAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsemailLinks";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> emailLinksTableControlKey;
		
      private pdsemailLinksDataSet dataSet;
        
      public EmailLinksAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsemailLinksDataSet() { DataSetName = DataSetName };
            this.emailLinksTableControlKey = this.dataSet.ttblemailLinks.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.emailLinksTableControlKey))
            {
               this.CreateTableControlParameters(this.emailLinksTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in EmailLinksAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - EmailLinksproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poEmailLinksproxy = this.proxyAppObject.CreatePO_emailLinksproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poEmailLinksproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - EmailLinksproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.emailLinksTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.emailLinksTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - EmailLinksproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poEmailLinksproxy = this.proxyAppObject.CreatePO_emailLinksproxy())
               {
                  this.SetRequiredContextParameters();
                  poEmailLinksproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - EmailLinksproxy - After Call");
      }
   

      public EmailLinks GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         EmailLinks emailLinks = null;
         if (row != null)
         {
             emailLinks = this.BuildFromRow(row);
         }
         return emailLinks;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(email-links) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblemailLinks.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<EmailLinks> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(email-links)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected EmailLinks Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblemailLinks.AsEnumerable().SingleOrDefault();
         EmailLinks emailLinks = null;
         if (row != null)
         {
             emailLinks = this.BuildFromRow(row);
         }
         return emailLinks;
      }
	  
	  

      public IEnumerable<EmailLinks> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblemailLinks.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public EmailLinks Get(int cono, string doctype, string primarykey, string secondarykey, decimal contactid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("email-links.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(doctype)) 
         {
             sb.AppendFormatWithEscape(" AND email-links.doctype = '{0}'", doctype);
         }
         if (!string.IsNullOrEmpty(primarykey)) 
         {
             sb.AppendFormatWithEscape(" AND email-links.primarykey = '{0}'", primarykey);
         }
         if (!string.IsNullOrEmpty(secondarykey)) 
         {
             sb.AppendFormatWithEscape(" AND email-links.secondarykey = '{0}'", secondarykey);
         }
         if (contactid != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND email-links.contactid = {0}", contactid);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<EmailLinks> GetListByContacts(int cono, decimal contactid, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("email-links.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (contactid != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND email-links.contactid = {0}", contactid);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public EmailLinks BuildFromRow(DataRow row)
      {
         var returnRecord = EmailLinks.BuildEmailLinksFromRow(row);
         returnRecord = this.BuildExtraFromRow<EmailLinks>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, EmailLinks record)
      {
         EmailLinks.UpdateRowFromEmailLinks(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public EmailLinks Insert(EmailLinks record)
      {
         DataRow row = this.dataSet.ttblemailLinks.NewttblemailLinksRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblemailLinks.AddttblemailLinksRow((pdsemailLinksDataSet.ttblemailLinksRow)row);
         this.SaveChanges();
         return this.dataSet.ttblemailLinks.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblemailLinks.Rows[0]) : null;
      }
  

      public EmailLinks Update(EmailLinks record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblemailLinks.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblemailLinks.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(EmailLinks record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblemailLinks.NewttblemailLinksRow();
            EmailLinks.BuildMinimalRow(ref row, record);
            this.dataSet.ttblemailLinks.AddttblemailLinksRow((pdsemailLinksDataSet.ttblemailLinksRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new EmailLinks() { rowID = selectRowId }).ToList();
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
  