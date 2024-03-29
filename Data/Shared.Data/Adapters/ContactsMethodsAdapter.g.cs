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
   using Models.PdscontactsMethods;

   public partial class ContactsMethodsAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdscontactsMethods";
      private SharedProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> contactsMethodsTableControlKey;
		
      private pdscontactsMethodsDataSet dataSet;
        
      public ContactsMethodsAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new SharedProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdscontactsMethodsDataSet() { DataSetName = DataSetName };
            this.contactsMethodsTableControlKey = this.dataSet.ttblcontactsMethods.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.contactsMethodsTableControlKey))
            {
               this.CreateTableControlParameters(this.contactsMethodsTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in ContactsMethodsAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - ContactsMethodsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poContactsMethodsproxy = this.proxyAppObject.CreatePO_contactsMethodsproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poContactsMethodsproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - ContactsMethodsproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.contactsMethodsTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.contactsMethodsTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - ContactsMethodsproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poContactsMethodsproxy = this.proxyAppObject.CreatePO_contactsMethodsproxy())
               {
                  this.SetRequiredContextParameters();
                  poContactsMethodsproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - ContactsMethodsproxy - After Call");
      }
   

      public ContactsMethods GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         ContactsMethods contactsMethods = null;
         if (row != null)
         {
             contactsMethods = this.BuildFromRow(row);
         }
         return contactsMethods;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(contacts-methods) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblcontactsMethods.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<ContactsMethods> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(contacts-methods)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected ContactsMethods Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblcontactsMethods.AsEnumerable().SingleOrDefault();
         ContactsMethods contactsMethods = null;
         if (row != null)
         {
             contactsMethods = this.BuildFromRow(row);
         }
         return contactsMethods;
      }
	  
	  

      public IEnumerable<ContactsMethods> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblcontactsMethods.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public ContactsMethods Get(int cono, decimal contactid, string methodkey, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("contacts-methods.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (contactid != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.contactid = {0}", contactid);
         }
         if (!string.IsNullOrEmpty(methodkey)) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.methodkey = '{0}'", methodkey);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<ContactsMethods> GetListByContacttype(int cono, decimal contactid, string methodtype, bool primaryfl, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("contacts-methods.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (contactid != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.contactid = {0}", contactid);
         }
         if (!string.IsNullOrEmpty(methodtype)) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.methodtype = '{0}'", methodtype);
         }
         sb.AppendFormatWithEscape(" AND contacts-methods.primaryfl = {0}", primaryfl);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<ContactsMethods> GetListByMethodtype(int cono, string methodtype, string methodkey, decimal contactid, int seqno, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("contacts-methods.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(methodtype)) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.methodtype = '{0}'", methodtype);
         }
         if (!string.IsNullOrEmpty(methodkey)) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.methodkey = '{0}'", methodkey);
         }
         if (contactid != decimal.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.contactid = {0}", contactid);
         }
         if (seqno != int.MinValue) 
         {
             sb.AppendFormatWithEscape(" AND contacts-methods.seqno = {0}", seqno);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public ContactsMethods BuildFromRow(DataRow row)
      {
         var returnRecord = ContactsMethods.BuildContactsMethodsFromRow(row);
         returnRecord = this.BuildExtraFromRow<ContactsMethods>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, ContactsMethods record)
      {
         ContactsMethods.UpdateRowFromContactsMethods(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public ContactsMethods Insert(ContactsMethods record)
      {
         DataRow row = this.dataSet.ttblcontactsMethods.NewttblcontactsMethodsRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblcontactsMethods.AddttblcontactsMethodsRow((pdscontactsMethodsDataSet.ttblcontactsMethodsRow)row);
         this.SaveChanges();
         return this.dataSet.ttblcontactsMethods.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcontactsMethods.Rows[0]) : null;
      }
  

      public ContactsMethods Update(ContactsMethods record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblcontactsMethods.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblcontactsMethods.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(ContactsMethods record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblcontactsMethods.NewttblcontactsMethodsRow();
            ContactsMethods.BuildMinimalRow(ref row, record);
            this.dataSet.ttblcontactsMethods.AddttblcontactsMethodsRow((pdscontactsMethodsDataSet.ttblcontactsMethodsRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new ContactsMethods() { rowID = selectRowId }).ToList();
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
  