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
    
namespace Infor.Sxe.IC.Data.Adapters
{
   using com.infor.sxproxy.icproxy;
   using com.infor.sxproxy.icproxy.StrongTypesNS;
    
   using Models.PdsContext;
   using Models.Pdsicsprc;

   public partial class IcsprcAdapter : AdapterBase<pdsContextDataSet>
   {
      private const string DataSetName = "pdsicsprc";
      private ICProxyAppObject proxyAppObject;
      private readonly Tuple<string, string> icsprcTableControlKey;
		
      private pdsicsprcDataSet dataSet;
        
      public IcsprcAdapter(IProgressConnection connection) : base(connection)
      {
         try 
         {
            this.proxyAppObject = new ICProxyAppObject(connection.Connection);
            this.pdsContext = new pdsContextDataSet();
            this.dataSet = new pdsicsprcDataSet() { DataSetName = DataSetName };
            this.icsprcTableControlKey = this.dataSet.ttblicsprc.GetTableControlParametersKey();
            
            if (!this.tempTableControlParameters.ContainsKey(this.icsprcTableControlKey))
            {
               this.CreateTableControlParameters(this.icsprcTableControlKey);
            }
            this.OnCreated();
         }
         catch (Exception ex)
         {
            NLogLogger.ErrorException("Failed in adapter ", ex);
            ErrorReportingHelper.ReportProgramErrors($"Error in IcsprcAdapter constructor - {ex.Message}");
         }
      }
  
      partial void OnCreated();
    
      protected void FetchWhere(string where, int batchsize, string fldList)
      {
         NLogLoggerP.Trace("Fetchwhere - Icsprcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               this.SetAndFetch(where, batchsize == 0 ? DefaultFetchWhereRowCount : batchsize, fldList);
               using (var poIcsprcproxy = this.proxyAppObject.CreatePO_icsprcproxy())
               {
                  var cErrorMessage = string.Empty;
                  this.SetRequiredContextParameters();
                  poIcsprcproxy.FetchWhere(ref this.pdsContext, out this.dataSet, out cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("Fetchwhere - Icsprcproxy - After Call");
      }
      
      private void SetAndFetch(string where, int batchsize, string fldList)
      {
         MappedDiagnosticsContext.Set("where", where);
         this.SetFetchWhereParameters(this.icsprcTableControlKey, where, batchsize, fldList);
         this.SetTableParametersOnContext(this.icsprcTableControlKey, true);
      }
  
      protected void SaveChanges()
      {
         NLogLoggerP.Trace("SaveChanges - Icsprcproxy - Before Call");
         StopwatchUtil.Time(
         () =>
            {
               using (var poIcsprcproxy = this.proxyAppObject.CreatePO_icsprcproxy())
               {
                  this.SetRequiredContextParameters();
                  poIcsprcproxy.SaveChanges(ref this.pdsContext, ref this.dataSet, out string cErrorMessage);
                  ErrorReportingHelper.ReportErrors(cErrorMessage);
                  this.ReportErrors(this.pdsContext);
                  this.ReportErrors(this.dataSet);
               }
            });
         NLogLoggerP.Info("SaveChanges - Icsprcproxy - After Call");
      }
   

      public Icsprc GetByRowId(string rowId, string fldList)
      {
         var row = this.GetRowByRowId(rowId, fldList);
         Icsprc icsprc = null;
         if (row != null)
         {
             icsprc = this.BuildFromRow(row);
         }
         return icsprc;
      }
   
      private DataRow GetRowByRowId(string rowId, string fldList)
      {
         var where = new StringBuilder();
         where.AppendFormat("rowid(icsprc) = to-rowid('0x{0}')", rowId.ToClauseString());
         this.FetchWhere(where.ToString(), 1, fldList);
         return this.dataSet.ttblicsprc.AsEnumerable().SingleOrDefault();
      }
        
      public IEnumerable<Icsprc> GetListByRowIdList(List<string> rowIds, int batchsize, string fldList)
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
              where.AppendFormat("rowid(icsprc)=to-rowid('0x{0}')", rowId.ToClauseString());
           }
         }
         return this.GetList(where.ToString(), batchsize, fldList);
      }

      protected Icsprc Fetch(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         var row = this.dataSet.ttblicsprc.AsEnumerable().SingleOrDefault();
         Icsprc icsprc = null;
         if (row != null)
         {
             icsprc = this.BuildFromRow(row);
         }
         return icsprc;
      }
	  
	  
      public IEnumerable<Icsprc> GetListAllByCono(int cono, int batchsize, string fldList)
      {   
         cono = cono == 0 ? this.connection.CompanyNumber : cono;
         var sb = new StringBuilder();
         sb.AppendFormat("icsprc.cono = {0}", cono);
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsprc> GetList(string where, int batchsize, string fldList)
      {
         this.FetchWhere(where, batchsize, fldList);
         return (from DataRow row in this.dataSet.ttblicsprc.Rows where row != null select this.BuildFromRow(row)).ToList();
      }

      public Icsprc Get(int cono, string recordtype, string srcrowpointer, string restrictcd, DateTime? startdt, string certcode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsprc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(recordtype)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.recordtype = '{0}'", recordtype);
         }
         if (!string.IsNullOrEmpty(srcrowpointer)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.srcrowpointer = '{0}'", srcrowpointer);
         }
         if (!string.IsNullOrEmpty(restrictcd)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.restrictcd = '{0}'", restrictcd);
         }
         if (startdt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.startdt = '{0}'", startdt);
         }
         if (!string.IsNullOrEmpty(certcode)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.certcode = '{0}'", certcode);
         }
         var where = sb.ToString();
         return this.Fetch(where, batchsize, fldList);
      }
  
      public IEnumerable<Icsprc> GetListByCertcode(int cono, string certcode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsprc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(certcode)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.certcode = '{0}'", certcode);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsprc> GetListByExpiredt(int cono, DateTime? expiredt, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsprc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (expiredt != null) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.expiredt = '{0}'", expiredt);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public IEnumerable<Icsprc> GetListByRestrictcd(int cono, string restrictcd, string certcode, int batchsize, string fldList)
      {   
         var sb = new StringBuilder();
         sb.AppendFormatWithEscape("icsprc.cono = {0}", cono == 0 ? this.connection.CompanyNumber : cono);
         if (!string.IsNullOrEmpty(restrictcd)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.restrictcd = '{0}'", restrictcd);
         }
         if (!string.IsNullOrEmpty(certcode)) 
         {
             sb.AppendFormatWithEscape(" AND icsprc.certcode = '{0}'", certcode);
         }
         var where = sb.ToString();
         return this.GetList(where, batchsize, fldList);
      }

      public Icsprc BuildFromRow(DataRow row)
      {
         var returnRecord = Icsprc.BuildIcsprcFromRow(row);
         returnRecord = this.BuildExtraFromRow<Icsprc>(returnRecord, row);
         return returnRecord;
      }
      
      public void UpdateToRow(ref DataRow row, Icsprc record)
      {
         Icsprc.UpdateRowFromIcsprc(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
      }
      
      public Icsprc Insert(Icsprc record)
      {
         DataRow row = this.dataSet.ttblicsprc.NewttblicsprcRow();
         this.UpdateToRow(ref row, record);
         this.ExtraUpdateToRow(ref row, record);
         this.dataSet.ttblicsprc.AddttblicsprcRow((pdsicsprcDataSet.ttblicsprcRow)row);
         this.SaveChanges();
         return this.dataSet.ttblicsprc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsprc.Rows[0]) : null;
      }
  

      public Icsprc Update(Icsprc record)
      {
        var row = this.GetRowByRowId(record.rowID, string.Empty);
         if (row != null)
         {
            this.UpdateToRow(ref row, record);
            this.ExtraUpdateToRow(ref row, record);
            this.SaveChanges();
            return this.dataSet.ttblicsprc.Rows.Count > 0 ? this.BuildFromRow(this.dataSet.ttblicsprc.Rows[0]) : null;
         }
         ErrorReportingHelper.ReportErrors("global.update.doesnotexist", 421);
         return null;
      }
  
      public void Delete(Icsprc record)
      {
         var row = this.GetRowByRowId(record.rowID, string.Empty);         
         if (row == null)
         {
            row = this.dataSet.ttblicsprc.NewttblicsprcRow();
            Icsprc.BuildMinimalRow(ref row, record);
            this.dataSet.ttblicsprc.AddttblicsprcRow((pdsicsprcDataSet.ttblicsprcRow)row);
         }
         row.Delete();
         this.SaveChanges();
      }

      public void DeleteListByRowIds(List<string> rowIds)
      {
         if (rowIds != null)
         {
            var recList = rowIds.Select(selectRowId => new Icsprc() { rowID = selectRowId }).ToList();
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
  